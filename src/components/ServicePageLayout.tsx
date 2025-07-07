
import React from 'react';
import { Brain } from 'lucide-react';
import FloatingActionButton from './FloatingActionButton';
import CosmoLifeAssistant from './CosmoLifeAssistant';

interface ServicePageLayoutProps {
  children: React.ReactNode;
}

const ServicePageLayout = ({ children }: ServicePageLayoutProps) => {
  const [showAssistant, setShowAssistant] = React.useState(false);

  const toggleAssistant = () => {
    setShowAssistant(!showAssistant);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {children}
      
      {/* Neural Interface Assistant */}
      {showAssistant && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
          <CosmoLifeAssistant onClose={() => setShowAssistant(false)} />
        </div>
      )}

      {/* Floating Action Button with Brain Icon */}
      <FloatingActionButton 
        onClick={toggleAssistant} 
        icon={<Brain className="w-6 h-6" />}
        variant="holographic"
      />
    </div>
  );
};

export default ServicePageLayout;
