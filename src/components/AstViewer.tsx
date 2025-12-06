import React, { useState, useMemo } from 'react';

// --- Simplification Logic ---

const simplifyAst = (node: any): any => {
  if (!node) return null;

  // Handle CSS-Tree Linked List
  if (node.head && node.tail && !node.type) {
    const items = [];
    let current = node.head;
    while (current) {
      items.push(simplifyAst(current.data));
      current = current.next;
    }
    return items;
  }

  if (Array.isArray(node)) return node.map(simplifyAst);
  if (typeof node !== 'object') return node;

  // Specific Node Simplifications
  switch (node.type) {
    case 'Identifier':
      return node.name;
    case 'HexColor':
      return '#' + node.value;
    case 'Dimension':
      return node.value + node.unit;
    case 'Number':
      return node.value;
    case 'Percentage':
      return node.value + '%';
    case 'Raw':
      return node.value;
    case 'Operator':
      return node.value;
    case 'Combinator':
      return node.name;
  }

  // Generic Object Processing
  const simple: any = { type: node.type };
  
  // Process children/block/prelude/value/property
  if (node.children) simple.children = simplifyAst(node.children);
  if (node.block) simple.block = simplifyAst(node.block);
  if (node.prelude) simple.prelude = simplifyAst(node.prelude);
  if (node.property) simple.property = node.property;
  if (node.value) simple.value = simplifyAst(node.value);
  if (node.name && node.type !== 'Identifier') simple.name = node.name;

  // Flatten specific nodes for readability
  if (node.type === 'Value' && Array.isArray(simple.children)) {
     // If value has children, just return them directly if possible
     return simple.children.length === 1 ? simple.children[0] : simple.children;
  }
  if (node.type === 'SelectorList') return simple.children;
  if (node.type === 'Block') return simple.children;
  if (node.type === 'StyleSheet') return simple.children;

  return simple;
};

// --- Tree View Components ---

const NodeLabel = ({ label, type, isArray, isEmpty }: any) => (
  <div className="flex items-center gap-2">
    {label && <span className="text-slate-400 font-medium">{label}:</span>}
    {type && <span className="text-purple-400 font-bold">{type}</span>}
    {isArray && <span className="text-slate-500 text-xs">[{isEmpty ? '0' : ''}]</span>}
  </div>
);

const PrimitiveNode = ({ label, value }: any) => (
  <div className="flex items-center gap-2 py-0.5">
    {label && <span className="text-slate-400">{label}:</span>}
    <span className="text-green-400 font-mono break-all">{String(value)}</span>
  </div>
);

const TreeNode = ({ data, label, defaultOpen = false }: { data: any, label?: string, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (data === null || data === undefined) return null;

  // Handle Primitives
  if (typeof data !== 'object') {
    return <PrimitiveNode label={label} value={data} />;
  }

  const isArray = Array.isArray(data);
  const isEmpty = isArray && data.length === 0;
  const type = data.type;
  
  // Determine if we should show children
  const entries = isArray ? data : Object.entries(data).filter(([k]) => k !== 'type');

  if (isEmpty) {
      return (
          <div className="py-0.5 ml-4">
              <NodeLabel label={label} type={type} isArray={true} isEmpty={true} />
          </div>
      )
  }

  return (
    <div className="ml-4 py-0.5">
      <div 
        className="cursor-pointer hover:bg-slate-800/50 inline-flex items-center gap-1 rounded px-1 -ml-1 select-none transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-slate-500 text-[10px] w-3">{isOpen ? '▼' : '▶'}</span>
        <NodeLabel label={label} type={type} isArray={isArray} />
      </div>

      {isOpen && (
        <div className="border-l border-slate-700/50 pl-2 ml-1.5">
          {isArray ? (
            data.map((item: any, i: number) => (
              <TreeNode key={i} data={item} /> // No label for array items
            ))
          ) : (
            entries.map(([key, value]) => (
              <TreeNode key={key} label={key} data={value} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const AstViewer: React.FC<{ ast: any }> = ({ ast }) => {
  const simplifiedAst = useMemo(() => simplifyAst(ast), [ast]);

  if (!simplifiedAst) return <span className="text-gray-500 italic">No AST available</span>;

  return (
    <div className="font-mono text-sm text-gray-300 leading-relaxed">
      <TreeNode data={simplifiedAst} defaultOpen={true} />
    </div>
  );
};

export default AstViewer;
