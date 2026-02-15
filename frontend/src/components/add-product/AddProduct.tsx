import { useState } from "react";
import "./addProduct.css";
import Snackbar from "../common/snackbar/Snackbar";

interface ProductForm {
  name: string;
  price: string;
  category: string;
  company: string;
  description: string;
}

interface Errors {
  name?: string;
  price?: string;
  category?: string;
  company?: string;
  description?: string;
}

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    price: "",
    category: "",
    company: "",
    description: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const { name, price, category, company, description } = formData;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors[e.target.name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const validate = (): boolean => {
    let newErrors: Errors = {};
    let isValid = true;

    if (!company.trim()) {
      newErrors.company = "Company name is required";
      isValid = false;
    }

    if (!category.trim()) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(Number(price))) {
      newErrors.price = "Price must be a valid number";
      isValid = false;
    }

    if (!name.trim()) {
      newErrors.name = "Product name is required";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const response = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: user?._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      setSnackbar({
        open: true,
        message: "Product added successfully!",
        type: "success",
      });

      setFormData({
        name: "",
        price: "",
        category: "",
        company: "",
        description: "",
      });

      setErrors({});
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Something went wrong!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />

      <div className="add-product-wrapper">
        <form className="add-product-card" onSubmit={handleSubmit}>
          <h2>Basic Information</h2>

          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              name="company"
              value={company}
              onChange={handleChange}
              className={errors.company ? "input-error" : ""}
            />
            {errors.company && <p className="error-text">{errors.company}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={category}
                onChange={handleChange}
                className={errors.category ? "input-error" : ""}
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Headphone">Headphone</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
              </select>
              {errors.category && (
                <p className="error-text">{errors.category}</p>
              )}
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={handleChange}
                className={errors.price ? "input-error" : ""}
              />
              {errors.price && <p className="error-text">{errors.price}</p>}
            </div>
          </div>

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows={4}
              value={description}
              onChange={handleChange}
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && (
              <p className="error-text">{errors.description}</p>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
