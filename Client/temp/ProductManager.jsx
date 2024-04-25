import React, { useState } from 'react';

const ProductManager = () => {
  const initialProducts = [
    { id: 1, name: 'Product 1', description: 'Description 1' },
    { id: 2, name: 'Product 2', description: 'Description 2' },
    { id: 3, name: 'Product 3', description: 'Description 3' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', description: '' });

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditProduct(productToEdit);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleSave = (editedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
    setEditProduct(null);
  };

  const handleAdd = () => {
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const newEntry = { id: newId, ...newProduct };
    setProducts([...products, newEntry]);
    setNewProduct({ name: '', description: '' }); // Reset form
  };

  return (
    <div>
      <h1>My Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {editProduct && editProduct.id === product.id ? (
              <>
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleSave(editProduct)}>Save</button>
              </>
            ) : (
              <>
                <span>{product.name}</span>
                <span>{product.description}</span>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="New Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="New Product Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <button onClick={handleAdd}>Add Product</button>
      </div>
    </div>
  );
};

export default ProductManager;
