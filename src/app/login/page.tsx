"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@/context/Web3Context";
import { useAuth } from "@/context/AuthContext";
import Container from "@/components/container/Container";
import Button from "@/components/button";

const Login = () => {
  const router = useRouter();
  const { address, isConnected, connect, isInstalled } = useWeb3();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    if (!address) {
      return;
    }

    setIsSubmitting(true);
    try {
      clearError();
      await login(address);
      // Redirect will happen via isAuthenticated effect
    } catch {
      // Error is already set in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConnect = async () => {
    try {
      clearError();
      await connect();
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-8">
      <Container>
        <div className="w-full max-w-md">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
              <p className="text-slate-300">
                Connect your wallet to access your account
              </p>
            </div>

            {/* Error Messages */}
            {error && (
              <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
                Error: {error}
              </div>
            )}

            {/* Wallet Not Installed */}
            {!isInstalled && (
              <div className="p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg text-yellow-200 text-sm">
                Freighter wallet is not installed. Install it to continue.
              </div>
            )}

            {/* Wallet Connection Section */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
                {!isConnected ? (
                  <div className="space-y-3">
                    <p className="text-slate-300 text-sm">
                      Step 1: Connect your wallet
                    </p>
                    <Button
                      onClick={handleConnect}
                      disabled={!isInstalled || isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Connecting..." : "Connect Wallet"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-slate-300 text-sm">
                      ✓ Wallet Connected
                    </p>
                    <p className="text-slate-400 text-xs break-all">
                      {address}
                    </p>
                  </div>
                )}
              </div>

              {/* Login Section */}
              {isConnected && (
                <div className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
                  <div className="space-y-3">
                    <p className="text-slate-300 text-sm">
                      Step 2: Verify your identity
                    </p>
                    <Button
                      onClick={handleLogin}
                      disabled={isSubmitting || isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isSubmitting || isLoading
                        ? "Verifying..."
                        : "Verify & Login"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Links */}
            <div className="pt-6 border-t border-slate-700">
              <p className="text-slate-400 text-sm text-center">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Login;
