import React, { useState } from 'react';
import { Copy, Check, AlertCircle, ArrowRight, ChevronDown, Github, Mail, Settings, Sliders } from 'lucide-react';
import Button from '../../library/Button';
import Drawer from '../../components/Drawer';
import CustomizeDrawer from '../../components/CustomizeDrawer';

// Tab component for switching between views
const Tabs = ({ tabs, activeTab, onChange, onCustomize }) => {
  return (
    <div className="border-b border-gray-700">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${
              activeTab === tab.value
                ? 'text-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {activeTab === tab.value && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
            )}
          </button>
        ))}
        <div className="flex-grow"></div>
        <button
          onClick={onCustomize}
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white flex items-center gap-1"
        >
          <Sliders size={14} />
          <span>Customize</span>
        </button>
      </div>
    </div>
  );
};

// Code Block component with syntax highlighting and copy button
const CodeBlock = ({ code, language = 'jsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format the code with line numbers
  const formatCode = (code) => {
    return code
      .trim()
      .split('\n')
      .map((line, i) => (
        <div key={i} className="table-row">
          <span className="table-cell pr-4 text-right text-gray-500 select-none">{i + 1}</span>
          <span className="table-cell">{line}</span>
        </div>
      ));
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-md p-4 my-4 relative">
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white p-1.5 rounded hover:bg-gray-700"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <div className="font-mono text-sm text-gray-300 table">
          {formatCode(code)}
        </div>
      </div>
    </div>
  );
};
  
// Component example with code and preview tabs
const ComponentExample = ({ title, description, preview, code, defaultTab = 'preview', showVariants = false }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  
  const tabs = [
    { label: 'Preview', value: 'preview' },
    { label: 'Code', value: 'code' },
  ];

  if (showVariants) {
    tabs.push({ label: 'Props', value: 'props' });
  }

  return (
    <div className="border border-gray-700 rounded-md mb-8 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
      </div>
      
      <Tabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
        onCustomize={() => setIsCustomizeOpen(true)}
      />
      
      <div className="p-6">
        {activeTab === 'preview' && (
          <div className="flex flex-wrap items-center gap-4">
            {preview}
          </div>
        )}
        
        {activeTab === 'code' && <CodeBlock code={code} />}
        
        {activeTab === 'props' && showVariants && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-700 p-3 text-left text-sm text-gray-400">Prop</th>
                  <th className="border border-gray-700 p-3 text-left text-sm text-gray-400">Type</th>
                  <th className="border border-gray-700 p-3 text-left text-sm text-gray-400">Default</th>
                  <th className="border border-gray-700 p-3 text-left text-sm text-gray-400">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-700 p-3 text-sm text-white">variant</td>
                  <td className="border border-gray-700 p-3 text-sm text-purple-400">
                    <code>primary | secondary | success | danger | warning | outline | ghost</code>
                  </td>
                  <td className="border border-gray-700 p-3 text-sm text-gray-400">primary</td>
                  <td className="border border-gray-700 p-3 text-sm text-gray-300">Defines the visual style of the button</td>
                </tr>
                {title === 'Sizes' && (
                  <tr>
                    <td className="border border-gray-700 p-3 text-sm text-white">size</td>
                    <td className="border border-gray-700 p-3 text-sm text-purple-400">
                      <code>sm | md | lg</code>
                    </td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-400">md</td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-300">Controls the size of the button</td>
                  </tr>
                )}
                {title === 'Icons' && (
                  <>
                    <tr>
                      <td className="border border-gray-700 p-3 text-sm text-white">icon</td>
                      <td className="border border-gray-700 p-3 text-sm text-purple-400">
                        <code>ReactNode</code>
                      </td>
                      <td className="border border-gray-700 p-3 text-sm text-gray-400">null</td>
                      <td className="border border-gray-700 p-3 text-sm text-gray-300">Icon component to display</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 p-3 text-sm text-white">iconPosition</td>
                      <td className="border border-gray-700 p-3 text-sm text-purple-400">
                        <code>left | right</code>
                      </td>
                      <td className="border border-gray-700 p-3 text-sm text-gray-400">left</td>
                      <td className="border border-gray-700 p-3 text-sm text-gray-300">Position of the icon relative to text</td>
                    </tr>
                  </>
                )}
                {title === 'Disabled State' && (
                  <tr>
                    <td className="border border-gray-700 p-3 text-sm text-white">disabled</td>
                    <td className="border border-gray-700 p-3 text-sm text-purple-400">
                      <code>boolean</code>
                    </td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-400">false</td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-300">Disables the button when set to true</td>
                  </tr>
                )}
                {title === 'Loading State' && (
                  <tr>
                    <td className="border border-gray-700 p-3 text-sm text-white">loading</td>
                    <td className="border border-gray-700 p-3 text-sm text-purple-400">
                      <code>boolean</code>
                    </td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-400">false</td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-300">Shows a loading spinner when true</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <CustomizeDrawer 
        isOpen={isCustomizeOpen} 
        onClose={() => setIsCustomizeOpen(false)}
        title={title}
      />
    </div>
  );
};

// Main component page
const ButtonPage = () => {
  return (
    <div className="max-w-full pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Button</h1>
        <p className="text-gray-400">
          Buttons allow users to trigger an action or event with a single click.
        </p>
      </div>
      
      <div className="mb-8 p-4 rounded-md bg-gray-800/30 border border-gray-700">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-full bg-purple-600/20 text-purple-500 flex-shrink-0">
            <AlertCircle size={16} />
          </div>
          <div>
            <h3 className="font-medium text-white">Usage guidelines</h3>
            <p className="text-sm text-gray-400 mt-1">
              Use buttons to help users perform actions like submitting forms, confirming choices, or navigating between pages.
              Choose the appropriate variant based on the importance and context of the action.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Example */}
      <ComponentExample
        title="Basic Button"
        description="The default button component with primary styling."
        preview={<Button>Button</Button>}
        code={`import { Button } from '../components';

export default function Example() {
  return <Button>Button</Button>;
}`}
      />
      
      {/* Variants */}
      <ComponentExample
        title="Variants"
        description="Different button styles for different types of actions."
        preview={
          <>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            {/* <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="warning">Warning</Button> */}
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </>
        }
        code={`import { Button } from '../components';

export default function Example() {
  return (
    <>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </>
  );
}`}
        showVariants={true}
      />
      
      {/* Sizes */}
      <ComponentExample
        title="Sizes"
        description="Buttons in different sizes to fit your design needs."
        preview={
          <>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </>
        }
        code={`import { Button } from '../components';

export default function Example() {
  return (
    <>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </>
  );
}`}
        showVariants={true}
      />
      
      {/* Icons */}
      <ComponentExample
        title="Icons"
        description="Buttons with icons to enhance visual communication."
        preview={
          <>
            <Button icon={<Mail size={16} />}>Email</Button>
            <Button icon={<Github size={16} />}>GitHub</Button>
            <Button icon={<ArrowRight size={16} />} iconPosition="right">Next</Button>
            <Button variant="outline" icon={<Settings size={16} />}>Settings</Button>
          </>
        }
        code={`import { Button } from '../components';
import { Mail, Github, ArrowRight, Settings } from 'lucide-react';

export default function Example() {
  return (
    <>
      <Button icon={<Mail size={16} />}>Email</Button>
      <Button icon={<Github size={16} />}>GitHub</Button>
      <Button icon={<ArrowRight size={16} />} iconPosition="right">Next</Button>
      <Button variant="outline" icon={<Settings size={16} />}>Settings</Button>
    </>
  );
}`}
        showVariants={true}
      />
      
      {/* Disabled State */}
      <ComponentExample
        title="Disabled State"
        description="Buttons can be disabled to indicate that an action is not available."
        preview={
          <>
            <Button disabled>Disabled</Button>
            <Button disabled variant="secondary">Disabled</Button>
            <Button disabled variant="outline">Disabled</Button>
          </>
        }
        code={`import { Button } from '../components';

export default function Example() {
  return (
    <>
      <Button disabled>Disabled</Button>
      <Button disabled variant="secondary">Disabled</Button>
      <Button disabled variant="outline">Disabled</Button>
    </>
  );
}`}
        showVariants={true}
      />
      
      {/* Loading State */}
      <ComponentExample
        title="Loading State"
        description="Show a loading spinner when an action is being processed."
        preview={
          <>
            <Button loading>Loading</Button>
            <Button loading variant="secondary">Loading</Button>
            <Button loading variant="outline">Loading</Button>
          </>
        }
        code={`import { Button } from '../components';

export default function Example() {
  return (
    <>
      <Button loading>Loading</Button>
      <Button loading variant="secondary">Loading</Button>
      <Button loading variant="outline">Loading</Button>
    </>
  );
}`}
        showVariants={true}
      />
      
      
      {/* API Reference */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6">API Reference</h2>
        
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 p-3 text-left text-sm font-medium text-gray-300">Prop</th>
                <th className="border border-gray-700 p-3 text-left text-sm font-medium text-gray-300">Type</th>
                <th className="border border-gray-700 p-3 text-left text-sm font-medium text-gray-300">Default</th>
                <th className="border border-gray-700 p-3 text-left text-sm font-medium text-gray-300">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">variant</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>primary | secondary | success | danger | warning | outline | ghost</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">primary</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Sets the visual style of the button</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">size</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>sm | md | lg</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">md</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Controls the size of the button</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">disabled</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">false</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">When true, prevents user interaction</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">loading</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">false</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Shows a loading spinner when true</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">fullWidth</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">false</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Makes the button span full container width</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">icon</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>ReactNode</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">null</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Icon element to display inside the button</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">iconPosition</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>left | right</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">left</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Determines the position of the icon</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">className</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>string</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">""</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Additional CSS classes to apply</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">...</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>any</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">-</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">All other props are passed to the underlying button element</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ButtonPage;