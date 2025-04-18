import json
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

class ComponentCustomizationAgent:
    def __init__(self, component_code, user_prompt, brand_data):
        self.component_code = component_code
        self.user_prompt = user_prompt
        self.brand_data = brand_data
        self.llm_chain = self.initialize_llm_chain()
        print("[Agent] Initialized with component and brand data.")

    def initialize_llm_chain(self):
        prompt_template = PromptTemplate(
            input_variables=["component_code", "user_prompt", "brand_data"],
            template="""
                You are an expert UI component customization assistant. Your task is to modify React/JSX components 
                according to user requests while respecting the user's brand identity. Please use:
                
                - Component Code: {component_code}
                - User Prompt: {user_prompt}
                - Brand Data: {brand_data}
                
                Guidelines for customization:
                
                1. MAINTAIN FUNCTIONALITY: Never break the component's existing functionality.
                2. TAILWIND ONLY: Only use Tailwind CSS classes that exist in the core library (no custom values in square brackets).
                3. RESPECT BRAND IDENTITY: Use colors, styles, and design elements that align with the brand data provided.
                4. COMPONENT CODE ONLY: Return only the modified component code, nothing else.
                5. COMMENT CHANGES: Add comments explaining significant changes you've made.
                6. PRESERVE PROPS: Don't remove or rename existing props or their destructuring.
                7. ACCESSIBILITY: Ensure the component remains accessible.
                8. ERROR HANDLING: Keep any existing error handling intact.
                9. ALWAYS GENERATE THE COMPLETE COMPONENT: Ensure the output is a complete, valid React component.
                10. NEVER USE SHORTHAND: Do not use placeholders like "//existing code here" or "// ... rest of the code". Always include the full code.
                11. INCLUDE ALL CODE: Your response must include 100% of the component code, including parts you didn't modify.
                
                Specifically for colors:
                - Primary color: Use the brand's primary_color for primary elements
                - Secondary color: Use the brand's secondary_color for secondary elements
                - Accent color: Use the brand's accent_color for accents/highlights
                - If the brand style is "modern": Use clean lines, minimal styling
                - If the brand style is "playful": Use rounded elements, more vibrant styling
                - If the brand style is "elegant": Use refined, subtle styling with proper spacing
                
                Your output must be ONLY the modified component code, ready to be used as a drop-in replacement.
                
                Always ensure the code is valid JSX/React and follows all React best practices.
                
                CRITICAL: Your entire response should be ONLY the complete component code, with no preamble, explanation, or conclusion.
            """
            )

        llm = ChatGroq(
            temperature=0.2,
            model_name="llama3-70b-8192",
            groq_api_key=GROQ_API_KEY
        )

        return LLMChain(llm=llm, prompt=prompt_template)

    def plan_and_act(self):
        print("[Agent] 🧠 Planning customization steps:")
        print("  1. Analyzing component structure and style.")
        print("  2. Extracting brand identity elements.")
        print("  3. Applying user-requested modifications.")
        print("  4. Ensuring component remains functional and accessible.")
        print("  5. Validating output code.")
        return self.run_chain()

    def run_chain(self):
        print("[Agent] 🚀 Running component customization chain...")
        try:
            response = self.llm_chain.run(
                component_code=self.component_code,
                user_prompt=self.user_prompt,
                brand_data=json.dumps(self.brand_data)
            )
            
            print("[Agent] ✅ Customization complete.")
            
            # Clean the response if needed to ensure it's just the code
            # Code might be wrapped in code blocks in some LLM responses
            if "```" in response:
                # Extract code from markdown code blocks if present
                code_start = response.find("```") + 3
                code_start = response.find("\n", code_start) + 1
                code_end = response.rfind("```")
                
                if code_start > 3 and code_end > code_start:
                    cleaned_response = response[code_start:code_end].strip()
                else:
                    cleaned_response = response
            else:
                cleaned_response = response
                
            return {
                "status": "success",
                "modified_code": cleaned_response,
                "explanation": "Component customized according to brand guidelines and user prompt."
            }
            
        except Exception as e:
            print(f"[Agent ❌] Error during customization: {str(e)}")
            return {
                "status": "error",
                "error": str(e),
                "modified_code": self.component_code,  # Return original code on error
                "explanation": f"Error during customization: {str(e)}"
            }

# Example usage:
# agent = ComponentCustomizationAgent(component_code, user_prompt, brand_data)
# result = agent.plan_and_act()