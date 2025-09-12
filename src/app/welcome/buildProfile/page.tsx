const COUNTRY_LIST = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (North)",
  "Korea (South)",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
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
