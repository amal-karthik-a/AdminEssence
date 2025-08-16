import { useState, useEffect } from "react";
import { Eye, EyeOff, Leaf, Shield, User , Lock} from "lucide-react";
import { supabase } from "./../../SupaBase/supa";
import { useNavigate } from "react-router-dom";
import "./../styles/Auth.css";

const CocoAdminAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let emailToUse = "";
      let isAdmin = false;

      if (!formData.username.includes("@")) {
        const { data, error } = await supabase
          .from("profiles")
          .select("email, emp_id, is_admin")
          .eq("emp_id", formData.username.trim())
          .single();


        if (error || !data) {
          throw new Error(`Invalid emp_id '${formData.username}' or no record found.`);
        }

        emailToUse = data.email;
        isAdmin = data.is_admin || false;
      } else {
        emailToUse = formData.username;
        isAdmin = false; // Default for email login
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password: formData.password,
      });

      if (authError) {
        throw new Error(`Authentication failed: ${authError.message}`);
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Unable to retrieve current user.");
      }

      if (rememberMe) {
        localStorage.setItem("rememberedUsername", formData.username);
        localStorage.setItem("rememberedPassword", formData.password);
        localStorage.setItem("isAdmin", isAdmin);
      } else {
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("isAdmin");
      }

      const userType = !formData.username.includes("@")
        ? formData.username.slice(0, 4).toUpperCase()
        : "UNKNOWN";
      navigate("/home", { state: { userType, userId: user.id, isAdmin } });
    } catch (error) {
      alert(error.message || "Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[<>{}]/g, ""); // Basic sanitization
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      const leaves = document.querySelectorAll(".coco-leaf");
      leaves.forEach((leaf, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        leaf.style.transform = `translate(${x}px, ${y}px)`;
      });

      const elements = document.querySelectorAll(".coco-floating-element");
      elements.forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      const leaves = document.querySelectorAll(".coco-leaf");
      leaves.forEach((leaf, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        leaf.style.transform = `translate(${x}px, ${y}px)`;
      });

      const elements = document.querySelectorAll(".coco-floating-element");
      elements.forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Check for remembered credentials on load
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    const rememberedIsAdmin = localStorage.getItem("isAdmin");
    if (rememberedUsername && rememberedPassword) {
      setFormData({
        username: rememberedUsername,
        password: rememberedPassword,
      });
      navigate("/home", { state: { userType: rememberedUsername.slice(0, 4).toUpperCase(), userId: "remembered", isAdmin: rememberedIsAdmin === "true" } });
    }
  }, [navigate]);

  return (
    <div className="coco-auth-container">
      <div className="coco-background-elements">
        <div className="coco-floating-element coco-element-1"></div>
        <div className="coco-floating-element coco-element-2"></div>
        <div className="coco-floating-element coco-element-3"></div>
        <div className="coco-floating-element coco-element-4"></div>
        <div className="coco-leaf coco-leaf-1"><Leaf size={64} /></div>
        <div className="coco-leaf coco-leaf-2"><Leaf size={48} /></div>
        <div className="coco-leaf coco-leaf-3"><Leaf size={80} /></div>
      </div>
      <div className="coco-main-content">
        <div className="coco-auth-wrapper">
          <div className="coco-brand-section">
            <div className="coco-logo-circle"><Leaf size={40} /></div>
            <h1 className="coco-brand-title">Coco Virgin Oil</h1>
            <p className="coco-brand-subtitle">Admin Portal</p>
          </div>
          <div className="coco-auth-card">
            <div className="coco-card-header">
              <div className="coco-shield-icon"><Shield size={24} /></div>
              <h2 className="coco-card-title">Admin Access</h2>
              <p className="coco-card-description">Sign in to your administrator account</p>
            </div>
            <div className="coco-card-content">
              <form onSubmit={handleSubmit} className="coco-login-form">
                <div className="coco-form-group">
                  <label htmlFor="coco-username" className="coco-form-label">Username (Emp ID or Email)</label>
                  <div className="coco-input-wrapper">
                    <User className="coco-input-icon" size={20} />
                    <input
                      type="text"
                      id="coco-username"
                      name="username"
                      placeholder="Enter emp_no or email"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="coco-form-input"
                      required
                    />
                  </div>
                </div>
                <div className="coco-form-group">
                  <label htmlFor="coco-password" className="coco-form-label">Password</label>
                  <div className="coco-input-wrapper">
                    <Lock className="coco-input-icon" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="coco-password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="coco-form-input coco-password-input"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="coco-password-toggle"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="coco-form-options">
                  <label className="coco-checkbox-label">
                    <input
                      type="checkbox"
                      className="coco-checkbox"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                    <span className="coco-checkbox-text">Remember me</span>
                  </label>
                  <a href="#" className="coco-forgot-link">Forgot password?</a>
                </div>
                <button type="submit" disabled={isLoading} className="coco-submit-btn">
                  {isLoading ? (
                    <div className="coco-loading-spinner">
                      <div className="coco-spinner"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <span className="coco-btn-text">Sign In to Dashboard</span>
                  )}
                </button>
              </form>
              <div className="coco-security-notice">
                <p>Protected by enterprise-grade security</p>
              </div>
            </div>
          </div>
          <div className="coco-footer">
            <p>&copy; 2024 Coco Virgin Oil. All rights reserved.</p>
            <p>Naturally pure, digitally secure.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocoAdminAuth;