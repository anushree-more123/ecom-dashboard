import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { routes } from "../../routes";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { name, email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setApiError("");
  };

  const validate = (): boolean => {
    let valid = true;
    let newErrors: Errors = { name: "", email: "", password: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      console.log("Signup Success:", data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate(routes.PRODUCTS);
      // reset form
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      setApiError("Registration failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h1>Register</h1>

        {apiError && <p className="api-error-text">{apiError}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          className={errors.name ? "input-error" : ""}
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          className={errors.email ? "input-error" : ""}
          onChange={handleChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            className={errors.password ? "input-error" : ""}
            onChange={handleChange}
          />

          <span
            className="password-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="redirect-text">
          Already have an account?{" "}
          <Link to={routes.LOGIN} className="redirect-link">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
