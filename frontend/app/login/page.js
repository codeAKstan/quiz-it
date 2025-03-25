"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    // Consider adding CORS headers if needed
                },
                credentials: 'include', // Important for session-based authentication
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push("/dashboard");
            } else {
                // Use the error message from the backend
                setError(data.detail || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#FBFCD8]">
            {/* Back Icon */}
            <div className="absolute top-6 left-6">
                <Link href="/">
                    <img
                        src="/back-icon.png"
                        alt="Back"
                        className="w-6 h-6 cursor-pointer"
                    />
                </Link>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="w-full max-w-md p-6 shadow-md rounded-lg">
                <h1 className="text-2xl text-[#46178F] font-bold mb-4 text-center">Log in</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Email or Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-900"
                        required
                    />
                </div>

                <div className="mb-6 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-800 pr-10"
                        required
                    />
                    {/* Eye Icon */}
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                    >
                        <img
                            src={showPassword ? "/eye-icon.png" : "/eye-off-icon.png"}
                            alt={showPassword ? "Hide password" : "Show password"}
                            className="w-6 h-6"
                        />
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#46178F] text-[#FBFCD8] px-4 py-3 rounded-[10px] text-lg font-semibold shadow-lg flex items-center justify-between"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Log In"}
                    {!loading && <img src="/signup-icon.png" alt="Sign Up" className="w-6 h-6" />}
                </button>
            </form>

            {/* Forgot Password */}
            <p className="text-sm text-[#46178F] text-center mt-4">
                <Link href="/reset-password" className="hover:underline">Forgot Password?</Link>
            </p>

            {/* Or Log In With */}
            <p className="text-sm text-[#46178F4D] text-center mt-4">Or log in with</p>

            {/* Social Logins */}
            <div className="flex justify-center space-x-4 mt-4">
                <img src="/google-icon.png" alt="Google login" className="w-10 h-10 cursor-pointer" />
                <img src="/facebook-icon.png" alt="Facebook login" className="w-10 h-10 cursor-pointer" />
            </div>
            <p className="text-xs  text-center mt-4">Don't have an account? {' '}
          <Link href={"/signup"} className="text-xs text-[#FFD700]">
           signup
          </Link>
        </p>
            {/* Terms and Conditions */}
            <p className="text-xs text-[#46178F4D] text-center mt-4">
                By signing up, you accept Quiz It's{" "}
                <Link href="/terms" className="text-[#FFD700] hover:underline">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="text-[#FFD700] hover:underline">Privacy Policy</Link>.
            </p>
        </div>
    );
}
