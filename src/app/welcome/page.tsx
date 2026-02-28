
 "use client";
 
 import { useState } from "react";
 import { useRouter } from "next/navigation";
 import { useWalletProvider } from "@/provider/walletProvider";
 import { saveProfile, type ContractConfig, type UserProfileData } from "@/app/contract_connections/UserProfile/saveProfile";
import { COUNTRY_LIST } from './countries';

export default function BuildProfilePage() {
   const router = useRouter();
   const { address, isConnected, connect } = useWalletProvider();
 
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [profession, setProfession] = useState("");
   const [country, setCountry] = useState("");
   const [purpose, setPurpose] = useState("");
 
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
 
   const config: ContractConfig = {
     contractAddress: process.env.NEXT_PUBLIC_USER_MANAGEMENT_CONTRACT ?? "",
     rpcUrl: process.env.NEXT_PUBLIC_STELLAR_RPC_URL ?? "",
     networkPassphrase:
       process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE ??
       "Test SDF Network ; September 2015",
   };
 
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setError(null);
 
     try {
       if (!isConnected || !address) {
         await connect();
       }
 
       if (!config.contractAddress || !config.rpcUrl || !config.networkPassphrase) {
         throw new Error("Missing contract configuration");
       }
 
       const profileData: UserProfileData = {
         name: name.trim() || "New User",
         email: email.trim() || "user@example.com",
         profession: profession.trim() || undefined,
         goals: purpose.trim() || undefined,
         country: country.trim() || "Unknown",
       };
 
       setLoading(true);
       const result = await saveProfile(profileData, config);
 
       if (result.success) {
         router.push("/instructor");
         return;
       }
 
       setError(result.error ?? "Failed to save profile");
     } catch (err) {
       const message = err instanceof Error ? err.message : "Unexpected error";
       setError(message);
     } finally {
       setLoading(false);
     }
   };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#59168B] flex justify-center items-center">
      <div className="w-full max-w-xl p-8 bg-gray-950 rounded-[1rem] text-white">
        <h1 className="text-[2.5rem] font-medium text-center mb-2">
          Build Your Profile
        </h1>
        <p className="text-[1rem] mb-12 text-center">
          Let’s get to know you better to personalize your learning
          <br /> experience.
        </p>

        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label className="text-[1rem] font-bold">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-900 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[1rem] font-bold">Contact Email</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-900 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[1rem] font-bold">Profession</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-900 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. Designer"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[1rem] font-bold">Country</label>
            <select
              className="w-full px-4 py-2 bg-gray-900 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="" disabled>
                Select your country
              </option>
              {COUNTRY_LIST.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[1rem] font-bold">Purpose</label>
            <select
              className="w-full px-4 py-2 bg-gray-900 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="" disabled>
                Why are you joining
              </option>
              <option value="career">Advance my career</option>
              <option value="skills">Learn new skills</option>
              <option value="certification">Get certified</option>
              <option value="networking">Network with professionals</option>
              <option value="explore">Explore opportunities</option>
              <option value="other">Other</option>
            </select>
          </div>
 
          {error && (
            <div className="text-red-400 text-sm">
              {error}
            </div>
          )}
 
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#7E22CE] hover:bg-purple700 rounded-lg text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Saving..." : "Build Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
