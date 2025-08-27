export const getTotalStock = (variants) =>
  variants.reduce((total, v) => total + v.stock, 0);

export const getVariantCount = (variants) => variants.length;
