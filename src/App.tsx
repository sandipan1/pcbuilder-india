import { useState, useEffect } from 'react'
import {
  Cpu,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Monitor,
  Box,
  Zap,
  ShoppingCart,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  IndianRupee,
  Fan,
  Sparkles,
  MessageSquare,
  Loader2,
  X
} from 'lucide-react'
import type { BuildState, CategoryInfo, Product, CPUProduct, MotherboardProduct, RAMProduct, GPUProduct, StorageProduct, PSUProduct, CaseProduct } from './types'

// --- MOCK DATABASE (Realistic India Prices 2024-25) ---

const PRODUCTS: {
  cpu: CPUProduct[]
  motherboard: MotherboardProduct[]
  ram: RAMProduct[]
  gpu: GPUProduct[]
  storage: StorageProduct[]
  psu: PSUProduct[]
  case: CaseProduct[]
} = {
  cpu: [
    { id: 'c1', name: 'Intel Core i3-12100F', price: 7400, brand: 'Intel', socket: 'LGA1700', memoryType: 'DDR4', watts: 58 },
    { id: 'c2', name: 'AMD Ryzen 5 5600', price: 10500, brand: 'AMD', socket: 'AM4', memoryType: 'DDR4', watts: 65 },
    { id: 'c3', name: 'Intel Core i5-13400F', price: 17200, brand: 'Intel', socket: 'LGA1700', memoryType: 'DDR5', watts: 65 },
    { id: 'c4', name: 'AMD Ryzen 5 7600X', price: 21500, brand: 'AMD', socket: 'AM5', memoryType: 'DDR5', watts: 105 },
    { id: 'c5', name: 'Intel Core i7-14700K', price: 36999, brand: 'Intel', socket: 'LGA1700', memoryType: 'DDR5', watts: 125 },
    { id: 'c6', name: 'AMD Ryzen 7 7800X3D', price: 34500, brand: 'AMD', socket: 'AM5', memoryType: 'DDR5', watts: 120 },
  ],
  motherboard: [
    { id: 'm1', name: 'MSI PRO H610M-E', price: 6200, socket: 'LGA1700', memoryType: 'DDR4', formFactor: 'mATX' },
    { id: 'm2', name: 'Gigabyte B550M DS3H', price: 8400, socket: 'AM4', memoryType: 'DDR4', formFactor: 'mATX' },
    { id: 'm3', name: 'MSI B760M Bomber WIFI', price: 11500, socket: 'LGA1700', memoryType: 'DDR5', formFactor: 'mATX' },
    { id: 'm4', name: 'ASUS Prime B650M-A II', price: 13200, socket: 'AM5', memoryType: 'DDR5', formFactor: 'mATX' },
    { id: 'm5', name: 'MSI MAG Z790 Tomahawk', price: 26500, socket: 'LGA1700', memoryType: 'DDR5', formFactor: 'ATX' },
    { id: 'm6', name: 'ASUS ROG Strix X670E-F', price: 32000, socket: 'AM5', memoryType: 'DDR5', formFactor: 'ATX' },
  ],
  ram: [
    { id: 'r1', name: 'Corsair Vengeance LPX 8GB', price: 1800, type: 'DDR4', speed: '3200MHz', size: 8 },
    { id: 'r2', name: 'G.Skill Ripjaws V 16GB (8x2)', price: 3400, type: 'DDR4', speed: '3200MHz', size: 16 },
    { id: 'r3', name: 'XPG Lancer 16GB (16x1)', price: 4800, type: 'DDR5', speed: '5200MHz', size: 16 },
    { id: 'r4', name: 'Corsair Vengeance 32GB (16x2)', price: 9200, type: 'DDR5', speed: '6000MHz', size: 32 },
    { id: 'r5', name: 'G.Skill Trident Z5 RGB 32GB', price: 11500, type: 'DDR5', speed: '6400MHz', size: 32 },
  ],
  gpu: [
    { id: 'g0', name: 'Integrated / None', price: 0, watts: 0 },
    { id: 'g1', name: 'AMD Radeon RX 6600 8GB', price: 19500, watts: 132 },
    { id: 'g2', name: 'NVIDIA RTX 3060 12GB', price: 24500, watts: 170 },
    { id: 'g3', name: 'NVIDIA RTX 4060 8GB', price: 28000, watts: 115 },
    { id: 'g4', name: 'AMD Radeon RX 7700 XT', price: 41000, watts: 245 },
    { id: 'g5', name: 'NVIDIA RTX 4070 Super', price: 58000, watts: 220 },
    { id: 'g6', name: 'NVIDIA RTX 4080 Super', price: 98000, watts: 320 },
  ],
  storage: [
    { id: 's1', name: 'Crucial BX500 500GB SATA', price: 2600, type: 'SATA' },
    { id: 's2', name: 'WD Blue SN580 500GB NVMe', price: 3500, type: 'NVMe' },
    { id: 's3', name: 'Crucial P3 Plus 1TB Gen4', price: 5600, type: 'NVMe' },
    { id: 's4', name: 'Samsung 990 Pro 1TB Gen4', price: 9800, type: 'NVMe' },
    { id: 's5', name: 'WD Black SN850X 2TB Gen4', price: 14500, type: 'NVMe' },
  ],
  psu: [
    { id: 'p1', name: 'Ant Esports VS500L', price: 1800, watts: 500, rating: 'Non-80+' },
    { id: 'p2', name: 'Cooler Master MWE 550W', price: 3800, watts: 550, rating: '80+ Bronze' },
    { id: 'p3', name: 'Corsair CV650', price: 4900, watts: 650, rating: '80+ Bronze' },
    { id: 'p4', name: 'Deepcool PM750D', price: 6200, watts: 750, rating: '80+ Gold' },
    { id: 'p5', name: 'Corsair RM850e', price: 9800, watts: 850, rating: '80+ Gold' },
  ],
  case: [
    { id: 'ca1', name: 'Ant Esports ICE-100', price: 2800, formFactor: 'ATX' },
    { id: 'ca2', name: 'Galax Revolution-05', price: 3800, formFactor: 'ATX' },
    { id: 'ca3', name: 'Lian Li Lancool 216', price: 8200, formFactor: 'ATX' },
    { id: 'ca4', name: 'NZXT H9 Flow', price: 14500, formFactor: 'ATX' },
  ]
};

const CATEGORIES: CategoryInfo[] = [
  { key: 'cpu', label: 'Processor', icon: Cpu },
  { key: 'motherboard', label: 'Motherboard', icon: CircuitBoard },
  { key: 'ram', label: 'Memory', icon: MemoryStick },
  { key: 'storage', label: 'Storage', icon: HardDrive },
  { key: 'gpu', label: 'Graphics Card', icon: Monitor },
  { key: 'psu', label: 'Power Supply', icon: Zap },
  { key: 'case', label: 'Cabinet', icon: Box },
];

const App = () => {
  const [build, setBuild] = useState<BuildState>({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    storage: null,
    psu: null,
    case: null
  });
  
  const [step, setStep] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWatts, setTotalWatts] = useState(0);
  const [warnings, setWarnings] = useState<string[]>([]);

  // Gemini AI States
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiMode, setAiMode] = useState<'advisor' | 'picker'>('advisor'); // 'advisor' (rate build) or 'picker' (help choose)
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const apiKey = ""; // Injected by environment

  // --- COMPATIBILITY LOGIC ---
  useEffect(() => {
    let price = 0;
    let watts = 0;
    const newWarnings = [];

    // Calculate totals
    Object.values(build).forEach(part => {
      if (part) {
        price += part.price;
        if (part.watts) watts += part.watts;
      }
    });

    // Base system wattage
    watts += 50; 

    // Logic: Socket Mismatch
    if (build.cpu && build.motherboard) {
      if (build.cpu.socket !== build.motherboard.socket) {
        newWarnings.push(`Socket Mismatch: CPU is ${build.cpu.socket} but Motherboard is ${build.motherboard.socket}`);
      }
    }

    // Logic: RAM vs Motherboard
    if (build.ram && build.motherboard) {
      if (build.ram.type !== build.motherboard.memoryType) {
        newWarnings.push(`Memory Mismatch: Motherboard requires ${build.motherboard.memoryType} but RAM is ${build.ram.type}`);
      }
    }

    // Logic: PSU Wattage
    if (build.psu) {
      const recommended = watts + 100;
      if (build.psu.watts < recommended) {
        newWarnings.push(`Low Power: Estimated usage is ${watts}W. Recommended PSU is at least ${recommended}W.`);
      }
    }

    setTotalPrice(price);
    setTotalWatts(watts);
    setWarnings(newWarnings);

  }, [build]);

  const handleSelect = (category: keyof BuildState, product: Product) => {
    setBuild(prev => ({ ...prev, [category]: product }));
    if (step < CATEGORIES.length - 1) {
      setTimeout(() => setStep(prev => prev + 1), 200);
    }
  };

  const getFilteredProducts = (categoryKey: keyof BuildState) => {
    let products = PRODUCTS[categoryKey];

    if (categoryKey === 'motherboard' && build.cpu) {
      products = (products as MotherboardProduct[]).filter(m => m.socket === build.cpu!.socket);
    }

    if (categoryKey === 'ram' && build.motherboard) {
      products = (products as RAMProduct[]).filter(r => r.type === build.motherboard!.memoryType);
    }

    return products;
  };

  // --- GEMINI AI FUNCTIONS ---

  const callGemini = async (prompt: string, isJson = false): Promise<any> => {
    setAiLoading(true);
    setAiResponse(null);
    try {
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: isJson ? { responseMimeType: "application/json" } : {}
      };
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );
      
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (isJson) {
         return JSON.parse(text);
      }
      return text;

    } catch (error) {
      console.error("Gemini Error:", error);
      return "Sorry, I couldn't reach the AI service right now.";
    } finally {
      setAiLoading(false);
    }
  };

  const handleRateMyBuild = async () => {
    setAiMode('advisor');
    setAiModalOpen(true);
    
    const partsList = Object.entries(build)
      .filter(([_, part]) => part)
      .map(([type, part]) => `${type}: ${part.name} (₹${part.price})`)
      .join(', ');

    if (!partsList) {
      setAiResponse("Please select at least a CPU and Motherboard before asking for an analysis.");
      return;
    }

    const prompt = `
      You are an expert PC builder in India. Analyze this build:
      ${partsList}
      Total Price: ₹${totalPrice}
      
      Provide a concise response in HTML format (no markdown, just tags like <b>, <p>, <ul>, <li>) covering:
      1. <p><b>Rating:</b> X/10</p>
      2. <p><b>Gaming Performance:</b> (Estimate FPS for 1080p/1440p modern games)</p>
      3. <ul> (List 3 pros/cons or bottleneck warnings specific to this combo) </ul>
      4. <p><b>Value Verdict:</b> (Is it good value in Indian market?)</p>
      Keep it encouraging but realistic.
    `;
    
    const response = await callGemini(prompt, false);
    setAiResponse(response);
  };

  const handleAiPickParts = async () => {
    if (!aiInput.trim()) return;
    
    const prompt = `
      You are a PC Builder AI. I have a database of parts with IDs.
      DATABASE: ${JSON.stringify(PRODUCTS)}
      
      USER REQUEST: "${aiInput}"
      
      Task: Select the best CPU, Motherboard, RAM, GPU, Storage, PSU, and Case IDs from the database that match the user's request.
      Ensure compatibility (socket, memory type).
      
      Return ONLY a JSON object: { "cpu": "id", "motherboard": "id", "ram": "id", "gpu": "id", "storage": "id", "psu": "id", "case": "id" }
    `;

    const selectionIds = await callGemini(prompt, true);
    
    if (selectionIds) {
       // Map IDs back to objects
       const newBuild = { ...build };
       let foundAny = false;
       
       Object.keys(PRODUCTS).forEach(cat => {
          if (selectionIds[cat]) {
             const categoryKey = cat as keyof BuildState;
             const product = PRODUCTS[categoryKey].find((p: any) => p.id === selectionIds[cat]);
             if (product) {
               (newBuild as any)[cat] = product;
               foundAny = true;
             }
          }
       });
       
       if (foundAny) {
         setBuild(newBuild);
         setAiResponse("✨ I've updated your build with my recommendations based on your needs! You can tweak them further if you like.");
       } else {
         setAiResponse("I couldn't find valid parts matching your request in our current inventory.");
       }
    }
  };

  const currentCategory = CATEGORIES[step];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-20 shadow-lg backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/30">
              <CircuitBoard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              PCBuilder<span className="text-slate-400 font-medium">India</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
             <button 
               onClick={() => { setAiMode('picker'); setAiModalOpen(true); setAiResponse(null); setAiInput(''); }}
               className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
             >
               <Sparkles className="w-4 h-4 text-yellow-200" />
               AI Help Me Choose
             </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 rounded-full border border-slate-600">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>{totalWatts}W</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 rounded-full border border-indigo-500/30 text-indigo-300">
              <IndianRupee className="w-4 h-4" />
              <span className="text-lg">{totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: WIZARD */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-2 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isCompleted = !!build[cat.key];
              const isActive = step === idx;
              
              return (
                <button 
                  key={cat.key}
                  onClick={() => setStep(idx)}
                  className={`flex flex-col items-center gap-2 min-w-[4rem] group transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 relative
                    ${isActive ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 
                      isCompleted ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : 'border-slate-600 bg-slate-800 text-slate-500'}
                  `}>
                    <Icon className="w-5 h-5" />
                    {isCompleted && !isActive && (
                      <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                        <CheckCircle className="w-3 h-3 text-slate-900" />
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}>{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* Warnings Panel */}
          {warnings.length > 0 && (
            <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="text-sm text-red-200">
                <p className="font-semibold text-red-400 mb-1">Compatibility Issues Found:</p>
                <ul className="list-disc pl-4 space-y-1">
                  {warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>
          )}

          {/* Product Selection Area */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 min-h-[500px] shadow-inner">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                Select {currentCategory.label}
                {build[currentCategory.key] && <CheckCircle className="w-6 h-6 text-emerald-500" />}
              </h2>
              {/* Filter hints */}
              {currentCategory.key === 'motherboard' && build.cpu && (
                <span className="text-xs bg-indigo-900/50 text-indigo-200 px-3 py-1 rounded-full border border-indigo-500/30">
                  Compatible with {build.cpu.socket}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredProducts(currentCategory.key).map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleSelect(currentCategory.key, product)}
                  className={`
                    relative cursor-pointer group p-4 rounded-xl border transition-all duration-300
                    hover:border-indigo-500/50 hover:bg-slate-700/80
                    ${build[currentCategory.key]?.id === product.id 
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/50' 
                      : 'border-slate-700 bg-slate-800'}
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-slate-100 pr-2 leading-tight">{product.name}</span>
                    <span className="text-indigo-400 font-bold whitespace-nowrap bg-indigo-950/30 px-2 py-1 rounded">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="text-xs text-slate-400 space-y-1 mt-2">
                    {product.brand && <div className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-500 rounded-full"></div>{product.brand}</div>}
                    {product.socket && <div className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-500 rounded-full"></div>Socket: {product.socket}</div>}
                    {product.memoryType && <div className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-500 rounded-full"></div>Type: {product.memoryType}</div>}
                    {product.watts && product.watts > 0 && <div className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-500 rounded-full"></div>TDP: {product.watts}W</div>}
                  </div>

                  {/* Amazon Link Button */}
                  <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={`https://www.amazon.in/s?k=${encodeURIComponent(product.name)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} 
                      className="text-xs flex items-center gap-1 text-slate-400 hover:text-yellow-400 transition-colors font-medium"
                    >
                      Buy on Amazon <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Selected Indicator */}
                  {build[currentCategory.key]?.id === product.id && (
                    <div className="absolute top-0 right-0 p-2">
                       <div className="bg-indigo-500 rounded-bl-lg rounded-tr-lg p-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                       </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {getFilteredProducts(currentCategory.key).length === 0 && (
               <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                 <AlertTriangle className="w-12 h-12 mb-4 opacity-50" />
                 <p>No compatible parts found for your current selection.</p>
                 <button 
                  onClick={() => setBuild({...build, cpu: null, motherboard: null})}
                  className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4"
                 >
                   Reset Selections
                 </button>
               </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: VISUAL REPRESENTATION */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24 h-fit">
          
          {/* VISUAL BUILDER */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Box className="w-4 h-4" />
                Rig Preview
              </h3>
              {build.case && <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">{build.case.name}</span>}
            </div>
            
            {/* THE PC CASE VISUALIZER (CSS DRAWING) */}
            <div className="relative aspect-[3/4] w-full bg-slate-950 rounded-xl border-8 border-slate-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
               
               {/* Glass Reflection */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-50"></div>

               {/* -- INSIDE THE CASE -- */}
               <div className="absolute inset-0 p-6 flex flex-col">
                  
                  {/* Top Fans (Visual) */}
                  <div className="flex justify-center gap-4 mb-4 opacity-30">
                     <Fan className="w-12 h-12 text-slate-600 animate-spin-slow" />
                     <Fan className="w-12 h-12 text-slate-600 animate-spin-slow" />
                  </div>

                  {/* Motherboard Tray Area */}
                  <div className={`relative flex-1 rounded-lg transition-all duration-700 border-2 border-dashed
                    ${build.motherboard 
                      ? 'bg-slate-900 border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.5)]' 
                      : 'bg-transparent border-slate-800'}
                  `}>
                     {/* Motherboard Texture */}
                     {build.motherboard && (
                       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-900 grid grid-cols-6 grid-rows-6 gap-0.5 p-1">
                         {[...Array(36)].map((_,i) => <div key={i} className="bg-slate-800 rounded-sm"></div>)}
                       </div>
                     )}

                     {/* CPU Socket */}
                     <div className="absolute top-[15%] left-[35%] w-[30%] h-[20%] flex items-center justify-center">
                        <div className={`relative w-16 h-16 transition-all duration-500
                          ${build.cpu 
                            ? 'bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-100' 
                            : 'bg-slate-800 border-2 border-dashed border-slate-700 scale-90'}
                          rounded-md flex items-center justify-center group
                        `}>
                          {build.cpu ? (
                             <>
                               <Cpu className="text-white w-8 h-8 relative z-10" />
                               <div className="absolute inset-0 bg-indigo-500 blur-md opacity-50 animate-pulse"></div>
                             </>
                          ) : (
                             <span className="text-[10px] text-slate-600 font-mono">CPU</span>
                          )}
                        </div>
                     </div>

                     {/* RAM Slots */}
                     <div className="absolute top-[15%] right-[10%] w-[15%] h-[40%] flex gap-1 justify-center">
                        {[0, 1].map((slot) => (
                           <div key={slot} className={`w-3 h-full rounded transition-all duration-500 border border-slate-900
                              ${build.ram 
                                ? 'bg-gradient-to-b from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.6)]' 
                                : 'bg-slate-800/50 border-dashed border-slate-700'}
                           `}></div>
                        ))}
                     </div>

                     {/* GPU Slot */}
                     <div className="absolute top-[50%] left-2 right-2 h-16 flex items-center">
                        <div className={`w-full h-12 rounded transition-all duration-700 flex items-center px-4
                           ${build.gpu && build.gpu.id !== 'g0'
                             ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border border-slate-600 shadow-[0_5px_15px_rgba(0,0,0,0.5)] translate-x-0 opacity-100' 
                             : 'border-2 border-dashed border-slate-800 opacity-30'}
                        `}>
                           {build.gpu && build.gpu.id !== 'g0' && (
                             <>
                               <div className="flex-1 flex justify-end gap-3 mr-4">
                                  <div className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center">
                                    <Fan className="w-6 h-6 text-slate-500 animate-spin-slow" />
                                  </div>
                                  <div className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center">
                                    <Fan className="w-6 h-6 text-slate-500 animate-spin-slow" />
                                  </div>
                               </div>
                               <div className="h-1 w-full absolute bottom-0 left-0 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                               <span className="absolute left-4 text-[10px] text-slate-400 font-mono tracking-widest">GEFORCE RTX</span>
                             </>
                           )}
                           {!build.gpu && <span className="text-[10px] text-slate-700 font-mono w-full text-center">GPU SLOT</span>}
                        </div>
                     </div>
                     
                     {/* M.2 Storage (Tiny slot near CPU) */}
                     <div className="absolute top-[40%] left-[40%] w-12 h-4 flex items-center justify-center">
                        <div className={`w-full h-2 rounded transition-all duration-500
                           ${build.storage?.type === 'NVMe'
                             ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' 
                             : 'bg-slate-800 border border-dashed border-slate-700'}
                        `}></div>
                     </div>

                  </div>

                  {/* PSU Chamber (Bottom) */}
                  <div className="mt-4 h-20 bg-slate-900 rounded-lg border border-slate-800 relative overflow-hidden flex items-center justify-center">
                     {/* Hex Pattern Mesh */}
                     <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,_transparent_20%,_#0f172a_20%)] bg-[length:8px_8px]"></div>
                     
                     <div className={`relative z-10 transition-all duration-500 flex flex-col items-center
                        ${build.psu ? 'opacity-100 text-yellow-500' : 'opacity-20 text-slate-600'}
                     `}>
                        <Zap className={`w-8 h-8 ${build.psu ? 'fill-yellow-500' : ''}`} />
                        <span className="text-xs font-bold mt-1">{build.psu ? `${build.psu.watts}W` : 'PSU'}</span>
                     </div>

                     {/* SATA SSD Mounts on PSU Shroud */}
                     {build.storage?.type === 'SATA' && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-14 bg-slate-800 border border-slate-600 rounded flex items-center justify-center shadow-lg">
                           <HardDrive className="w-6 h-6 text-emerald-500" />
                        </div>
                     )}
                  </div>
               </div>

            </div>
          </div>

          {/* TOTALS & SUMMARY */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
             <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-700">
               <span className="text-slate-400 text-sm font-medium uppercase">Total Cost</span>
               <span className="text-3xl font-bold text-white flex items-center">
                 <IndianRupee className="w-6 h-6 mr-1 text-slate-400" />
                 {totalPrice.toLocaleString('en-IN')}
               </span>
             </div>
             
             {/* Part List Summary */}
             <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
               {Object.entries(build).map(([key, part]) => part && (
                 <div key={key} className="flex justify-between items-center text-sm group p-2 rounded hover:bg-slate-700/50 transition-colors">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      <span className="text-slate-400 capitalize">{key}</span>
                   </div>
                   <span className="text-slate-200 text-right truncate w-32 font-medium">{part.name}</span>
                 </div>
               ))}
               {!Object.values(build).some(x => x) && (
                 <div className="text-center text-slate-600 italic py-4 text-sm">Your build list is empty.</div>
               )}
             </div>
             
             {/* AI Rate Button */}
             <button 
               onClick={handleRateMyBuild}
               disabled={!build.cpu}
               className="w-full mb-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2"
             >
               <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
               Rate My Build with AI
             </button>

             <div className="grid grid-cols-2 gap-3">
               <button 
                 onClick={() => window.print()}
                 disabled={!build.cpu}
                 className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
               >
                 <ShoppingCart className="w-4 h-4" />
                 Print List
               </button>
               
               <button 
                  onClick={() => {
                    setBuild({cpu: null, motherboard: null, ram: null, gpu: null, storage: null, psu: null, case: null});
                    setStep(0);
                  }}
                  className="bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
               >
                 <RotateCcw className="w-4 h-4" />
                 Reset
               </button>
             </div>
          </div>

        </div>
      </main>
      
      {/* GEMINI AI MODAL */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                {aiMode === 'advisor' ? 'AI Build Inspector' : 'AI Part Picker'}
              </h3>
              <button 
                onClick={() => setAiModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {aiMode === 'picker' && (
                <div className="mb-6">
                   <p className="text-sm text-slate-400 mb-2">Describe what you want to do (e.g., "1440p gaming and streaming" or "Budget build under 40k").</p>
                   <div className="flex gap-2">
                     <input 
                       type="text" 
                       value={aiInput}
                       onChange={(e) => setAiInput(e.target.value)}
                       placeholder="I want to play Cyberpunk 2077..."
                       className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                       onKeyDown={(e) => e.key === 'Enter' && handleAiPickParts()}
                     />
                     <button 
                       onClick={handleAiPickParts}
                       disabled={aiLoading}
                       className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2 rounded-lg"
                     >
                       {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                     </button>
                   </div>
                </div>
              )}

              {/* Response Area */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[150px]">
                {aiLoading ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3 py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    <span className="animate-pulse">Consulting the AI experts...</span>
                  </div>
                ) : aiResponse ? (
                  <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                    {/* Render HTML safely for the analysis, plain text for simple messages */}
                    {aiMode === 'advisor' ? (
                       <div dangerouslySetInnerHTML={{ __html: aiResponse }} />
                    ) : (
                       <p>{aiResponse}</p>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 italic py-8">
                     <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                     {aiMode === 'advisor' ? 'Waiting for analysis...' : 'Tell me what you need!'}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Sticky Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-800 p-4 border-t border-slate-700 flex justify-between items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
         <div>
           <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Total</div>
           <div className="text-xl font-bold text-white flex items-center">
              <IndianRupee className="w-4 h-4" />
              {totalPrice.toLocaleString('en-IN')}
           </div>
         </div>
         <div className="flex gap-2">
            <button 
              onClick={() => { setAiMode('picker'); setAiModalOpen(true); }}
              className="bg-purple-600/20 text-purple-300 p-2.5 rounded-lg border border-purple-500/50"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                  if (step < CATEGORIES.length - 1) setStep(step + 1);
              }}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/40"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
         </div>
      </div>

    </div>
  )
}

export default App
