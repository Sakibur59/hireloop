import { Card, Chip } from "@heroui/react";

const steps = [
  {
    number: "01",
    title: "Create Profile",
    description: "Set up your professional profile in minutes. Add your skills, experience, and career goals.",
    icon: "👤",
    color: "from-blue-50 to-blue-100",
  },
  {
    number: "02",
    title: "Discover Jobs",
    description: "Browse thousands of curated listings. Get personalized recommendations based on your profile.",
    icon: "🔍",
    color: "from-purple-50 to-purple-100",
  },
  {
    number: "03",
    title: "Apply & Connect",
    description: "Apply with one click, track your applications, and connect directly with hiring teams.",
    icon: "🚀",
    color: "from-green-50 to-green-100",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-12 h-0.5 bg-blue-600"></div>
          <Chip color="primary" variant="flat" className="font-semibold">
            How it works
          </Chip>
          <div className="w-12 h-0.5 bg-blue-600"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Simple <span className="text-blue-600">3-step</span> process
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Get started in minutes and find your dream job or perfect candidate
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative">
        {/* Connecting line - hidden on mobile */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 -translate-y-1/2"></div>
        
        {steps.map((step, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative z-10"
            radius="lg"
          >
            <div className="p-8 text-center">
              {/* Step number with gradient */}
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center`}>
                <span className="text-2xl font-bold text-gray-700">
                  {step.number}
                </span>
              </div>
              
              {/* Icon */}
              <div className="text-4xl mb-3">{step.icon}</div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
              
              {/* Step indicator */}
              <div className="mt-4 flex justify-center gap-1">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}