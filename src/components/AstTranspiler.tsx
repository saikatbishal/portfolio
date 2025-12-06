// src/components/AstTranspiler.tsx
import React, { useState, useEffect } from 'react';
import { compileCssToTailwind } from '../transpiler/compiler';
import { useDebounce } from '../hooks/useDebounce';
import Editor from '@monaco-editor/react';
import AstViewer from './AstViewer';
import { useTheme } from '../contexts/ThemeContext';

const AstTranspiler: React.FC = () => {
  const { isDarkMode } = useTheme();

  const [inputCode, setInputCode] = useState<string>('.my-class {\n  text-align: center;\n  color: red;\n}');
  const [ast, setAst] = useState<object | null>(null);
  const [outputClasses, setOutputClasses] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Debounce input to prevent lagging while typing
  const debouncedCode = useDebounce(inputCode, 500);

  useEffect(() => {
    if (!debouncedCode) return;
    
    const result = compileCssToTailwind(debouncedCode);
    setAst(result.ast);
    setOutputClasses(result.tailwindClasses);
    setError(result.error);
    
  }, [debouncedCode]);

  return (
    <div className="flex flex-col min-h-screen p-6 mt-20 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">AST-Based CSS to Tailwind Transpiler</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This tool parses raw CSS into an <span className="font-mono text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 px-1 rounded">Abstract Syntax Tree</span> 
          in the browser, traverses the nodes, and generates Tailwind utility classes.
        </p>
      </div>

      {/* Grid Layout for the 3 Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        
        {/* Pane 1: Input Editor */}
        <div className="flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 overflow-hidden h-[600px] transition-colors duration-300">
          <div className="bg-gray-100 dark:bg-slate-700 px-4 py-2 border-b border-gray-200 dark:border-slate-600 font-semibold text-sm text-gray-700 dark:text-gray-200 transition-colors duration-300">
            1. CSS Input
          </div>
          <div className="flex-1 w-full">
            <Editor
              key={isDarkMode ? "dark" : "light"}
              height="100%"
              defaultLanguage="css"
              theme={isDarkMode ? "vs-dark" : "light"}
              value={inputCode}
              onChange={(value) => setInputCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 12,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
              }}
            />
          </div>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs p-2 border-t border-red-100 dark:border-red-900/30">
              Error: {error}
            </div>
          )}
        </div>

        {/* Pane 2: Generated Tailwind */}
        <div className="flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 overflow-hidden h-[600px] transition-colors duration-300">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 border-b border-indigo-100 dark:border-indigo-800 font-semibold text-sm text-indigo-800 dark:text-indigo-200 transition-colors duration-300">
            2. Generated Tailwind
          </div>
          <div className="flex-1 p-4 bg-indigo-50/30 dark:bg-slate-900/50 overflow-y-auto custom-scrollbar transition-colors duration-300">
            <div className="flex flex-col items-center justify-center min-h-full">
              {outputClasses.length > 0 ? (
                <div className="w-full">
                  <div className="mb-2 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 font-bold">Class List</div>
                  <div className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-700 p-4 rounded shadow-sm font-mono text-indigo-600 dark:text-indigo-300 text-lg break-words transition-colors duration-300">
                    {outputClasses.join(' ')}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <div className="mb-2 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 font-bold">Live Preview</div>
                    {/* Iframe to isolate Tailwind CDN and generated styles */}
                    <iframe
                      title="Live Preview"
                      className="w-full h-48 border dark:border-slate-600 rounded bg-white"
                      srcDoc={`
                        <!DOCTYPE html>
                        <html>
                          <head>
                            <script src="https://cdn.tailwindcss.com"></script>
                            <script>
                              tailwind.config = {
                                darkMode: 'class',
                              }
                            </script>
                            <style>
                              body { 
                                display: flex; 
                                align-items: center; 
                                justify-content: center; 
                                height: 100vh; 
                                margin: 0; 
                                font-family: sans-serif;
                                color: #333;
                              }
                            </style>
                          </head>
                          <body>
                            <div class="p-6 border transition-all duration-300 ${outputClasses.join(' ')}">
                              Preview Box
                            </div>
                          </body>
                        </html>
                      `}
                    />
                  </div>
                </div>
              ) : (
                <span className="text-gray-400 dark:text-gray-500 text-sm">No utility classes generated yet.</span>
              )}
            </div>
          </div>
        </div>

        {/* Pane 3: AST Visualization */}
        <div className="flex flex-col bg-slate-900 rounded-lg shadow-md overflow-hidden h-[600px] lg:col-span-2">
          <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 font-semibold text-sm text-gray-200 flex justify-between items-center">
            <span>3. Abstract Syntax Tree (AST)</span>
            <span className="text-xs text-slate-400">Read-only</span>
          </div>
          <div className="flex-1 overflow-auto p-4 custom-scrollbar">
            {ast ? (
              <AstViewer ast={ast} />
            ) : (
              <span className="text-gray-500 text-sm italic">Waiting for valid CSS...</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AstTranspiler;