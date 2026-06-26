import { Card, Chip } from "@heroui/react";

const steps = [
  {
    number: "01",
    title: "Create Profile",
    description: "Set up your professional profile in minutes. Add your skills, experience, and career goals.",
    icon: "👤",
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
  },
  {
    number: "02",
    title: "Discover Jobs",
    description: "Browse thousands of curated listings. Get personalized recommendations based on your profile.",
    icon: "🔍",
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
  },
  {
    number: "03",
    title: "Apply & Connect",
    description: "Apply with one click, track your applications, and connect directly with hiring teams.",
    icon: "🚀",
    color: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-500/30",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
          <Chip 
            color="primary" 
            variant="flat" 
            className="font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30"
          >
            How it works
          </Chip>
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Simple <span className="text-blue-500">3-step</span> process
        </h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Get started in minutes and find your dream job or perfect candidate
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-green-500/30 -translate-y-1/2"></div>
        
        {steps.map((step, index) => (
          <Card
            key={index}
            className={`bg-gray-900/50 border ${step.borderColor} backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative z-10`}
            radius="lg"
          >
            <div className="p-8 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center border ${step.borderColor}`}>
                <span className="text-2xl font-bold text-white">
                  {step.number}
                </span>
              </div>
              
              <div className="text-4xl mb-3">{step.icon}</div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
              
              <div className="mt-4 flex justify-center gap-1">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-blue-500" : "w-1.5 bg-gray-600"
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