
import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

interface OrderSummaryProps {
  isVisible: boolean;
  onClose: () => void;
  whatsappNumber: string;
  messageTemplate: {
    greeting: string;
    itemFormat: string;
    totalFormat: string;
  };
}

const OrderSummary = ({ isVisible, onClose, whatsappNumber, messageTemplate }: OrderSummaryProps) => {
  const { items, totalAmount, updateQuantity } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  const handleSendOrder = () => {
    if (items.length === 0) return;

    const orderText = items.map(item => 
      messageTemplate.itemFormat
        .replace('{quantity}', item.quantity.toString())
        .replace('{name}', item.name)
        .replace('{price}', (item.price * item.quantity).toFixed(2))
    ).join('%0A');

    const totalText = messageTemplate.totalFormat.replace('{total}', totalAmount.toFixed(2));
    const message = `${messageTemplate.greeting}%0A${orderText}%0A%0A${totalText}`;
    
    window.open(`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
      <div 
        ref={panelRef}
        className={`slide-panel w-full max-w-md mx-auto p-6 ${isVisible ? 'animate-slide-up' : 'animate-slide-down'}`}
      >
        <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
        
        <h2 className="text-xl font-bold mb-4">Your Order</h2>
        
        {items.length > 0 ? (
          <>
            <div className="max-h-[50vh] overflow-y-auto mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded-full p-1"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                    
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded-full p-1"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center font-bold text-lg mb-6">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleSendOrder}
              className="btn-primary flex items-center justify-center gap-2 w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="#25D366" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send via WhatsApp
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Your order is empty</p>
            <button 
              onClick={onClose}
              className="btn-primary"
            >
              Browse Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
