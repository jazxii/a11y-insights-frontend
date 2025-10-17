interface StatsCardProps {
  label: string;
  value: string;
}

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-6">
      <div className="h-1 w-24 bg-blue-600 rounded-full mb-4"></div>
      <div className="text-gray-400 mb-2">{label}</div>
      <div className="text-3xl">{value}</div>
    </div>
  );
}
