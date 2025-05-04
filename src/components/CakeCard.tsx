import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';

interface CakeCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const CakeCard = ({ id, name, description, price, image }: CakeCardProps) => {
  const { items, addItem, removeItem } = useCart();
  const cartItem = items.find(item => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.warn(`Image failed for ${name}: ${image}`);
    setImageError(true);
  };

  const getFallbackImage = () => {
    const baseTags = name
      .toLowerCase()
      .replace(/[()]/g, '')
      .replace(/[^a-z0-9]+/g, ',')
      .replace(/,+/g, ',')
      .replace(/^,|,$/g, '');

    return `https://source.unsplash.com/featured/?${baseTags},south-indian-food,indian-food,thali`;
  };

  return (
    <div className="cake-card h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageError ? getFallbackImage() : `${image}?${Date.now()}`}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform hover:scale-105"
          onError={handleImageError}
          onLoad={() => console.log(`Loaded image for ${name}`)}
        />
        <div
          className="absolute bottom-0 right-0 px-3 py-1 rounded-tl-lg font-bold text-lg md:text-xl"
          style={{ backgroundColor: 'var(--accent)', color: 'white' }}
        >
          ₹{price.toFixed(2)}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl md:text-2xl font-bold mb-1 text-center">{name}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow text-center">{description}</p>

        <div className="flex justify-center items-center mt-auto">
          {quantity > 0 ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => removeItem(id)}
                className="rounded-full p-3 w-14 h-14 flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary)' }}
                aria-label="Remove one"
              >
                <Minus size={24} />
              </button>

              <span className="font-semibold text-2xl">{quantity}</span>

              <button
                onClick={() => addItem(id, name, price)}
                className="rounded-full p-3 w-14 h-14 flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary)' }}
                aria-label="Add one"
              >
                <Plus size={24} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(id, name, price)}
              className="rounded-full w-16 h-16 flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <Plus size={32} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CakeCard;
