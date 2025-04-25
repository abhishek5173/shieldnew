import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [code, setCode] = useState(""); 
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const payload = {
        name,
        email,
        password,
        role,
        mobile,
      };

      if (role === "owner") {
        payload.code = code;
      }

      await axios.post("http://localhost:5000/api/auth/signup", payload);
      alert("Signup successful. Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bgnew.jpg')" }}>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded"
        />

        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="owner">Owner</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {role === "owner" && (
          <input
            type="text"
            placeholder="Enter Owner Code"
            value={code}
            onChange={e => setCode(e.target.value)}
            className="mb-3 w-full px-3 py-2 border rounded"
          />
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded"
        >
          Sign Up
        </button>

        <button
          onClick={()=> navigate("/")}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded mt-2"
        >
          Home
        </button>

        <p
          className="mt-4 text-center text-sm text-indigo-600 hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Have an account? Sign In
        </p>
      </div>
    </div>
  );
}

export default Signup;
