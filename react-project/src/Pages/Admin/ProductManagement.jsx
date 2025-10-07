import React, { useState, useEffect } from "react";
import { Search, Plus, Package, AlertTriangle, DollarSign, Edit, Trash2, Image as ImageIcon } from "lucide-react";

const ProductsManagement = () => {
  const [state, setState] = useState({
    products: [],
    searchTerm: "",
    categoryFilter: "all",
    showAddProduct: false,
    editingProduct: null,
    loading: true,
    newProduct: {
      name: "",
      description: "",
      price: "",
      brand: "",
      count: "",
      category: "Smartphone",
      tags: "",
      images: [""]
    }
  });

  const { products, searchTerm, categoryFilter, showAddProduct, editingProduct, loading, newProduct } = state;

  const fetchProducts = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setState(prev => ({ ...prev, products: data, loading: false }));
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading products');
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.count), 0);
  const lowStockCount = products.filter(p => p.count < 5).length;
  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const apiAction = async (url, options, errorMessage) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(errorMessage);
      await fetchProducts();
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

const addProduct = async (e) => {
  e.preventDefault();
const { name, description, price, brand, count, category = "Smartphone", tags = "", images = [""] } = newProduct;

const productData = {
  name,
  description,
  price: Number(price),
  brand,
  count: Number(count),
  category,
  tags: tags.split(',').map(t => t.trim()).filter(Boolean),
  images: images.filter(Boolean),
  isActive: true,
  highlight: false,
  created_at: new Date().toISOString(),
};

  const success = await apiAction(
    'http://localhost:3001/products',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    },
    'Product added successfully',
    'Failed to add product'
  );


  if (success) {
    setState({
      ...state,
      showAddProduct: false,
      newProduct: {
        name: "",
        description: "",
        price: "",
        brand: "",
        count: "",
        category: "Smartphone",
        tags: "",
        images: [""],
      },
    });
  }
};


  const updateProduct = async (updatedProduct) => {
    const productData = {
      ...updatedProduct,
      tags: updatedProduct.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      images: updatedProduct.images.filter(img => img.trim())
    };

    const success = await apiAction(
      `http://localhost:3001/products/${updatedProduct.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      },
      'Product updated successfully',
      'Failed to update product'
    );

    if (success) {
      setState(prev => ({ ...prev, editingProduct: null }));
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    await apiAction(
      `http://localhost:3001/products/${productId}`,
      { method: 'DELETE' },
      'Product deleted successfully',
      'Failed to delete product'
    );
  };
  const startEditing = (product) => {
    setState(prev => ({
      ...prev,
      editingProduct: {
        ...product,
        tags: product.tags ? product.tags.join(', ') : '',
        brand: product.brand || ''
      }
    }));
  };

  const cancelEditing = () => {
    setState(prev => ({ ...prev, editingProduct: null }));
  };

  const handleEditChange = (field, value) => {
    setState(prev => ({
      ...prev,
      editingProduct: {
        ...prev.editingProduct,
        [field]: field === 'price' || field === 'count' ? Number(value) : value
      }
    }));
  };

  const handleImageChange = (index, value) => {
    setState(prev => {
      const newImages = [...prev.editingProduct.images];
      newImages[index] = value;
      return {
        ...prev,
        editingProduct: { ...prev.editingProduct, images: newImages }
      };
    });
  };

  const addImageField = () => {
    setState(prev => ({
      ...prev,
      editingProduct: {
        ...prev.editingProduct,
        images: [...prev.editingProduct.images, ""]
      }
    }));
  };

  const removeImageField = (index) => {
    setState(prev => ({
      ...prev,
      editingProduct: {
        ...prev.editingProduct,
        images: prev.editingProduct.images.filter((_, i) => i !== index)
      }
    }));
  };

  const updateNewProduct = (field, value) => {
    setState(prev => ({
      ...prev,
      newProduct: { ...prev.newProduct, [field]: value }
    }));
  };

  const toggleModal = (modal, value) => {
    setState(prev => ({ ...prev, [modal]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-indigo-600 border-r-transparent mb-4"></div>
          <div className="text-xl font-semibold text-slate-700">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Product Management
          </h1>
          <p className="text-slate-600 text-sm">Manage all products and inventory</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard icon={<Package className="w-6 h-6" />} label="Total Products" value={totalProducts} color="blue" />
          <StatCard icon={<DollarSign className="w-6 h-6" />} label="Inventory Value" value={`₹${totalValue.toLocaleString()}`} color="green" />
          <StatCard icon={<AlertTriangle className="w-6 h-6" />} label="Low Stock" value={lowStockCount} color="red" />
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products by name or ID..."
              value={searchTerm}
              onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700 placeholder-slate-400"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setState(prev => ({ ...prev, categoryFilter: e.target.value }))}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700 font-medium transition-all outline-none cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
            ))}
          </select>

          <button
            onClick={() => toggleModal('showAddProduct', true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
        <ProductsTable 
          products={filteredProducts} 
          onEdit={startEditing}
          onDelete={deleteProduct}
          totalProducts={products.length}
        />
        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={cancelEditing}
            onSave={updateProduct}
            onFieldChange={handleEditChange}
            onImageChange={handleImageChange}
            onAddImage={addImageField}
            onRemoveImage={removeImageField}
          />
        )}
        {showAddProduct && (
          <AddProductModal
            product={newProduct}
            onClose={() => toggleModal('showAddProduct', false)}
            onSave={addProduct}
            onFieldChange={updateNewProduct}
          />
        )}
      </div>
    </div>
  );
};
const ProductsTable = ({ products, onEdit, onDelete, totalProducts }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Product</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Price</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center overflow-hidden">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-slate-700">{product.name}</div>
                    <div className="text-slate-400 text-sm">ID: {product.id}</div>
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-4">
                <CategoryBadge category={product.category} />
              </td>
              
              <td className="px-6 py-4">
                <div className="font-medium text-slate-700">₹{product.price.toLocaleString()}</div>
              </td>
              
              <td className="px-6 py-4">
                <StockBadge count={product.count} />
              </td>
              
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(product)} className="p-2 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(product.id)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {products.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          {totalProducts === 0 ? "No products available" : "No products found. Try adjusting your search or filters."}
        </div>
      )}
    </div>
  </div>
);
const EditProductModal = ({ product, onClose, onSave, onFieldChange, onImageChange, onAddImage, onRemoveImage }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Edit Product</h2>
      
      <form onSubmit={(e) => { e.preventDefault(); onSave(product); }} className="space-y-6">
        <InputField label="Product Name *" value={product.name} onChange={(e) => onFieldChange('name', e.target.value)} required />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Price (₹) *" type="number" value={product.price} onChange={(e) => onFieldChange('price', e.target.value)} required />
          <InputField label="Brand" value={product.brand} onChange={(e) => onFieldChange('brand', e.target.value)} placeholder="Enter brand name" />
        </div>

        <ImageFields images={product.images} onImageChange={onImageChange} onAddImage={onAddImage} onRemoveImage={onRemoveImage} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField label="Category *" value={product.category} onChange={(e) => onFieldChange('category', e.target.value)} options={["Smartphone", "Laptop", "Smartwatch", "Earbuds", "Headphones"]} required />
          <InputField label="Stock Quantity *" type="number" value={product.count} onChange={(e) => onFieldChange('count', e.target.value)} required />
        </div>

        <InputField label="Tags (comma separated)" value={product.tags} onChange={(e) => onFieldChange('tags', e.target.value)} placeholder="tag1, tag2, tag3" />
        
        <TextAreaField label="Description" value={product.description} onChange={(e) => onFieldChange('description', e.target.value)} placeholder="Enter product description..." />

        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={onClose} className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-medium">
            Cancel
          </button>
          <button type="submit" className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium">
            Update Product
          </button>
        </div>
      </form>
    </div>
  </div>
);
const AddProductModal = ({ product, onClose, onSave, onFieldChange }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Add New Product</h2>
      <form onSubmit={onSave} className="space-y-4">
        <InputField placeholder="Product Name" value={product.name} onChange={(e) => onFieldChange('name', e.target.value)} required />
        
        <TextAreaField 
          placeholder="Description" 
          value={product.description} 
          onChange={(e) => onFieldChange('description', e.target.value)} 
          rows={3}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <InputField placeholder="Price" type="number" value={product.price} onChange={(e) => onFieldChange('price', e.target.value)} required />
          <InputField placeholder="Stock" type="number" value={product.count} onChange={(e) => onFieldChange('count', e.target.value)} required />
        </div>
        
        <SelectField value={product.category} onChange={(e) => onFieldChange('category', e.target.value)} options={["Smartphone", "Laptop", "Smartwatch", "Earbuds"]} />
        
        <InputField placeholder="Image URL" type="url" value={product.images[0]} onChange={(e) => onFieldChange('images', [e.target.value])} required />

        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all font-medium">
            Add Product
          </button>
          <button type="button" onClick={onClose} className="flex-1 bg-slate-300 py-3 rounded-xl hover:bg-slate-400 transition-all font-medium">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
const StatCard = ({ icon, label, value, color }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600", 
    red: "bg-red-100 text-red-600"
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>{icon}</div>
        <div>
          <p className="text-sm text-slate-600 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

const CategoryBadge = ({ category }) => {
  const colors = {
    Smartphone: 'bg-indigo-100 text-indigo-700',
    Laptop: 'bg-purple-100 text-purple-700',
    Smartwatch: 'bg-green-100 text-green-700',
    Earbuds: 'bg-blue-100 text-blue-700',
    Headphones: 'bg-orange-100 text-orange-700'
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${colors[category] || 'bg-gray-100 text-gray-700'}`}>
      {category}
    </span>
  );
};

const StockBadge = ({ count }) => (
  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
    count < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
  }`}>
    {count < 5 && <AlertTriangle className="w-3 h-3 mr-1" />}
    {count}
  </span>
);

const InputField = ({ label, placeholder, type = "text", value, onChange, required = false }) => (
  <div>
    {label && <label className="block text-sm font-semibold mb-2 text-slate-700">{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700"
      required={required}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, required = false }) => (
  <div>
    {label && <label className="block text-sm font-semibold mb-2 text-slate-700">{label}</label>}
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700 cursor-pointer"
      required={required}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder, rows = 4 }) => (
  <div>
    {label && <label className="block text-sm font-semibold mb-2 text-slate-700">{label}</label>}
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700"
      placeholder={placeholder}
    />
  </div>
);

const ImageFields = ({ images, onImageChange, onAddImage, onRemoveImage }) => (
  <div>
    <label className="block text-sm font-semibold mb-2 text-slate-700">Images *</label>
    <div className="space-y-3">
      {images.map((image, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="url"
            value={image}
            onChange={(e) => onImageChange(index, e.target.value)}
            className="flex-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700"
            placeholder="https://example.com/image.jpg"
            required={index === 0}
          />
          {images.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-medium"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddImage}
        className="flex items-center gap-2 px-4 py-3 text-indigo-600 border border-indigo-600 rounded-xl hover:bg-indigo-50 transition-all font-medium"
      >
        <ImageIcon className="w-4 h-4" />
        Add Another Image
      </button>
    </div>
  </div>
);

export default ProductsManagement;