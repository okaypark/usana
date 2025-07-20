import { Users, Award, DollarSign, Globe } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "450,000+",
      label: "Global Partners",
      color: "text-usana-blue-500",
      bgColor: "bg-usana-platinum-100"
    },
    {
      icon: Award,
      value: "1위",
      label: "USA Premium Products",
      color: "text-usana-blue-600",
      bgColor: "bg-usana-slate-100"
    },
    {
      icon: DollarSign,
      value: "주급 50만원",
      label: "월 무료 건강구독",
      color: "text-usana-blue-500",
      bgColor: "bg-usana-platinum-100"
    },
    {
      icon: Globe,
      value: "24개국",
      label: "Global Business",
      color: "text-usana-blue-600",
      bgColor: "bg-usana-slate-100"
    }
  ];

  return (
    <section className="bg-usana-slate-50 py-24 border-b border-usana-platinum-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`${stat.bgColor} p-6 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-usana-platinum-200/50`}>
                  <Icon className={`${stat.color} h-10 w-10`} />
                </div>
                <p className="text-4xl font-bold text-usana-blue-900 mb-2">{stat.value}</p>
                <p className="text-usana-blue-600 font-semibold tracking-wide uppercase text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
