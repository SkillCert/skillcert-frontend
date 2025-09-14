import React from "react";
import { Wave2, Steller_1, Check } from "../../../../../public/images";
import Image from "next/image";

const Steller = () => {
  return (
    <main className="bg-gradient-to-r from-[#59168B] via-[#9D174D] to-[#59168B] relative ">
      <section>
        <Image src={Wave2} alt="wave" />
      </section>
      <section className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  px-6">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl   min-w-[1000px]  mx-auto shadow-2xl">
            <div className="flex items-center gap-[0px]">
              <div className="relative">
                <div className="relative rounded-full flex items-center justify-center">
                  <Image
                    src={Steller_1}
                    alt="stellar logo"
                    className=" w-full animate-spin [animation-duration:60000ms]"
                  />
                </div>
              </div>

              <div className="flex-1 text-white pr-5">
                <h2 className="text-3xl font-bold mb-4">Pay with Stellar</h2>
                <p className="text-gray-100 mb-2 leading-[23px]">
                  Skillcert uses Stellar cryptocurrency for all transactions,
                  including course enrollments and instructor payouts. Stellar
                  offers:
                </p>
                <div className="space-y-2">
                  {[
                    "Fast and secure transactions",
                    "Low transaction fees",
                    "Global accessibility",
                    "Easy integration with our platform",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className=" rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src={Check}
                          alt="check"
                          className="object-contain"
                        />
                      </div>
                      <span className="text-gray-100 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Steller;
