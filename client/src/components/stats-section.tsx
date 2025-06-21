import { Users, Leaf, DollarSign, Globe } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "5,000+",
      label: "만족한 고객",
      color: "text-usana-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Leaf,
      value: "50+",
      label: "프리미엄 제품",
      color: "text-usana-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: DollarSign,
      value: "200~300만원",
      label: "월 추가수익",
      color: "text-usana-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Globe,
      value: "24",
      label: "글로벌 진출국",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`${stat.bgColor} p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center`}>
                  <Icon className={`${stat.color} h-8 w-8`} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
