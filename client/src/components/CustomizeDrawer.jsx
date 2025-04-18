import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import Drawer from './Drawer';
import { app } from '../utils/firebase';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth(app);
  
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
  
  // Send the user prompt and component code to the FastAPI backend
  const handleAICustomization = async (userPrompt, currentCode) => {
    if (!userPrompt || !currentCode) {
      setError("Missing prompt or code");
      return null;
    }
    
    try {
      setIsProcessing(true);
      setError(null);
      
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Send request to our FastAPI backend
      const response = await fetch('http://localhost:8000/api/customize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.uid,
          component_name: title || "Unknown Component",
          component_code: currentCode,
          user_prompt: userPrompt
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to customize component");
      }
      
      const data = await response.json();
      setCustomizedCode(data.modified_code);
      
      return data.modified_code;
    } catch (err) {
      setError(err.message || "An error occurred during customization");
      console.error("Error customizing component:", err);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle code regeneration - now uses the AI service
  const handleRegenerateComponent = async (currentCode, userPrompt) => {
    const modifiedCode = await handleAICustomization(userPrompt, currentCode);
    return modifiedCode || currentCode;
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
      isProcessing={isProcessing}
      error={error}
      aiCustomization={handleAICustomization}
    />
  );
};

export default CustomizeDrawer;