import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Check, AlertTriangle } from "lucide-react";
import { getAuth } from "firebase/auth";
import { app } from "../utils/firebase";

// Define steps
const steps = [
  {
    id: 1,
    title: "Brand Details",
    description: "Tell us about your brand",
  },
  {
    id: 2,
    title: "Brand Style",
    description: "Define your brand's visual style",
  },
  {
    id: 3,
    title: "Brand Colors",
    description: "Choose your brand colors",
  },
];

const OnboardingPage = () => {
  // Form state
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [brandStyle, setBrandStyle] = useState("modern");
  const [brandVibe, setBrandVibe] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#9333ea"); // purple-600
  const [secondaryColor, setSecondaryColor] = useState("#7e22ce"); // purple-700
  const [accentColor, setAccentColor] = useState("#a855f7"); // purple-500
  
  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  
  // Get current user ID from Firebase
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        // Redirect to login if no user is found
        window.location.href = "/auth";
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Validate current step before proceeding
  const validateCurrentStep = () => {
    setError("");
    
    if (currentStep === 1) {
      if (!brandName.trim()) {
        setError("Brand name is required");
        return false;
      }
      if (!brandDescription.trim()) {
        setError("Brand description is required");
        return false;
      }
      if (!industry.trim()) {
        setError("Industry is required");
        return false;
      }
    } else if (currentStep === 2) {
      if (!brandVibe.trim()) {
        setError("Brand vibe description is required");
        return false;
      }
    }
    
    return true;
  };

  // Handle form submission
  const submitForm = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      
      const payload = {
        brand_name: brandName,
        brand_description: brandDescription,
        industry: industry,
        brand_style: brandStyle,
        brand_vibe: brandVibe,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        accent_color: accentColor,
        user_id: "UChFhruzyeaglLkwD1yP27bHbbQ2",
        u_id: 2,
      };
      
      const response = await fetch("http://localhost:8000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to submit form");
      }
      
      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form on last step
      submitForm();
    }
  };

  const handleBack = () => {
    setError("");
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              VibeUI
            </span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.id < currentStep
                      ? "bg-purple-600 text-white"
                      : step.id === currentStep
                      ? "bg-gray-800 border-2 border-purple-600 text-purple-500"
                      : "bg-gray-800 border-2 border-gray-600 text-gray-400"
                  }`}
                >
                  {step.id < currentStep ? <Check className="w-5 h-5" /> : <span>{step.id}</span>}
                </div>
                <div className="text-center">
                  <div className={`font-medium ${step.id <= currentStep ? "text-white" : "text-gray-400"}`}>
                    {step.title}
                  </div>
                  <div className={`text-xs ${step.id <= currentStep ? "text-gray-400" : "text-gray-500"}`}>
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-4">
            <div className="absolute top-0 left-0 h-1 bg-gray-700 w-full rounded-full"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-600">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg flex items-start">
              <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-1 text-white">Brand Details</h2>
                <p className="text-gray-400 mb-6">
                  Tell us about your brand to help us generate components that match your identity.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="brand-name" className="block text-sm text-white">Brand Name *</label>
                  <input 
                    id="brand-name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Acme Inc." 
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="brand-description" className="block text-sm text-white">Brand Description *</label>
                  <textarea
                    id="brand-description"
                    value={brandDescription}
                    onChange={(e) => setBrandDescription(e.target.value)}
                    placeholder="Describe your brand in a few sentences..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="industry" className="block text-sm text-white">Industry *</label>
                  <input 
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Technology, Healthcare, Education" 
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-1 text-white">Brand Style</h2>
                <p className="text-gray-400 mb-6">Define the visual style that best represents your brand.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm text-white">Select a style that best matches your brand</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <input 
                        type="radio" 
                        value="modern" 
                        id="modern"
                        name="brandStyle"
                        checked={brandStyle === "modern"}
                        onChange={() => setBrandStyle("modern")}
                        className="sr-only peer" 
                      />
                      <label
                        htmlFor="modern"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-600 bg-gray-700 p-4 hover:bg-gray-600 hover:border-purple-600 peer-checked:border-purple-600 peer-checked:bg-gray-700 cursor-pointer"
                      >
                        <div className="mb-2 rounded-md bg-gray-600 p-2">
                          <div className="h-6 w-6 rounded bg-purple-600"></div>
                        </div>
                        <div className="font-medium text-white">Modern</div>
                        <div className="text-xs text-gray-400 text-center mt-1">Clean, minimal, sleek</div>
                      </label>
                    </div>

                    <div>
                      <input 
                        type="radio" 
                        value="playful" 
                        id="playful"
                        name="brandStyle"
                        checked={brandStyle === "playful"}
                        onChange={() => setBrandStyle("playful")}
                        className="sr-only peer" 
                      />
                      <label
                        htmlFor="playful"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-600 bg-gray-700 p-4 hover:bg-gray-600 hover:border-purple-600 peer-checked:border-purple-600 peer-checked:bg-gray-700 cursor-pointer"
                      >
                        <div className="mb-2 rounded-md bg-gray-600 p-2">
                          <div className="h-6 w-6 rounded-full bg-purple-600"></div>
                        </div>
                        <div className="font-medium text-white">Playful</div>
                        <div className="text-xs text-gray-400 text-center mt-1">Fun, vibrant, energetic</div>
                      </label>
                    </div>

                    <div>
                      <input 
                        type="radio" 
                        value="elegant" 
                        id="elegant"
                        name="brandStyle"
                        checked={brandStyle === "elegant"}
                        onChange={() => setBrandStyle("elegant")}
                        className="sr-only peer" 
                      />
                      <label
                        htmlFor="elegant"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-600 bg-gray-700 p-4 hover:bg-gray-600 hover:border-purple-600 peer-checked:border-purple-600 peer-checked:bg-gray-700 cursor-pointer"
                      >
                        <div className="mb-2 rounded-md bg-gray-600 p-2">
                          <div className="h-6 w-6 rounded-sm bg-purple-600"></div>
                        </div>
                        <div className="font-medium text-white">Elegant</div>
                        <div className="text-xs text-gray-400 text-center mt-1">Sophisticated, refined</div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="brand-vibe" className="block text-sm text-white">Brand Vibe *</label>
                  <textarea
                    id="brand-vibe"
                    value={brandVibe}
                    onChange={(e) => setBrandVibe(e.target.value)}
                    placeholder="Describe the feeling you want your UI to evoke (e.g., professional but approachable, bold and energetic, calm and trustworthy)"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-1 text-white">Brand Colors</h2>
                <p className="text-gray-400 mb-6">Choose colors that represent your brand identity.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="primary-color" className="block text-sm text-white">Primary Color</label>
                  <div className="flex gap-3">
                    <div
                      className="w-11 h-11 rounded-md border border-gray-600 cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    <input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-11 w-full bg-gray-700 border border-gray-600 rounded-lg p-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="secondary-color" className="block text-sm text-white">Secondary Color</label>
                  <div className="flex gap-3">
                    <div
                      className="w-11 h-11 rounded-md border border-gray-600 cursor-pointer"
                      style={{ backgroundColor: secondaryColor }}
                    ></div>
                    <input
                      id="secondary-color"
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="h-11 w-full bg-gray-700 border border-gray-600 rounded-lg p-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="accent-color" className="block text-sm text-white">Accent Color</label>
                  <div className="flex gap-3">
                    <div
                      className="w-11 h-11 rounded-md border border-gray-600 cursor-pointer"
                      style={{ backgroundColor: accentColor }}
                    ></div>
                    <input
                      id="accent-color"
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="h-11 w-full bg-gray-700 border border-gray-600 rounded-lg p-1"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <div className="p-4 rounded-lg bg-gray-700 border border-gray-600">
                    <div className="text-sm font-medium mb-2 text-white">Preview</div>
                    <div className="flex gap-2">
                      <div className="h-8 flex-1 rounded-md" style={{ backgroundColor: primaryColor }}></div>
                      <div className="h-8 flex-1 rounded-md" style={{ backgroundColor: secondaryColor }}></div>
                      <div className="h-8 flex-1 rounded-md" style={{ backgroundColor: accentColor }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-lg text-white border border-gray-600 hover:bg-gray-700 transition-colors ${
                currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {currentStep === steps.length ? "Complete Setup" : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;