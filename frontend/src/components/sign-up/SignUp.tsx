import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./signup.css";

interface Errors {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
  });

  // Clear individual field error
  const clearError = (field: keyof Errors) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h1>Register</h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          className={errors.name ? "input-error" : ""}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) clearError("name");
          }}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          className={errors.email ? "input-error" : ""}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) clearError("email");
          }}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        {/* Password */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            className={errors.password ? "input-error" : ""}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) clearError("password");
            }}
          />

          <span
            className="password-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
