
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ServiceCard = ({ title, description, icon: Icon }: ServiceCardProps) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden card-hover p-6 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-doit-400 to-orange-500 flex items-center justify-center mb-4 shadow-md">
        <Icon size={32} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
