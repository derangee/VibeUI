import React, { useState } from 'react';
import { Copy, Check, AlertCircle, Sliders } from 'lucide-react';
import { ProgressBar } from '../../library/ProgressBar';
import Drawer from '../../components/Drawer';
import CustomizeDrawer from '../../components/CustomizeDrawer';

// Tabs Component
const Tabs = ({ tabs, activeTab, onChange, onCustomize }) => (
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

// Code Block Component
const CodeBlock = ({ code, language = 'jsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCode = (code) =>
    code
      .trim()
      .split('\n')
      .map((line, i) => (
        <div key={i} className="table-row">
          <span className="table-cell pr-4 text-right text-gray-500 select-none">
            {i + 1}
          </span>
          <span className="table-cell">{line}</span>
        </div>
      ));

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

// Component Example with Tabs
const ComponentExample = ({
  title,
  description,
  preview,
  code,
  defaultTab = 'preview',
  showVariants = false,
}) => {
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
        {description && (
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        )}
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        onCustomize={() => setIsCustomizeOpen(true)}
      />

      <div className="p-6">
        {activeTab === 'preview' && (
          <div className="flex flex-wrap items-center gap-4">{preview}</div>
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
                {[ 
                  {
                    name: 'value',
                    type: 'number',
                    defaultValue: '0',
                    description: 'Current progress value (0 to max)',
                  },
                  {
                    name: 'max',
                    type: 'number',
                    defaultValue: '100',
                    description: 'Maximum progress value',
                  },
                  {
                    name: 'variant',
                    type: `'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost'`,
                    defaultValue: `'primary'`,
                    description: 'Visual style of the progress bar',
                  },
                  {
                    name: 'size',
                    type: `'sm' | 'md' | 'lg'`,
                    defaultValue: `'md'`,
                    description: 'Height of the progress bar',
                  },
                  {
                    name: 'striped',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Adds a striped pattern to the bar',
                  },
                  {
                    name: 'animated',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Applies a pulse animation effect',
                  },
                  {
                    name: 'className',
                    type: 'string',
                    defaultValue: '""',
                    description: 'Custom class names for outer container',
                  },
                ].map(({ name, type, defaultValue, description }) => (
                  <tr key={name}>
                    <td className="border border-gray-700 p-3 text-sm text-white">{name}</td>
                    <td className="border border-gray-700 p-3 text-sm text-purple-400">
                      <code>{type}</code>
                    </td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-400">{defaultValue}</td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-300">{description}</td>
                  </tr>
                ))}
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

// Final Page with Component Demos
const ProgressBarPage = () => {
  return (
    <div className="max-w-full pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Progress Bar</h1>
        <p className="text-gray-400">
          The Progress Bar component visually displays the completion of an ongoing process.
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
              Use progress bars to provide users with feedback about the status of an operation.
              It's best to use them when processes take a noticeable amount of time.
            </p>
          </div>
        </div>
      </div>

        {/* Download via Command Line (CLI) */}
            <div className="mb-8 p-4 rounded-md bg-gray-800/30 border border-gray-700">
        <h3 className="font-medium text-white mb-2">Download via Command Line (CLI)</h3>
        <p className="text-sm text-gray-400 mb-4">
          Use the following command to add the progress bar component to your project:
        </p>
        <CopyableCLIBox command="npx vibeui-cli add progressbar" />
      </div>

      <ComponentExample
        title="Basic Progress Bar"
        description="The default progress bar displaying progress."
        preview={<ProgressBar value={60} />}
        code={`import { ProgressBar } from '../components';

          export default function Example() {
          return <ProgressBar value={60}/>;
        }}`}
        showVariants
      />

      <ComponentExample
        title="Animated Progress Bar"
        description="An animated progress bar showing ongoing progress."
        preview={<ProgressBar value={60} animated />}
        code={`import { ProgressBar } from '../components';

          export default function Example() {
          return <ProgressBar value={60} animated />;
        }}`}
        showVariants
      />

      {/* API Reference Section */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-sm text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="border border-gray-700 px-4 py-2 text-gray-400">Prop</th>
                <th className="border border-gray-700 px-4 py-2 text-gray-400">Type</th>
                <th className="border border-gray-700 px-4 py-2 text-gray-400">Default</th>
                <th className="border border-gray-700 px-4 py-2 text-gray-400">Description</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr>
                <td className="border border-gray-700 px-4 py-2">value</td>
                <td className="border border-gray-700 px-4 py-2">number</td>
                <td className="border border-gray-700 px-4 py-2">0</td>
                <td className="border border-gray-700 px-4 py-2">The current progress value</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">max</td>
                <td className="border border-gray-700 px-4 py-2">number</td>
                <td className="border border-gray-700 px-4 py-2">100</td>
                <td className="border border-gray-700 px-4 py-2">Maximum value for progress</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">variant</td>
                <td className="border border-gray-700 px-4 py-2">'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline'</td>
                <td className="border border-gray-700 px-4 py-2">'primary'</td>
                <td className="border border-gray-700 px-4 py-2">Color variant of the progress bar</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">size</td>
                <td className="border border-gray-700 px-4 py-2">'sm' | 'md' | 'lg'</td>
                <td className="border border-gray-700 px-4 py-2">'md'</td>
                <td className="border border-gray-700 px-4 py-2">Height of the progress bar</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">striped</td>
                <td className="border border-gray-700 px-4 py-2">boolean</td>
                <td className="border border-gray-700 px-4 py-2">false</td>
                <td className="border border-gray-700 px-4 py-2">If true, adds a striped pattern</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">animated</td>
                <td className="border border-gray-700 px-4 py-2">boolean</td>
                <td className="border border-gray-700 px-4 py-2">false</td>
                <td className="border border-gray-700 px-4 py-2">If true, applies an animation</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">className</td>
                <td className="border border-gray-700 px-4 py-2">string</td>
                <td className="border border-gray-700 px-4 py-2">""</td>
                <td className="border border-gray-700 px-4 py-2">Custom CSS class names for the container</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProgressBarPage;
