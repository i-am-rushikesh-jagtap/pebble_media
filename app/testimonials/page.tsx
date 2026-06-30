"use client";

import Footer from "@/components/Footer";

export default function TestimonialsPage() {
  return (
    <main className="page-with-nav" style={{ paddingTop: "120px" }}>
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-light text-white mb-4">
            Client Testimonials
          </h1>
          <p className="text-xl text-white/70">
            What our partners say about working with Pebble Media
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500" />
                  <div>
                    <h3 className="text-white font-medium">Client Name</h3>
                    <p className="text-white/60 text-sm">Company, Role</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed">
                  "Working with Pebble Media transformed our brand presence. Their strategic approach
                  and creative excellence delivered results beyond our expectations."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
