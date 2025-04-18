// import React, { useState, useEffect, useRef } from 'react';
// import { X, Code, Eye, Send, RefreshCw, Copy, Check, Save } from 'lucide-react';

// const Drawer = ({ 
//   isOpen, 
//   onClose, 
//   title = "Component Customizer", 
//   baseComponent = null,
//   onSave = () => {},
//   onRegenerateComponent = () => {}
// }) => {
//   const [activeTab, setActiveTab] = useState('code');
//   const [code, setCode] = useState('');
//   const [copiedCode, setCopiedCode] = useState(false);
//   const [chatMessages, setChatMessages] = useState([
//     { id: 1, content: "How would you like to customize this component?", sender: "ai" }
//   ]);
  
//   const [messageInput, setMessageInput] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const chatEndRef = useRef(null);

//   // Set the component code when the drawer is opened and baseComponent changes
//   useEffect(() => {
//     if (baseComponent && baseComponent.code) {
//       setCode(baseComponent.code);
//     }
//   }, [baseComponent, isOpen]);
  
//   // Scroll to the bottom of the chat when new messages are added
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chatMessages]);

//   // Handle sending a new chat message
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!messageInput.trim() || isGenerating) return;
    
//     const newMessage = {
//       id: chatMessages.length + 1,
//       content: messageInput,
//       sender: "user"
//     };
    
//     setChatMessages(prev => [...prev, newMessage]);
//     setMessageInput('');
//     setIsGenerating(true);
    
//     // Simulate AI response
//     setTimeout(() => {
//       const aiThinking = {
//         id: chatMessages.length + 2,
//         content: "Thinking...",
//         sender: "ai",
//         thinking: true
//       };
//       setChatMessages(prev => [...prev, aiThinking]);
      
//       // Simulate a delay for "thinking"
//       setTimeout(() => {
//         let updatedCode = '';
        
//         // Basic content analysis to simulate AI customizing the component
//         const message = messageInput.toLowerCase();
        
//         if (message.includes('blue') || message.includes('color')) {
//           updatedCode = code.replace(/purple-\d{3}/g, match => {
//             const number = match.split('-')[1];
//             return `blue-${number}`;
//           });
//           setCode(updatedCode);
//         } else if (message.includes('rounded') || message.includes('corner')) {
//           updatedCode = code.replace(/rounded-lg/g, 'rounded-full');
//           setCode(updatedCode);
//         } else if (message.includes('icon') || message.includes('sparkle')) {
//           if (!code.includes('<Sparkles')) {
//             updatedCode = code.replace(
//               '{children}',
//               '<Sparkles className="w-4 h-4 mr-2" />{children}'
//             );
//             setCode(updatedCode);
//           }
//         } else if (message.includes('shadow') || message.includes('elevation')) {
//           updatedCode = code.replace(/className={\`/g, match => {
//             return match + 'shadow-lg ';
//           });
//           setCode(updatedCode);
//         } else if (message.includes('size') || message.includes('larger') || message.includes('bigger')) {
//           updatedCode = code.replace(
//             'px-4 py-2',
//             'px-6 py-3 text-lg'
//           );
//           setCode(updatedCode);
//         } else {
//           // Default response if no specific customization is identified
//           updatedCode = code;
//         }
        
//         // Remove the thinking message and add the real response
//         setChatMessages(prev => {
//           const filtered = prev.filter(msg => !msg.thinking);
//           return [...filtered, {
//             id: filtered.length + 1,
//             content: "I've updated the component based on your request. You can see the changes in the code and preview tabs.",
//             sender: "ai"
//           }];
//         });
        
//         setIsGenerating(false);
//       }, 1500);
//     }, 500);
//   };

//   const handleCopyCode = () => {
//     if (code) {
//       navigator.clipboard.writeText(code);
//       setCopiedCode(true);
//       setTimeout(() => setCopiedCode(false), 2000);
//     }
//   };

//   const handleRegenerateCode = () => {
//     setIsGenerating(true);
//     const updatedCode = onRegenerateComponent(code);
//     if (updatedCode) {
//       setCode(updatedCode);
//     }
    
//     setTimeout(() => {
//       // Add AI message about regeneration
//       setChatMessages(prev => [
//         ...prev,
//         {
//           id: prev.length + 1,
//           content: "I've regenerated the component with variations based on your previous requests.",
//           sender: "ai"
//         }
//       ]);
//       setIsGenerating(false);
//     }, 1500);
//   };

//   const handleSaveComponent = () => {
//     onSave(code);
    
//     // Add confirmation message
//     setChatMessages(prev => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         content: "Your customized component has been saved successfully!",
//         sender: "ai"
//       }
//     ]);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex items-center justify-center">
//       <div 
//         className="bg-gray-800 w-4/5 h-4/5 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-700"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <div className="bg-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
//               <Code className="w-5 h-5 text-white" />
//             </div>
//             <h2 className="text-xl font-semibold text-white">{title}</h2>
//           </div>
//           <button 
//             onClick={onClose}
//             className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
//             aria-label="Close drawer"
//           >
//             <X size={20} />
//           </button>
//         </div>
        
//         {/* Content */}
//         <div className="flex flex-1 overflow-hidden">
//           {/* Left side: Chat area */}
//           <div className="w-1/2 border-r border-gray-700 flex flex-col">
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {chatMessages.map((message) => (
//                 <div 
//                   key={message.id} 
//                   className={`p-3 rounded-lg ${
//                     message.sender === 'user' 
//                       ? 'bg-purple-600 ml-auto max-w-3/4' 
//                       : 'bg-gray-700 max-w-3/4'
//                   } ${message.thinking ? 'opacity-70' : ''}`}
//                 >
//                   {message.thinking ? (
//                     <div className="flex items-center gap-2">
//                       <RefreshCw size={16} className="animate-spin" />
//                       {message.content}
//                     </div>
//                   ) : (
//                     message.content
//                   )}
//                 </div>
//               ))}
//               <div ref={chatEndRef} />
//             </div>
            
//             {/* Chat input */}
//             <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 flex gap-2">
//               <input
//                 type="text"
//                 value={messageInput}
//                 onChange={(e) => setMessageInput(e.target.value)}
//                 placeholder="Describe how to customize the component..."
//                 className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 disabled={isGenerating}
//               />
//               <button 
//                 type="submit"
//                 disabled={isGenerating}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500
//                   ${isGenerating 
//                     ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
//                     : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
//               >
//                 {isGenerating ? (
//                   <RefreshCw size={18} className="animate-spin" />
//                 ) : (
//                   <Send size={18} />
//                 )}
//                 Send
//               </button>
//             </form>
//           </div>
          
//           {/* Right side: Code and Preview tabs */}
//           <div className="w-1/2 flex flex-col">
//             {/* Tabs */}
//             <div className="border-b border-gray-700 flex">
//               <button
//                 className={`px-6 py-3 text-sm font-medium flex items-center ${
//                   activeTab === 'code' 
//                     ? 'border-b-2 border-purple-500 text-white' 
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//                 onClick={() => setActiveTab('code')}
//               >
//                 <Code size={16} className="mr-2" />
//                 Code
//               </button>
//               <button
//                 className={`px-6 py-3 text-sm font-medium flex items-center ${
//                   activeTab === 'preview' 
//                     ? 'border-b-2 border-purple-500 text-white' 
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//                 onClick={() => setActiveTab('preview')}
//               >
//                 <Eye size={16} className="mr-2" />
//                 Preview
//               </button>
//             </div>
            
//             {/* Tab content */}
//             <div className="flex-1 overflow-auto">
//               {activeTab === 'code' && (
//                 <div className="p-4 h-full flex flex-col">
//                   <pre className="bg-gray-900 p-4 rounded-lg text-gray-300 overflow-auto flex-1">
//                     <code className="font-mono text-sm">
//                       {code}
//                     </code>
//                   </pre>
//                   <div className="mt-4 flex gap-2">
//                     <button
//                       onClick={handleRegenerateCode}
//                       className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
//                       disabled={isGenerating}
//                     >
//                       <RefreshCw size={16} />
//                       Regenerate
//                     </button>
//                     <button
//                       onClick={handleCopyCode}
//                       className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
//                     >
//                       {copiedCode ? <Check size={16} /> : <Copy size={16} />}
//                       {copiedCode ? 'Copied!' : 'Copy Code'}
//                     </button>
//                   </div>
//                 </div>
//               )}
              
//               {activeTab === 'preview' && (
//                 <div className="p-8 h-full flex flex-col bg-gray-900 text-white">
//                   <div className="mb-8 flex items-start justify-center">
//                     <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-md w-full">
//                       {/* Preview of the component */}
//                       <div className="space-y-4">
//                         <h3 className="text-lg font-medium">Component Preview</h3>
//                         <div className="flex flex-wrap gap-2 mt-4">
//                           {baseComponent && baseComponent.preview}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="mt-auto flex justify-end">
//                     <button
//                       onClick={handleSaveComponent}
//                       className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
//                     >
//                       <Save size={16} />
//                       Save Component
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Drawer;


import React, { useState, useEffect, useRef } from 'react';
import { X, Code, Eye, Send, RefreshCw, Copy, Check, Save, AlertCircle } from 'lucide-react';

const Drawer = ({ 
  isOpen, 
  onClose, 
  title = "Component Customizer", 
  baseComponent = null,
  onSave = () => {},
  onRegenerateComponent = () => {},
  isProcessing = false,
  error = null,
  aiCustomization = null
}) => {
  const [activeTab, setActiveTab] = useState('code');
  const [code, setCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, content: "How would you like to customize this component?", sender: "ai" }
  ]);
  
  const [messageInput, setMessageInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef(null);

  // Set the component code when the drawer is opened and baseComponent changes
  useEffect(() => {
    if (baseComponent && baseComponent.code) {
      setCode(baseComponent.code);
    }
  }, [baseComponent, isOpen]);
  
  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Add error message to chat if an error occurs
  useEffect(() => {
    if (error) {
      const errorMessage = {
        id: chatMessages.length + 1,
        content: `Error: ${error}`,
        sender: "ai",
        isError: true
      };
      setChatMessages(prev => [...prev, errorMessage]);
    }
  }, [error]);

  // Handle sending a new chat message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || isGenerating || isProcessing) return;
    
    const userMessage = {
      id: chatMessages.length + 1,
      content: messageInput,
      sender: "user"
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setMessageInput('');
    setIsGenerating(true);
    
    // Add AI thinking message
    const aiThinkingMessage = {
      id: chatMessages.length + 2,
      content: "Customizing your component...",
      sender: "ai",
      thinking: true
    };
    setChatMessages(prev => [...prev, aiThinkingMessage]);
    
    try {
      // If we have an AI customization function, use it
      if (aiCustomization) {
        const updatedCode = await aiCustomization(userMessage.content, code);
        
        if (updatedCode) {
          setCode(updatedCode);
          
          // Remove the thinking message and add the real response
          setChatMessages(prev => {
            const filtered = prev.filter(msg => !msg.thinking);
            return [...filtered, {
              id: filtered.length + 1,
              content: "I've updated the component based on your request. You can see the changes in the code and preview tabs.",
              sender: "ai"
            }];
          });
        }
      } else {
        // Legacy behavior - simulate AI response
        setTimeout(() => {
          // Simple content analysis to simulate AI customizing the component
          const message = messageInput.toLowerCase();
          let updatedCode = '';
          
          if (message.includes('blue') || message.includes('color')) {
            updatedCode = code.replace(/purple-\d{3}/g, match => {
              const number = match.split('-')[1];
              return `blue-${number}`;
            });
          } else if (message.includes('rounded') || message.includes('corner')) {
            updatedCode = code.replace(/rounded-lg/g, 'rounded-full');
          } else if (message.includes('icon') || message.includes('sparkle')) {
            if (!code.includes('<Sparkles')) {
              updatedCode = code.replace(
                '{children}',
                '<Sparkles className="w-4 h-4 mr-2" />{children}'
              );
            }
          } else if (message.includes('shadow') || message.includes('elevation')) {
            updatedCode = code.replace(/className={\`/g, match => {
              return match + 'shadow-lg ';
            });
          } else if (message.includes('size') || message.includes('larger') || message.includes('bigger')) {
            updatedCode = code.replace(
              'px-4 py-2',
              'px-6 py-3 text-lg'
            );
          } else {
            // Default response if no specific customization is identified
            updatedCode = code;
          }
          
          setCode(updatedCode);
          
          // Remove the thinking message and add the real response
          setChatMessages(prev => {
            const filtered = prev.filter(msg => !msg.thinking);
            return [...filtered, {
              id: filtered.length + 1,
              content: "I've updated the component based on your request. You can see the changes in the code and preview tabs.",
              sender: "ai"
            }];
          });
        }, 1500);
      }
    } catch (err) {
      console.error("Error customizing component:", err);
      
      // Show error message
      setChatMessages(prev => {
        const filtered = prev.filter(msg => !msg.thinking);
        return [...filtered, {
          id: filtered.length + 1,
          content: `Error: ${err.message || "Something went wrong while customizing the component"}`,
          sender: "ai",
          isError: true
        }];
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleRegenerateCode = async () => {
    setIsGenerating(true);
    
    try {
      // Get the last user message to use as prompt for regeneration
      const lastUserMessage = [...chatMessages]
        .reverse()
        .find(msg => msg.sender === "user");
        
      const prompt = lastUserMessage ? lastUserMessage.content : "Improve this component";
      
      // Use the regenerate handler with the last prompt
      const updatedCode = await onRegenerateComponent(code, prompt);
      
      if (updatedCode) {
        setCode(updatedCode);
      }
      
      // Add AI message about regeneration
      setChatMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          content: "I've regenerated the component with variations based on your previous requests.",
          sender: "ai"
        }
      ]);
    } catch (err) {
      console.error("Error regenerating code:", err);
      
      // Show error message
      setChatMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          content: `Error: ${err.message || "Something went wrong while regenerating the component"}`,
          sender: "ai",
          isError: true
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveComponent = () => {
    onSave(code);
    
    // Add confirmation message
    setChatMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        content: "Your customized component has been saved successfully!",
        sender: "ai"
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex items-center justify-center">
      <div 
        className="bg-gray-800 w-4/5 h-4/5 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left side: Chat area */}
          <div className="w-1/2 border-r border-gray-700 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-purple-600 ml-auto max-w-3/4' 
                      : message.isError
                        ? 'bg-red-900/70 border border-red-700 max-w-3/4'
                        : 'bg-gray-700 max-w-3/4'
                  } ${message.thinking ? 'opacity-70' : ''}`}
                >
                  {message.thinking ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw size={16} className="animate-spin" />
                      {message.content}
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Describe how to customize the component..."
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isGenerating || isProcessing}
              />
              <button 
                type="submit"
                disabled={isGenerating || isProcessing || !messageInput.trim()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${isGenerating || isProcessing || !messageInput.trim()
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
              >
                {isGenerating || isProcessing ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                Send
              </button>
            </form>
          </div>
          
          {/* Right side: Code and Preview tabs */}
          <div className="w-1/2 flex flex-col">
            {/* Tabs */}
            <div className="border-b border-gray-700 flex">
              <button
                className={`px-6 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'code' 
                    ? 'border-b-2 border-purple-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('code')}
              >
                <Code size={16} className="mr-2" />
                Code
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'preview' 
                    ? 'border-b-2 border-purple-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                <Eye size={16} className="mr-2" />
                Preview
              </button>
            </div>
            
            {/* Tab content */}
            <div className="flex-1 overflow-auto">
              {activeTab === 'code' && (
                <div className="p-4 h-full flex flex-col">
                  <pre className="bg-gray-900 p-4 rounded-lg text-gray-300 overflow-auto flex-1">
                    <code className="font-mono text-sm">
                      {code}
                    </code>
                  </pre>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={handleRegenerateCode}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
                      disabled={isGenerating || isProcessing}
                    >
                      {isGenerating || isProcessing ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        <RefreshCw size={16} />
                      )}
                      Regenerate
                    </button>
                    <button
                      onClick={handleCopyCode}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
                    >
                      {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                      {copiedCode ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'preview' && (
                <div className="p-8 h-full flex flex-col bg-gray-900 text-white">
                  <div className="mb-8 flex items-start justify-center">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-md w-full">
                      {/* Preview of the component */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Component Preview</h3>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {baseComponent && baseComponent.preview}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex justify-end">
                    <button
                      onClick={handleSaveComponent}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save Component
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;