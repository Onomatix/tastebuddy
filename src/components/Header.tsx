import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, MessageCircle } from 'lucide-react';

interface HeaderProps {
  brandName: string;
  toggleOrderSummary?: () => void;
}

const Header = ({ brandName, toggleOrderSummary }: HeaderProps) => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(data => {
        setConfig(data);
      })
      .catch(error => {
        console.error('Error loading config:', error);
      });
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? 'shadow-md py-2' : 'py-4'
      }`}
      style={{ backgroundColor: 'var(--secondary)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between relative">
          <a 
            href={`https://wa.me/${config?.brand.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <MessageCircle className="h-9 w-9 text-white" />
          </a>
          
          <div className="h-[128px] w-auto md:h-[160px]">
            <img 
              src={config?.brand.logo} 
              alt={brandName} 
              className="h-full w-auto object-contain"
            />
          </div>
          
          {toggleOrderSummary && (
            <button 
              onClick={toggleOrderSummary}
              className="relative p-2 rounded-full"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <ShoppingCart className="h-11 w-11 text-white" />
              {totalItems > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
