"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Container from "@/components/container/Container";
import { useSaveProfile } from "@/hooks/use-save-profile";
import { useWeb3 } from "@/context/Web3Context";
import { useAuth } from "@/context/AuthContext";

const teacherRegisterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    lastname: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    specialization: z.string().min(5, "Please describe your specialization"),
    languages: z.string().min(2, "Please list at least one language"),
    teachingCategories: z
      .string()
      .min(2, "Please list at least one teaching category"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type TeacherRegisterForm = z.infer<typeof teacherRegisterSchema>;

const TeacherRegister = () => {
  const router = useRouter();
  const { address, isConnected, connect, isInstalled } = useWeb3();
  const { login } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<TeacherRegisterForm>({
    resolver: zodResolver(teacherRegisterSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      specialization: "",
      languages: "",
      teachingCategories: "",
    },
  });

  const { saveProfile, isLoading, error, success, transactionHash } =
    useSaveProfile();

  // Auto-authenticate and redirect on successful registration
  useEffect(() => {
    const authenticateAndRedirect = async () => {
      if (success && transactionHash && isConnected && address) {
        setIsAuthenticating(true);
        setAuthError(null);

        try {
          await login(address);
          // Navigate to dashboard on successful authentication
          router.push("/home");
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Authentication failed";
          setAuthError(errorMessage);
          setIsAuthenticating(false);
        }
      }
    };

    authenticateAndRedirect();
  }, [success, transactionHash, isConnected, address, login, router]);

  const onSubmit = async (data: TeacherRegisterForm) => {
    if (!isConnected) {
      setAuthError("Please connect your wallet first");
      return;
    }

    setAuthError(null);

    try {
      const result = await saveProfile(data);

      if (result?.success) {
        form.reset(); // ✅ Reset form only if blockchain indicates success
        // Authentication will happen via the useEffect above
      } else {
        setAuthError("Failed to save profile. Please try again.");
      }
    } catch {
      setAuthError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 sm:py-12">
      <Container>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/* Wallet Connection Status */}
              <div className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
                {!isConnected ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 font-medium">
                        Connect Your Wallet
                      </p>
                      <p className="text-slate-400 text-sm">
                        Required to register and verify your identity
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => connect()}
                      disabled={!isInstalled}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {!isInstalled ? "Install Freighter" : "Connect Wallet"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-slate-300 font-medium">Wallet Connected</p>
                      <p className="text-slate-400 text-sm break-all">{address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Errors */}
              {(error || authError) && (
                <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
                  Error: {error || authError}
                </div>
              )}

              {/* Success with Authentication Loading */}
              {success && transactionHash && isAuthenticating && (
                <div className="p-4 bg-blue-900/50 border border-blue-500 rounded-lg text-blue-200">
                  Profile saved! Authenticating and redirecting to dashboard...
                </div>
              )}

              {success && transactionHash && !isAuthenticating && !authError && (
                <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg text-green-200">
                  Profile saved successfully! Transaction: {transactionHash}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="register-label">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          className="h-12 rounded-full bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="register-label">Lastname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Lastname"
                          {...field}
                          className="h-12 rounded-full bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="register-label">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="h-12 rounded-full bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="register-label">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          className="h-12 rounded-full bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="register-label">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                          className="h-12 rounded-full bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="register-label">
                      Specialization
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Expert in Web Development, etc"
                        {...field}
                        className="h-12 rounded-full bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="register-label">
                      Languages Spoken
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="English, Spanish, French (comma-separated)"
                        {...field}
                        className="h-12 rounded-full bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teachingCategories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="register-label">
                      Teaching Categories
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Programming, Design, Marketing (comma-separated)"
                        {...field}
                        className="h-12 rounded-full bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-3 flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading || !isConnected || isAuthenticating}
                  size="lg"
                  className="w-max self-end rounded-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading
                    ? "Saving to Blockchain..."
                    : isAuthenticating
                      ? "Authenticating..."
                      : "Register"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Container>
    </main>
  );
};

export default TeacherRegister;
