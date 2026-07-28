export default function Contact() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12 lg:pt-32">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tighter text-base-900">
          Contact us
        </h1>
        <div className="grid lg:grid-cols-3 gap-8 pt-8 mt-8 border-t border-base-200">
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
              alt="Contact"
              loading="lazy"
              decoding="async"
              width="800"
              height="1000"
              className="h-full min-h-80 object-cover object-center w-full"
            />
            <div className="absolute inset-0 p-8 lg:p-20 bg-base-900/80 flex flex-col justify-end">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white">
                Get in touch with our team
              </h3>
              <p className="text-base mt-6 text-base-200">
                Our luxury real estate advisors are ready to assist you with
                buying, selling, or renting properties around the world.
              </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-xl font-medium text-base-900 mb-2">First name</label>
                <input
                  type="text"
                  className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-base-900 mb-2">Last name</label>
                <input
                  type="text"
                  className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-base-900 mb-2">Email</label>
                <input
                  type="email"
                  className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-base-900 mb-2">Phone</label>
                <input
                  type="tel"
                  className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
                  placeholder="(202) 555-0123"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-base-900 mb-2">Country</label>
                <input
                  type="text"
                  className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
                  placeholder="United States"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-base-900 mb-2">State</label>
                <input
                  type="text"
                  className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
                  placeholder="California"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-base-900 mb-2">City</label>
                <input
                  type="text"
                  className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
                  placeholder="Los Angeles"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-base-900 mb-2">Date</label>
                <input
                  type="date"
                  className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-base-900 mb-2">Concern type</label>
                <select className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black appearance-none">
                  <option>General Inquiry</option>
                  <option>Buying</option>
                  <option>Selling</option>
                  <option>Renting</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xl font-medium text-base-900 mb-2">Office</label>
                <select className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black appearance-none">
                  <option>Quartiere International Realty Quebec</option>
                  <option>Quartiere International Realty New York</option>
                  <option>Quartiere International Realty London</option>
                  <option>Quartiere International Realty Dubai</option>
                </select>
              </div>
            </div>
            <div className="mt-8">
              <label className="block text-xl font-medium text-base-900 mb-2">Description</label>
              <textarea
                rows={4}
                className="block w-full border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black resize-vertical placeholder:text-base-400"
                placeholder="Tell us about your inquiry..."
              />
            </div>
            <div className="mt-8">
              <button className="h-15 px-8 py-4 text-base bg-base-800 text-white font-medium hover:bg-base-900 transition-colors cursor-pointer">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
