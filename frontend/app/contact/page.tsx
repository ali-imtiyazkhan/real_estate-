import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Fair Deal Property",
  description:
    "Get in touch with Fair Deal Property. Mr. Govind Singh, +91 96100 16666. Buying, selling or renting — our advisors are ready to help.",
};

export default function Contact() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12 lg:pt-32">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tighter text-base-900">
          Contact us
        </h1>
        <div className="grid lg:grid-cols-3 gap-8 pt-8 mt-8 border-t border-base-200">
          <div className="relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
              alt="Contact"
              width={800}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 33vw"
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
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
