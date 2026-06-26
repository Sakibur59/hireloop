import { Card, Chip, Avatar } from "@heroui/react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    avatar: "SJ",
    rating: 5,
    text: "Hire Loop helped me find my dream job at Google in just 2 weeks. The platform is intuitive and the recommendations were spot on!",
    color: "from-blue-50 to-blue-100",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Amazon",
    avatar: "MC",
    rating: 5,
    text: "The best job platform I've ever used. The application process was seamless and I got responses within hours.",
    color: "from-purple-50 to-purple-100",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Spotify",
    avatar: "ER",
    rating: 5,
    text: "As a designer, I appreciate the clean UI. Found my current role at Spotify through Hire Loop and couldn't be happier.",
    color: "from-green-50 to-green-100",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-12 h-0.5 bg-blue-600"></div>
          <Chip color="primary" variant="flat" className="font-semibold">
            Testimonials
          </Chip>
          <div className="w-12 h-0.5 bg-blue-600"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          What our <span className="text-blue-600">job seekers</span> say
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Real stories from real people who found their dream jobs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            radius="lg"
          >
            <div className="p-6">
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center font-bold text-gray-700`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}