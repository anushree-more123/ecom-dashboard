import React, { useEffect, useState } from "react";
import "./products.css";

interface Product {
  _id?: string;
  name: string;
  price: string;
  category: string;
  company: string;
  description: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:5000/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-container">
      <h1 className="title">Product List</h1>

      {loading && <p className="message">Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table className="product-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Category</th>
              <th>Company</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id || index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.company}</td>
                  <td>{product.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No Products Found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
