import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import CakeCard from '../components/CakeCard';
import OrderSummary from '../components/OrderSummary';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ConfigType {
  brand: {
    name: string;
    whatsapp: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    logo: string;
  };
  copy: {
    aboutUs: {
      title: string;
      content: string;
    };
    footer: {
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
    orderMessage: {
      greeting: string;
      itemFormat: string;
      totalFormat: string;
    };
  };
  menu: {
    [category: string]: MenuItem[];
  };
}

const Menu = () => {
  const [config, setConfig] = useState<ConfigType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(data => {
        setConfig(data);
        setLoading(false);

        document.documentElement.style.setProperty('--primary', data.brand.colors.primary);
        document.documentElement.style.setProperty('--secondary', data.brand.colors.secondary);
        document.documentElement.style.setProperty('--accent', data.brand.colors.accent);
      })
      .catch(error => {
        console.error('Error loading config:', error);
        setLoading(false);
      });
  }, []);

  const toggleOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--secondary)' }}>
      {config && (
        <>
          <Header 
            brandName={config.brand.name} 
            toggleOrderSummary={toggleOrderSummary} 
          />

          <main className="container mx-auto px-4 py-8">
            {Object.entries(config.menu).map(([section, items]) => (
              <section key={section} className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 capitalize text-center">{section}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <CakeCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                    />
                  ))}
                </div>
              </section>
            ))}
          </main>

          <AboutUs content={{
            ...config.copy.aboutUs,
            workingHours: config.copy.footer.workingHours,
            delivery: config.copy.footer.delivery
          }} />
          <Footer />

          {totalItems > 0 && (
            <div className="fixed bottom-6 right-6 md:hidden z-40">
              <button 
                onClick={toggleOrderSummary}
                className="rounded-full shadow-lg p-4 flex items-center justify-center relative mx-auto"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
            </div>
          )}

          <OrderSummary 
            isVisible={showOrderSummary} 
            onClose={() => setShowOrderSummary(false)}
            whatsappNumber={config.brand.whatsapp}
            messageTemplate={config.copy.orderMessage}
          />
        </>
      )}
    </div>
  );
};

export default Menu;
