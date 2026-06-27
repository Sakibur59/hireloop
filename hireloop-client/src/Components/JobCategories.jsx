import { Card, Chip } from "@heroui/react";

const categories = [
  {
    id: 1,
    name: "Technology",
    icon: "💻",
    jobs: 12450,
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    hoverBg: "hover:bg-blue-500/10",
  },
  {
    id: 2,
    name: "Design",
    icon: "🎨",
    jobs: 4560,
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    hoverBg: "hover:bg-purple-500/10",
  },
  {
    id: 3,
    name: "Marketing",
    icon: "📊",
    jobs: 6780,
    color: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-500/30",
    textColor: "text-green-400",
    hoverBg: "hover:bg-green-500/10",
  },
  {
    id: 4,
    name: "Finance",
    icon: "💰",
    jobs: 3420,
    color: "from-yellow-500/20 to-yellow-600/20",
    borderColor: "border-yellow-500/30",
    textColor: "text-yellow-400",
    hoverBg: "hover:bg-yellow-500/10",
  },
  {
    id: 5,
    name: "Healthcare",
    icon: "🏥",
    jobs: 5670,
    color: "from-red-500/20 to-red-600/20",
    borderColor: "border-red-500/30",
    textColor: "text-red-400",
    hoverBg: "hover:bg-red-500/10",
  },
  {
    id: 6,
    name: "Education",
    icon: "📚",
    jobs: 2890,
    color: "from-indigo-500/20 to-indigo-600/20",
    borderColor: "border-indigo-500/30",
    textColor: "text-indigo-400",
    hoverBg: "hover:bg-indigo-500/10",
  },
];

export default function JobCategories() {
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
            Categories
          </Chip>
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Popular <span className="text-blue-500">job categories</span>
        </h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Browse jobs by category and find the perfect match for your skills
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`bg-gray-900/50 border ${category.borderColor} backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group ${category.hoverBg}`}
            radius="lg"
          >
            <div className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 border ${category.borderColor}`}>
                {category.icon}
              </div>
              <h3 className={`font-semibold text-white text-sm group-hover:${category.textColor} transition-colors`}>
                {category.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{category.jobs.toLocaleString()} jobs</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}