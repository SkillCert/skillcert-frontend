import { GlobeIcon2, RightArrow, ShieldIcon2 } from "../../../../public/svg/generalSvg";

export default function InformationSection() {
  return (
    <section className="w-full bg-[#0A0F1E] py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="text-center font-poppins text-2xl md:text-[40px] font-bold leading-[1.1] text-white">
          A Platform Built on Principles
        </h1>
        <div
          className="mx-auto mt-6 md:mt-8 rounded-3xl border border-[#1F2937] bg-gradient-to-r from-gray-950 via-gray-900 to-pink-800 p-12"
        >
          <p className="text-center text-sm md:text-base leading-relaxed text-gray-300 font-sans-sangoeUI">
            We believe in creating robust solutions that put users first. Our platform is designed to onboard new users into Web3 capabilities while maintaining the highest standards of user experience and data ownership.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className=" items-start gap-4">
              <div className="flex items-center gap-2">
                <ShieldIcon2/>
                <h3 className="font-semibold text-white">Transparent Fees</h3>
              </div>
              <div>
                <p className="mt-4 text-sm text-gray-200">
                  We take minimal commissions to provide maximum advantage to our community, ensuring creators and learners get the best value.
                </p>
              </div>
            </div>
            <div className="items-start gap-4">
              <div className="flex items-center gap-2">
                <GlobeIcon2/>
                <h3 className="font-semibold text-white">Universal Access</h3>
              </div>
              <div>
                <p className="mt-4 text-sm text-gray-200">
                  From institutions to individual content creators, we provide a clear and standardized way to learn and grow in the Web3 space.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-400  to-[#FB64B6]  px-8 py-4 text-sm md:text-base font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-transform duration-200 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50"
          >
            Join the community
            <span className="pt-0.5">
              <RightArrow />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
