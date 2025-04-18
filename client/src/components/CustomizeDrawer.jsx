import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';

const CustomizeDrawer = ({ 
  isOpen, 
  onClose, 
  title,
  code,
  preview,
  onSaveComponent
}) => {
  const [customizedCode, setCustomizedCode] = useState(code || '');
  const [livePreviewComponent, setLivePreviewComponent] = useState(preview);
  
  // Update customizedCode when code prop changes
  useEffect(() => {
    setCustomizedCode(code || '');
  }, [code]);
  
  // Handle saving the customized component
  const handleSaveComponent = (code) => {
    // Process the code and save it
    if (onSaveComponent) {
      onSaveComponent({
        code: code,
        customized: true,
        lastModified: new Date().toISOString()
      });
    }
  };
  
  // Handle code regeneration
  const handleRegenerateComponent = (currentCode) => {
    // Here you would typically call an AI service to regenerate the code
    // For this demo, we'll just add a simple variation
    
    const variations = [
      { from: 'rounded-lg', to: 'rounded-xl' },
      { from: 'px-4 py-2', to: 'px-5 py-3' },
      { from: 'text-white', to: 'text-white font-bold' }
    ];
    
    // Apply a random variation
    const randomVariation = variations[Math.floor(Math.random() * variations.length)];
    const updatedCode = currentCode.replace(
      randomVariation.from, 
      randomVariation.to
    );
    
    setCustomizedCode(updatedCode);
    return updatedCode;
  };
  
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={title || "Customize Component"}
      baseComponent={{
        code: customizedCode,
        preview: preview
      }}
      onSave={handleSaveComponent}
      onRegenerateComponent={handleRegenerateComponent}
    />
  );
};

export default CustomizeDrawer;