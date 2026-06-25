import { Card, Chip } from "@heroui/react";

const steps = [
  {
    number: "1",
    title: "Create Profile",
    description: "Set up your professional profile in minutes. Add your skills, experience, and career goals.",
  },
  {
    number: "2",
    title: "Discover Jobs",
    description: "Browse thousands of curated listings. Get personalized recommendations based on your profile.",
  },
  {
    number: "3",
    title: "Apply & Connect",
    description: "Apply with one click, track your applications, and connect directly with hiring teams.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <Chip color="primary" variant="flat" className="mb-2">
          Simple process
        </Chip>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          How Hire Loop works
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Three easy steps to land your next role or find the perfect candidate
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <Card
            key={step.number}
            className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}