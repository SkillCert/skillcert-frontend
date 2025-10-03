import Image from "next/image";

export default function StellarSection() {
  const features = [
    "Fast and secure transactions",
    "Low transaction fees",
    "Global accessibility",
    "Easy integration with our platform",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 py-12 md:py-16 lg:py-20">
      {/* Background Image - Hidden on mobile, decorative only */}
      <div className="absolute inset-0 hidden md:block opacity-30">
        <Image
          src="/Frame 48.png"
          alt="Frame 48"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full rounded-2xl md:rounded-3xl border border-[#D8B4FE] bg-[#7E22CE4D] p-6 sm:p-8 md:p-10 lg:p-12 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 lg:gap-12">
            {/* Stellar Logo */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-start flex-shrink-0">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-52 lg:h-52">
                <Image
                  src="/images/Stellar-icon.png"
                  alt="Stellar Logo"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-2/3 space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-poppins font-bold leading-tight text-white">
                Pay with Stellar
              </h2>

              <p className="text-gray-200 text-sm sm:text-base md:text-base lg:text-lg leading-relaxed">
                Skillcert uses Stellar cryptocurrency for all transactions,
                including course enrollments and instructor payouts. Stellar
                offers:
              </p>

              {/* Features List */}
              <div className="space-y-3 sm:space-y-4 mt-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start justify-center md:justify-start gap-3">
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5">
                      <Image
                        src="/check.png"
                        alt="Checkmark"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-200 text-sm sm:text-base text-left">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Blurs - Adjusted for mobile */}
          <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-24 h-24 sm:w-40 sm:h-40 bg-purple-500/20 rounded-full filter blur-3xl pointer-events-none"></div>
          <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-20 h-20 sm:w-32 sm:h-32 bg-pink-500/20 rounded-full filter blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}