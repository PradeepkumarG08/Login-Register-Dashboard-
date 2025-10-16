import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
    });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
    } catch (err) {
        setError(err.response?.data?.message || "Login failed");
    }
    };
return (
    <div className="flex  justify-center items-center h-screen w-full">
        <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
        >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Login
        </button>
        <p className="text-sm text-center">
            Don’t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
            Register
        </a>
        </p>
        </form>
    </div>
  );
};

export default Login;
