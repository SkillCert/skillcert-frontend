
import { COUNTRY_LIST } from './countries';

export default function BuildProfilePage() {
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

        <form className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-[1rem] font-bold">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-900 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[1rem] font-bold">Contact Email</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-900 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[1rem] font-bold">Profession</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-900 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. Designer"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[1rem] font-bold">Country</label>
            <select
              className="w-full px-4 py-2 bg-gray-900 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              defaultValue=""
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
              defaultValue=""
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
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#7E22CE] hover:bg-purple700 rounded-lg text-white font-semibold transition-colors duration-200"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
}
