import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [config, setConfig] = useState<any>(null);

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
    <footer className="py-8 px-4" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col items-center">
          <div className="h-32 w-32">
            <img 
              src={config?.brand.logo} 
              alt={config?.brand.name} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
