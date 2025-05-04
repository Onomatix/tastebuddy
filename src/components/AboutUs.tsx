import React from 'react';
import { Clock, Truck, Info } from 'lucide-react';

interface AboutUsProps {
  content: {
    title: string;
    content: string;
    workingHours: {
      title: string;
      hours: string;
    };
    delivery: {
      title: string;
      areas: string;
      charge: string;
    };
  };
}

const AboutUs = ({ content }: AboutUsProps) => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="rounded-lg overflow-hidden shadow-xl" style={{ 
          backgroundColor: '#1a365d',
          border: '2px solid var(--primary)'
        }}>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <Info className="text-white" size={24} />
              <p className="text-xl md:text-2xl leading-relaxed text-white">
                {content.content}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <tbody>
                  <tr className="border-b border-white/20">
                    <td className="py-4 px-6 text-left font-semibold text-white flex items-center gap-2">
                      <Clock size={20} />
                      {content.workingHours.title}
                    </td>
                    <td className="py-4 px-6 text-left text-white">
                      {content.workingHours.hours}
                    </td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-4 px-6 text-left font-semibold text-white flex items-center gap-2">
                      <Truck size={20} />
                      {content.delivery.title}
                    </td>
                    <td className="py-4 px-6 text-left text-white">
                      {content.delivery.areas}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-left font-semibold text-white">
                      Delivery Charge
                    </td>
                    <td className="py-4 px-6 text-left text-white">
                      {content.delivery.charge}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
