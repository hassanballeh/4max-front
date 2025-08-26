import { useState } from 'react';


const Modal = ({ children, title }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      {children}
    </div>
  </div>
);

const ProductDashboard = () => {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Summer T-Shirt",
      description: "A comfortable summer t-shirt made from 100% cotton",
      season: "Summer",
      variants: [
        {
          id: 101, 
          color: "Blue",
          size: "M",
          price: "$29.99",
          quantity: 50,
          images: []
        },
        {
          id: 102,
          color: "Red",
          size: "L",
          price: "$32.99",
          quantity: 30,
          images: []
        }
      ]
    },
    {
      id: 2,
      name: "Winter Dress",
      description: "A warm winter dress perfect for cold days",
      season: "Winter",
      variants: [
        {
          id: 201,
          color: "Black",
          size: "S",
          price: "$59.99",
          quantity: 25,
          images: []
        },
        {
          id: 202,
          color: "Navy",
          size: "M",
          price: "$62.99",
          quantity: 15,
          images: []
        }
      ]
    }
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [editingVariant, setEditingVariant] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [addingVariantForProduct, setAddingVariantForProduct] = useState(null); // Stores product ID
  const [viewingVariants, setViewingVariants] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    season: "Summer",
    variants: []
  });
  const [newVariant, setNewVariant] = useState({
    color: "",
    size: "M",
    price: "",
    quantity: 0,
    images: []
  });

  const generateId = () => new Date().getTime();

  const viewProductVariants = (product) => {
    setViewingVariants(product);
  };

  const backToProducts = () => {
    setViewingVariants(null);
  };

  const handleAddProduct = () => {
    setAddingProduct(true);
    setNewProduct({
      name: "",
      description: "",
      season: "Summer",
      variants: []
    });
  };

  const saveNewProduct = () => {
    if (!newProduct.name.trim()) {
      alert("Product name is required");
      return;
    }
    const product = {
      id: generateId(),
      ...newProduct
    };
    setProducts([...products, product]);
    setAddingProduct(false);
  };

  const handleAddVariant = (productId) => {
    setAddingVariantForProduct(productId);
    setNewVariant({
      color: "",
      size: "M",
      price: "",
      quantity: 0,
      images: []
    });
  };

  const saveNewVariant = () => {
    if (!newVariant.color.trim() || !newVariant.price.trim()) {
      alert("Color and price are required");
      return;
    }
    const variant = {
      id: generateId(),
      ...newVariant
    };
    const updatedProducts = products.map(product => {
      if (product.id === addingVariantForProduct) {
        return {
          ...product,
          variants: [...product.variants, variant]
        };
      }
      return product;
    });
    setProducts(updatedProducts);

    if (viewingVariants && viewingVariants.id === addingVariantForProduct) {
      const updatedProduct = updatedProducts.find(p => p.id === addingVariantForProduct);
      setViewingVariants(updatedProduct);
    }

    setAddingVariantForProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(product => product.id !== productId));
      if (viewingVariants && viewingVariants.id === productId) {
        setViewingVariants(null);
      }
    }
  };

  const handleDeleteVariant = (productId, variantId) => {
    if (window.confirm("Are you sure you want to delete this variant?")) {
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            variants: product.variants.filter(variant => variant.id !== variantId)
          };
        }
        return product;
      });
      setProducts(updatedProducts);

      if (viewingVariants && viewingVariants.id === productId) {
        const updatedProduct = updatedProducts.find(p => p.id === productId);
        setViewingVariants(updatedProduct);
      }
    }
  };
  
  const handleAddImage = (productId, variantId) => {
    alert(`Add image functionality for variant ${variantId} of product ${productId}`);
  };

  const startEditProduct = (product) => {
    setEditingProduct({...product});
  };

  const startEditVariant = (productId, variant) => {
    setEditingVariant({...variant, productId});
  };

  const saveProductEdit = () => {
    const updatedProducts = products.map(product =>
      product.id === editingProduct.id ? editingProduct : product
    );
    setProducts(updatedProducts);

    if (viewingVariants && viewingVariants.id === editingProduct.id) {
      setViewingVariants(editingProduct);
    }
    setEditingProduct(null);
  };

  const saveVariantEdit = () => {
    const updatedProducts = products.map(product => {
      if (product.id === editingVariant.productId) {
        return {
          ...product,
          variants: product.variants.map(variant =>
            variant.id === editingVariant.id ? editingVariant : variant
          )
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    
    if (viewingVariants && viewingVariants.id === editingVariant.productId) {
        const updatedProduct = updatedProducts.find(p => p.id === editingVariant.productId);
        setViewingVariants(updatedProduct);
    }
    setEditingVariant(null);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditingVariant(null);
    setAddingProduct(false);
    setAddingVariantForProduct(null);
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };
  
  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setEditingVariant({ ...editingVariant, [name]: value });
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  
  const handleNewVariantChange = (e) => {
    const { name, value } = e.target;
    setNewVariant({ ...newVariant, [name]: value });
  };

  const renderProductForm = (productData, onChangeHandler, onSave, onCancel, title) => (
    <Modal title={title}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" name="name" value={productData.name} onChange={onChangeHandler} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={productData.description} onChange={onChangeHandler} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Season</label>
          <select name="season" value={productData.season} onChange={onChangeHandler} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option>Summer</option>
            <option>Winter</option>
            <option>Spring</option>
            <option>Fall</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
        </div>
      </div>
    </Modal>
  );

  const renderVariantForm = (variantData, onChangeHandler, onSave, onCancel, title) => (
     <Modal title={title}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input type="text" name="color" value={variantData.color} onChange={onChangeHandler} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Size</label>
           <select name="size" value={variantData.size} onChange={onChangeHandler} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="text" name="price" value={variantData.price} onChange={onChangeHandler} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
         <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" name="quantity" value={variantData.quantity} onChange={onChangeHandler} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
        </div>
      </div>
    </Modal>
  );

  if (viewingVariants) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">

        {editingVariant && renderVariantForm(editingVariant, handleVariantChange, saveVariantEdit, cancelEdit, "Edit Variant")}
        {addingVariantForProduct === viewingVariants.id && renderVariantForm(newVariant, handleNewVariantChange, saveNewVariant, cancelEdit, "Add New Variant")}

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <button onClick={backToProducts} className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Products
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Variants of {viewingVariants.name}</h1>
          </div>
          
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">{viewingVariants.description}</p>
            <div className="mt-2 flex items-center">
              <span className="text-gray-700 font-medium">Season:</span>
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {viewingVariants.season}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {viewingVariants.variants.map(variant => (
              <div key={variant.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-800">{variant.color} - {variant.size}</h3>
                    <div className="flex space-x-2">
                      <button onClick={() => startEditVariant(viewingVariants.id, variant)} className="text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDeleteVariant(viewingVariants.id, variant.id)} className="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-gray-600 text-sm">Price:</span>
                      <p className="font-medium">{variant.price}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Quantity:</span>
                      <p className="font-medium">{variant.quantity}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-600 text-sm block mb-2">Images:</span>
                    <div className="flex items-center">
                      {variant.images.length > 0 ? (
                        <div className="flex space-x-2">
                          {variant.images.map((img, index) => (
                            <div key={index} className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                              <span className="text-xs text-gray-500">Image {index + 1}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No images added</span>
                      )}
                      <button onClick={() => handleAddImage(viewingVariants.id, variant.id)} className="ml-3 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-md flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[200px]">
              <button onClick={() => handleAddVariant(viewingVariants.id)} className="flex flex-col items-center text-green-600 hover:text-green-800 p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">Add New Variant</span>
              </button>
            </div>
          </div>
        </div>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {addingProduct && renderProductForm(newProduct, handleNewProductChange, saveNewProduct, cancelEdit, "Add New Product")}
      {editingProduct && renderProductForm(editingProduct, handleProductChange, saveProductEdit, cancelEdit, "Edit Product")}
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                  <div className="flex space-x-2">
                    <button onClick={() => startEditProduct(product)} className="text-blue-500 hover:text-blue-700">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                       </svg>
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                       </svg>
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex items-center">
                  <span className="text-gray-700 font-medium">Season:</span>
                  <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {product.season}
                  </span>
                </div>
                <div className="mt-3 flex items-center">
                  <span className="text-gray-700 font-medium">Variants:</span>
                  <span className="ml-2 text-gray-600">{product.variants.length} variants</span>
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <button 
                  onClick={() => viewProductVariants(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View All Variants
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;