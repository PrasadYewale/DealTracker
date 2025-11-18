import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, User, Zap } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        setIsLoading(false);
        return;
      }

      alert("Registration successful! Please login.");
      window.location.href = "/login";

    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server not reachable");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 157, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 255, 157, 0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-lime-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}></div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-scan"></div>
      </div>

      {/* Signup Container */}
      <div className="relative w-full max-w-md z-10">
        {/* Neon glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-lime-400 to-emerald-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
        
        {/* Main card with glass morphism */}
        <div className="relative bg-zinc-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-lime-500/20 overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-lime-400 to-emerald-500"></div>
          
          <div className="p-8">
            {/* Logo section with holographic effect */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-lime-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 rounded-2xl border border-lime-500/30">
                  <Zap className="w-10 h-10 text-lime-400" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-emerald-400 mb-3 tracking-tight">
                CREATE ACCOUNT
              </h1>
              <p className="text-zinc-400 font-medium tracking-wide">JOIN THE DIGITAL REVOLUTION</p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Name Input */}
              <div className="relative group">
                <label className="block text-xs font-bold text-lime-400 mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-lime-500/50 group-focus-within:text-lime-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="enter.your.name"
                    value={formData.name}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-black/50 border-2 border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-lime-500/50 focus:bg-black/70 transition-all font-mono text-sm"
                  />
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-lime-500/30 rounded-tr-xl"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-lime-500/30 rounded-bl-xl"></div>
                </div>
              </div>

              {/* Email Input */}
              <div className="relative group">
                <label className="block text-xs font-bold text-lime-400 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-lime-500/50 group-focus-within:text-lime-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="enter.your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-black/50 border-2 border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-lime-500/50 focus:bg-black/70 transition-all font-mono text-sm"
                  />
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-lime-500/30 rounded-tr-xl"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-lime-500/30 rounded-bl-xl"></div>
                </div>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block text-xs font-bold text-lime-400 mb-2 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-lime-500/50 group-focus-within:text-lime-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-black/50 border-2 border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-lime-500/50 focus:bg-black/70 transition-all font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center group"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-zinc-600 hover:text-lime-400 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-zinc-600 hover:text-lime-400 transition-colors" />
                    )}
                  </button>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-lime-500/30 rounded-tr-xl"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-lime-500/30 rounded-bl-xl"></div>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="relative group">
                <label className="block text-xs font-bold text-lime-400 mb-2 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-lime-500/50 group-focus-within:text-lime-400 transition-colors" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-black/50 border-2 border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-lime-500/50 focus:bg-black/70 transition-all font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center group"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-zinc-600 hover:text-lime-400 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-zinc-600 hover:text-lime-400 transition-colors" />
                    )}
                  </button>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-lime-500/30 rounded-tr-xl"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-lime-500/30 rounded-bl-xl"></div>
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start text-xs pt-2">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 rounded border-2 border-zinc-700 bg-black checked:bg-lime-500 checked:border-lime-500 focus:ring-2 focus:ring-lime-500/20 mt-0.5 mr-2"
                />
                <label className="text-zinc-400">
                  I agree to the{" "}
                  <button className="text-lime-400 hover:text-lime-300 transition-colors">Terms of Service</button>
                  {" "}and{" "}
                  <button className="text-lime-400 hover:text-lime-300 transition-colors">Privacy Policy</button>
                </label>
              </div>

              {/* Submit Button with neon effect */}
              <button
                onClick={handleSignup}
                disabled={isLoading}
                className="relative w-full mt-6 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-lime-400 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                <div className="relative py-4 px-4 bg-gradient-to-r from-cyan-500 via-lime-400 to-emerald-500 rounded-xl font-black text-black uppercase tracking-wider shadow-lg group-hover:shadow-2xl group-hover:shadow-lime-500/50 transform group-hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-3 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                      CREATING ACCOUNT...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2" />
                      SIGN UP
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center border-t border-zinc-800 pt-6">
              <p className="text-zinc-500 text-sm">
                Already have an account?{" "}
                <button 
                  onClick={() => window.location.href = "/login"}
                  className="text-lime-400 font-bold hover:text-lime-300 transition-colors uppercase tracking-wide">
                  Sign in →
                </button>
              </p>
            </div>

            {/* Bottom corner accents */}
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-lime-500/20 rounded-bl-xl"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-lime-500/20 rounded-br-xl"></div>
          </div>
        </div>

        {/* Side accent lines */}
        <div className="absolute -left-2 top-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-lime-400 to-transparent opacity-50"></div>
        <div className="absolute -right-2 bottom-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50"></div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </div>
  );
}