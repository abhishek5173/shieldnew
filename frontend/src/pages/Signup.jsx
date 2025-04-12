import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("https://book-assignment.onrender.com/api/auth/signup", {
        name,
        email,
        password,
        role,
        mobile,
      });
      alert("Signup successful. Please log in.");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
            <option value="seeker">Seeker</option>
          </select>
        </div>


        <button
          onClick={handleSignup}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded"
        >
          Sign Up
        </button>
        <p
          className="mt-4 text-center text-sm text-indigo-600 hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Have an account? Sign In
        </p>
      </div>
    </div>
  );
}

export default Signup;
