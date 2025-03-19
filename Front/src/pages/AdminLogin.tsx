import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Add loading state

  const handleLogin = async () => {
    setError("");
    setLoading(true);
  
    const isValid = await adminLogin(adminId, password);
    setLoading(false);
  
    if (isValid) {
      console.log("Hey");
      console.log("Navigating to /admin"); // ✅ Log before navigation
      navigate("/admin", { replace: true });
      console.log("After navigate"); // ✅ Log after navigation
    } else {
      setError("Invalid admin credentials!");
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <input
          type="text"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          placeholder="Admin ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-6"
        />

        <button
          onClick={handleLogin}
          disabled={loading} // Disable button when loading
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
