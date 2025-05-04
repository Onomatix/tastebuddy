import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the config data from public/config.json
    fetch('/config.json')
      .then(response => response.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
        
        // Apply theme colors from config
        document.documentElement.style.setProperty('--primary', data.brand.colors.primary);
        document.documentElement.style.setProperty('--secondary', data.brand.colors.secondary);
        document.documentElement.style.setProperty('--accent', data.brand.colors.accent);
      })
      .catch(error => {
        console.error('Error loading config:', error);
        setLoading(false);
      });
  }, []);

  const handleEnterClick = () => {
    navigate('/menu');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ backgroundColor: 'var(--primary)' }}
    >
      <div className="max-w-md w-full flex flex-col items-center">
        <div className="mb-8 w-48 h-48 sm:w-64 sm:h-64">
          <img 
            src={config?.brand.logo} 
            alt={config?.brand.name} 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{config?.brand.name}</h1>
        
        <button 
          onClick={handleEnterClick}
          className="mt-8 bg-white text-black font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center mx-auto"
        >
          Tap to Enter
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Index;
