import React, { useState } from 'react';
import { Star, AlertCircle, Sliders, Copy, Check } from 'lucide-react';
import Ratings from '../../library/Ratings';
import { RatingsSource, RatingsPreview } from '../../library/Ratings';  // Changed to Ratings
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
          title={copied ? 'Copied!' : 'Copy code'}
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
                  <td className="border border-gray-700 p-3 text-sm text-white">rating</td>
                  <td className="border border-gray-700 p-3 text-sm text-purple-400">
                    <code>number</code>
                  </td>
                  <td className="border border-gray-700 p-3 text-sm text-gray-400">-</td>
                  <td className="border border-gray-700 p-3 text-sm text-gray-300">Sets the current rating value</td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-3 text-sm text-white">maxRating</td>
                  <td className="border border-gray-700 p-3 text-sm text-purple-400">
                    <code>number</code>
                  </td>
                  <td className="border border-gray-700 p-3 text-sm text-gray-400">5</td>
                  <td className="border border-gray-700 p-3 text-sm text-gray-300">Maximum rating value (default 5)</td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-3 text-sm text-white">readonly</td>
                  <td className="border border-gray-700 p-3 text-sm text-purple-400">
                    <code>boolean</code>
                  </td>
                  <td className="border border-gray-700 p-3 text-sm text-gray-400">false</td>
                  <td className="border border-gray-700 p-3 text-sm text-gray-300">Disables rating selection when true</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CustomizeDrawer
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        title={title}
        code={RatingsSource}
        preview={RatingsPreview}
      />
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

// Main Ratings Page component
const RatingsPage = () => {
  return (
    <div className="max-w-full pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Ratings</h1>
        <p className="text-gray-400">
          Ratings allow users to give feedback by selecting a value within a range.
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
              Use ratings to gather feedback from users about a particular item or experience.
              The ratings should be based on a range of values, often from 1 to 5 stars.
            </p>
          </div>
        </div>
      </div>

      {/* Download via Command Line (CLI) */}
      <div className="mb-8 p-4 rounded-md bg-gray-800/30 border border-gray-700">
        <h3 className="font-medium text-white mb-2">Download via Command Line (CLI)</h3>
        <p className="text-sm text-gray-400 mb-4">
          Use the following command to add the ratings component to your project:
        </p>
        <CopyableCLIBox command="npx vibeui-cli add ratings" />
      </div>      

      {/* Basic Rating Example */}
      <ComponentExample
        title="Basic Rating"
        description="The default rating component with 5 stars."
        preview={<Ratings value={3} maxRating={5} />} // Changed to Ratings
        code={`import { Ratings } from '../components';

export default function Example() {
  return <Ratings value={3} maxRating={5} />; // Changed to Ratings
}`}
      />

     
      

      {/* API Reference */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6">API Reference</h2>

        <div className="overflow-x-auto mb-12">
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
                <td className="border border-gray-700 p-3 text-sm text-white">value</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>number</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">-</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">The current value of the rating</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">maxRating</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>number</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">5</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Maximum rating value</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">readonly</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">false</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Whether the rating can be modified</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RatingsPage;
