// imageUtils.js - Utility functions for image handling and base64 conversion

/**
 * Converts a File object to base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 string with data URL prefix
 */
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Validates image file type and size
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @param {Array} options.allowedTypes - Allowed MIME types
 * @param {number} options.maxSize - Maximum file size in bytes
 * @throws {Error} - Throws error if validation fails
 */
export const validateImage = (file, options = {}) => {
  const {
    allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ],
    maxSize = 5 * 1024 * 1024, // 5MB default
  } = options;

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      `Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(
        ", "
      )}`
    );
  }

  if (file.size > maxSize) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(2);
    throw new Error(
      `File too large: ${sizeMB}MB. Maximum allowed size: ${maxSizeMB}MB`
    );
  }

  return true;
};

/**
 * Processes multiple files and converts them to base64
 * @param {FileList|Array} files - Files to process
 * @param {Object} options - Validation options
 * @returns {Promise<Array>} - Array of base64 strings
 */
export const processFilesToBase64 = async (files, options = {}, flag = 0) => {
  const fileArray = Array.from(files);

  try {
    // Validate all files first
    fileArray.forEach((file) => validateImage(file, options));

    // Convert all files to base64
    const base64Images = await Promise.all(
      fileArray.map((file) => convertFileToBase64(file))
    );
    const images = [];
    if (flag) {
      base64Images.map((image) => images.push({ base64Data: image }));
      return images;
    }
    return base64Images;
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
};
export const createProcessFilesToBase64 = async (files, options = {}) => {
  const fileArray = Array.from(files);

  try {
    // Validate all files first
    fileArray.forEach((file) => validateImage(file, options));

    // Convert all files to base64
    const base64Images = await Promise.all(
      fileArray.map((file) => convertFileToBase64(file))
    );
    return base64Images;
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
};

/**
 * Ensures all images in variants are properly converted to base64
 * @param {Array} variants - Array of product variants
 * @returns {Promise<Array>} - Array of variants with base64 images
 */
export const ensureBase64Images = async (variants) => {
  const processedVariants = [];

  for (const variant of variants) {
    const processedImages = [];

    for (const image of variant.images || []) {
      // If image is already base64 string, keep it
      if (typeof image === "string" && image.startsWith("data:")) {
        processedImages.push({ base64Data: image });
      }
      // If it's a File object, convert it to base64
      else if (image instanceof File) {
        const base64 = await convertFileToBase64(image);
        processedImages.push({ base64Data: base64 });
      }
      // If it's already a base64 string without data prefix, keep it
      else if (typeof image === "string") {
        processedImages.push({ base64Data: image });
      }
      // Skip invalid image types
      else {
        console.warn("Skipping invalid image type:", typeof image);
      }
    }
    console.log("dd ", processedImages);
    processedVariants.push({
      ...variant,
      images: processedImages,
    });
  }

  return processedVariants;
};

/**
 * Gets image dimensions from base64 string
 * @param {string} base64String - Base64 image string
 * @returns {Promise<Object>} - Object with width and height
 */
export const getImageDimensions = (base64String) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = (error) => reject(error);
    img.src = base64String;
  });
};

/**
 * Compresses image by reducing quality (for JPEG images)
 * @param {string} base64String - Original base64 image
 * @param {number} quality - Quality from 0 to 1
 * @param {number} maxWidth - Maximum width (optional)
 * @param {number} maxHeight - Maximum height (optional)
 * @returns {Promise<string>} - Compressed base64 image
 */
export const compressImage = (
  base64String,
  quality = 0.8,
  maxWidth = null,
  maxHeight = null
) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Calculate new dimensions
      let { width, height } = img;

      if (maxWidth && width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (maxHeight && height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      const compressedBase64 = canvas.toDataURL("image/jpeg", quality);

      resolve(compressedBase64);
    };
    img.onerror = (error) => reject(error);
    img.src = base64String;
  });
};

/**
 * Removes base64 data URL prefix to get pure base64 string
 * @param {string} dataUrl - Base64 data URL
 * @returns {string} - Pure base64 string
 */
export const removeDa4taUrlPrefix = (dataUrl) => {
  if (typeof dataUrl !== "string") return dataUrl;
  const base64Index = dataUrl.indexOf("base64,");
  return base64Index !== -1 ? dataUrl.substring(base64Index + 7) : dataUrl;
};

/**
 * Adds base64 data URL prefix if missing
 * @param {string} base64 - Base64 string
 * @param {string} mimeType - MIME type (default: image/jpeg)
 * @returns {string} - Complete data URL
 */
export const addDataUrlPrefix = (base64, mimeType = "image/jpeg") => {
  if (typeof base64 !== "string") return base64;
  if (base64.startsWith("data:")) return base64;
  return `data:${mimeType};base64,${base64}`;
};

/**
 * Batch process multiple images with compression
 * @param {FileList|Array} files - Files to process
 * @param {Object} options - Processing options
 * @returns {Promise<Array>} - Array of processed base64 images
 */
export const batchProcessImages = async (files, options = {}) => {
  const {
    quality = 0.8,
    maxWidth = 1200,
    maxHeight = 1200,
    compress = false,
    ...validateOptions
  } = options;

  try {
    // First convert to base64
    const base64Images = await processFilesToBase64(files, validateOptions);

    // Compress if requested
    if (compress) {
      const compressedImages = await Promise.all(
        base64Images.map((base64) =>
          compressImage(base64, quality, maxWidth, maxHeight)
        )
      );
      return compressedImages;
    }

    return base64Images;
  } catch (error) {
    throw new Error(`Batch processing failed: ${error.message}`);
  }
};

// Default export with all functions
export default {
  convertFileToBase64,
  validateImage,
  processFilesToBase64,
  ensureBase64Images,
  getImageDimensions,
  compressImage,
  removeDa4taUrlPrefix,
  addDataUrlPrefix,
  batchProcessImages,
};
