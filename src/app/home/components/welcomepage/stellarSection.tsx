import Image from "next/image";

export default function StellarSection() {
  const features = [
    "Fast and secure transactions",
    "Low transaction fees",
    "Global accessibility",
    "Easy integration with our platform"
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900">
      <div className="relative w-full">
        <Image
          src="/Frame 48.png"
          alt="Frame 48"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl w-full mx-auto px-4 py-6 md:py-8">
            <div className="w-full h-auto max-w-[90%] md:max-w-[85%] aspect-[1920/637] rounded-[20px] border border-[#D8B4FE] bg-[#7E22CE4D] p-4 md:p-6 lg:p-8 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0 md:pr-8">
                  <div className="relative w-40 h-40 md:w-64 md:h-64">
                    <Image
                      src="/images/Stellar-icon.png"
                      alt="Stellar Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-2/3 space-y-6 text-center md:text-left pl-0 md:pl-8">
                  <h2 className="text-[36px] font-poppins font-bold leading-[100%] tracking-[0%] text-white">
                    Pay with Stellar
                  </h2>
                  
                  <p className="text-gray-200 text-base">
                    Skillcert uses Stellar cryptocurrency for all transactions, including course enrollments and instructor payouts. Stellar offers:
                  </p>
                  
                  <div className="space-y-3 mt-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="relative w-5 h-5 flex-shrink-0">
                          <Image
                            src="/check.png"
                            alt="Checkmark"
                            width={20}
                            height={20}
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                        <span className="text-gray-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                  

                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500/20 rounded-full filter blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}