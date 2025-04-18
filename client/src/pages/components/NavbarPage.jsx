import React, { useState } from 'react';
import { Copy, Check, AlertCircle, Github, Mail, Settings, Sliders } from 'lucide-react';
import Navbar from '../../library/Navbar'; // Import your Navbar component
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
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <div className="font-mono text-sm text-gray-300 table">{formatCode(code)}</div>
      </div>
    </div>
  );
};

// Copyable CLI Box Component
const CopyableCLIBox = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-md p-4 flex items-center justify-between">
      <code className="text-purple-400 font-mono text-sm">{command}</code>
      <button
        onClick={handleCopy}
        className="text-gray-400 hover:text-white p-1.5 rounded hover:bg-gray-700"
        title={copied ? 'Copied!' : 'Copy command'}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
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

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} onCustomize={() => setIsCustomizeOpen(true)} />

      <div className="p-6">
        {activeTab === 'preview' && <div className="flex flex-wrap items-center gap-4">{preview}</div>}
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
                  <td className="border border-gray-700 p-3 text-sm text-gray-300">Defines the visual style of the navbar</td>
                </tr>
                {title === 'Icons' && (
                  <tr>
                    <td className="border border-gray-700 p-3 text-sm text-white">icon</td>
                    <td className="border border-gray-700 p-3 text-sm text-purple-400">
                      <code>ReactNode</code>
                    </td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-400">null</td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-300">Icon component to display</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CustomizeDrawer isOpen={isCustomizeOpen} onClose={() => setIsCustomizeOpen(false)} title={title} />
    </div>
  );
};

// Main Navbar page component
const NavbarPage = () => {
  return (
    <div className="max-w-full pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Navbar</h1>
        <p className="text-gray-400">
          The navbar allows for navigation between different sections of your site or application.
        </p>
      </div>

      {/* Download via Command Line (CLI) */}
      <div className="mb-8 p-4 rounded-md bg-gray-800/30 border border-gray-700">
        <h3 className="font-medium text-white mb-2">Download via Command Line (CLI)</h3>
        <p className="text-sm text-gray-400 mb-4">
          Use the following command to add the navbar component to your project:
        </p>
        <CopyableCLIBox command="npx vibeui-cli add navbar" />
      </div>      

      {/* Basic Example */}
      <ComponentExample
        title="Basic Navbar"  
        description="The default navbar component with basic links."
        preview={<Navbar />}
        code={`import { Navbar } from '../components';

export default function Example() {
  return <Navbar />;
}`}
      />

      {/* API Reference */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6">API Reference</h2>
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 p-3 text-left text-sm font-semibold text-gray-400">Property</th>
                <th className="border border-gray-700 p-3 text-left text-sm font-semibold text-gray-400">Description</th>
                <th className="border border-gray-700 p-3 text-left text-sm font-semibold text-gray-400">Type</th>
                <th className="border border-gray-700 p-3 text-left text-sm font-semibold text-gray-400">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">variant</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">Determines the style of the navbar</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>light | dark</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">light</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">icon</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">Icon component to display</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>ReactNode</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">null</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NavbarPage;
