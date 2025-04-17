import React, { useState } from 'react';
import { Copy, Check, AlertCircle, Sliders } from 'lucide-react';
import Menu from '../../library/Menu';
import Drawer from '../../components/Drawer';
import CustomizeDrawer from '../../components/CustomizeDrawer';

const Tabs = ({ tabs, activeTab, onChange, onCustomize }) => {
  return (
    <div className="border-b border-gray-700">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${activeTab === tab.value ? 'text-purple-500' : 'text-gray-400 hover:text-white'}`}
          >
            {tab.label}
            {activeTab === tab.value && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>}
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

      <div className="px-6 pb-6">
        {activeTab === 'preview' && (
          <div className="flex flex-wrap items-center gap-4 min-h-[290px]">{preview}</div>
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
                  <td className="border border-gray-700 p-3 text-sm text-gray-300">Defines the visual style of the menu</td>
                </tr>
                {title === 'Disabled State' && (
                  <tr>
                    <td className="border border-gray-700 p-3 text-sm text-white">disabled</td>
                    <td className="border border-gray-700 p-3 text-sm text-purple-400">
                      <code>boolean</code>
                    </td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-400">false</td>
                    <td className="border border-gray-700 p-3 text-sm text-gray-300">Disables the menu item when set to true</td>
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

const MenuPage = () => {
  return (
    <div className="max-w-full pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Menu</h1>
        <p className="text-gray-400">
          Menus allow users to select from a list of options or navigate to different sections of the application.
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
              Use menus to group related actions or links together. Menus can be customized to fit your app's design.
            </p>
          </div>
        </div>
      </div>

      <ComponentExample
        title="Basic Menu"
        description="The default menu component with primary styling."
        preview={<Menu />}
        code={`import { Menu } from '../components';

export default function Example() {
  return <Menu />;
}`}
      />

      <ComponentExample
        title="Variants"
        description="Different menu styles for different types of actions."
        preview={<Menu variant="outline" />}
        code={`import { Menu } from '../components';

export default function Example() {
  return <Menu variant="outline" />;
}`}
        showVariants={true}
      />

      <ComponentExample
        title="Disabled State"
        description="Menus can be disabled to indicate that an option is not available."
        preview={<Menu disabled />}
        code={`import { Menu } from '../components';

export default function Example() {
  return <Menu disabled />;
}`}
        showVariants={true}
      />

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
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Defines the visual style of the menu</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-3 text-sm text-white">disabled</td>
                <td className="border border-gray-700 p-3 text-sm text-purple-400">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-700 p-3 text-sm text-gray-400">false</td>
                <td className="border border-gray-700 p-3 text-sm text-gray-300">Disables the menu item when set to true</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
