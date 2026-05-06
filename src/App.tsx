import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { MarkerHighlight } from './components/ui/marker-highlight';

const ROLES = [
  { text: "交互设计师", bg: "#bbf7d0" },
  { text: "视觉设计师", bg: "#A8C7FA" },
  { text: "AI工程师", bg: "#d2c4ff" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'works' | 'about'>('works');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [time, setTime] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);

  // Postcard States
  const [postcards, setPostcards] = useState([
    { id: 1, message: "Hi there! Just found out your website. It's really cool!!!", from: "Dennis", date: "Apr 14, 2026", rotate: -1, stamp: "https://picsum.photos/id/1015/100/120" },
    { id: 2, message: "Your space looks so great! I love how you've organized things! Keep up the good work and thank you for bringing all your crafts alive!", from: "Huyen", date: "Apr 14, 2026", rotate: 1.5, stamp: "https://picsum.photos/id/1016/100/120" },
    { id: 3, message: "Waving from a coast 👋", from: "Naz", date: "Apr 15, 2026", rotate: -2, stamp: "https://picsum.photos/id/1018/100/120" },
  ]);
  const [newCardContent, setNewCardContent] = useState("");
  const [newCardName, setNewCardName] = useState("");

  const handleAddPostcard = () => {
    if (!newCardContent.trim() || !newCardName.trim()) return;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newCard = {
      id: Date.now(),
      message: newCardContent,
      from: newCardName,
      date: date,
      rotate: Math.random() * 4 - 2, // Random slight rotation
      stamp: `https://picsum.photos/seed/${Date.now()}/100/120`
    };
    setPostcards([newCard, ...postcards]);
    setNewCardContent("");
    setNewCardName("");
  };

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(roleInterval);
  }, []);

  // Keep the editorial touch alive by showing real active time.
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#f2f2ef] text-[#111111] font-sans min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#111] selection:text-[#f2f2ef]">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 relative z-10 w-full">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-base tracking-tight">BAOKENI</div>
          <div className="hidden md:flex items-center gap-2 border border-[#111111]/20 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide">
            <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></div>
            Available for work
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => { setActiveTab('works'); setSelectedProject(null); }} 
            className={`cursor-pointer no-underline text-sm font-medium transition-colors ${activeTab === 'works' && !selectedProject ? 'text-[#111111]' : 'text-[#111111]/40 hover:text-[#111111]'}`}
          >
            Works
          </button>
          <button 
            onClick={() => { setActiveTab('about'); setSelectedProject(null); }} 
            className={`cursor-pointer no-underline text-sm font-medium transition-colors ${activeTab === 'about' ? 'text-[#111111]' : 'text-[#111111]/40 hover:text-[#111111]'}`}
          >
            About
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        {selectedProject ? (
          <div className="w-full flex flex-col animate-[fadeIn_0.5s_ease-out] px-8 py-10 max-w-[1440px] mx-auto">
            <button 
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-sm font-medium text-[#111111]/50 hover:text-[#111111] transition-colors mb-10 border border-[#111111]/20 px-4 py-2 rounded-full w-fit cursor-pointer bg-transparent"
            >
              ← 返回作品列表
            </button>
            <div className="w-full bg-[#eaeaeb] rounded-2xl overflow-hidden p-2 md:p-8">
              <img 
                src={`/${selectedProject}_detail.png`}
                alt="项目详情" 
                className="w-full h-auto object-cover rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]" 
              />
            </div>
          </div>
        ) : activeTab === 'works' ? (
          <div className="w-full flex flex-col animate-[fadeIn_0.5s_ease-out]">
            {/* Hero Section */}
            <div className="px-8 pt-10 md:pt-24 pb-8 md:pb-16 flex flex-col md:flex-row justify-between items-start gap-8 relative">
              {/* Subtle watermark in background matching the style */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] text-[#111111]/[0.02] select-none pointer-events-none leading-none mt-10 z-0">
                ✿
              </div>

              {/* Floating 3D Decoration Images */}
              <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 hidden sm:block">
                <motion.img 
                  animate={{ y: [0, -24, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src="/star.png" 
                  alt="Silver Star Decoration" 
                  className="absolute top-[8%] right-[5%] md:right-[10%] w-16 md:w-24 lg:w-32 object-contain"
                />
              </div>
              <div className="max-w-[1000px] relative z-10 w-full flex flex-col">
                <h1 className="text-[52px] md:text-[88px] xl:text-[100px] leading-[1.0] font-medium tracking-[-0.03em] flex flex-col items-start w-full">
                  <div className="flex flex-wrap items-center gap-x-0 gap-y-4 font-sans">
                    <span className="whitespace-nowrap pt-1">bkn - </span>
                    <MarkerHighlight
                      highlight={ROLES[roleIndex].text}
                      markerColor={ROLES[roleIndex].bg}
                      baseColor="#111111"
                      highlightedTextColor="#111111"
                      className="ms-1 md:ms-2 pt-1 font-sans font-medium"
                    />
                  </div>
                  <span className="text-[#111111]/30 mt-4 block w-full">聚焦用户体验与产品增长</span>
                </h1>
              </div>
              <div className="flex flex-row md:flex-col items-start md:items-end flex-wrap gap-2 relative z-10 mt-6 md:mt-0">
                <span className="border border-[#111111]/80 rounded-full px-3 py-1 text-[11px] uppercase font-medium tracking-wider whitespace-nowrap">产品设计 PRODUCT DESIGN</span>
                <span className="border border-[#111111]/80 rounded-full px-3 py-1 text-[11px] uppercase font-medium tracking-wider whitespace-nowrap">交互设计 UX-UI</span>
                <span className="border border-[#111111]/80 rounded-full px-3 py-1 text-[11px] uppercase font-medium tracking-wider whitespace-nowrap">数据驱动 DATA DRIVEN</span>
              </div>
            </div>

            {/* Local time and scroll indicator border line */}
            <div className="px-8 pb-16 flex justify-between items-center text-xs font-medium uppercase tracking-wider relative z-10">
              <div className="border border-[#111111]/40 rounded-full px-3 py-1 bg-white/50 backdrop-blur-sm">
                LOCAL TIME → {time || '14:42'}
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
                Go to work ↓
              </div>
            </div>

            {/* Showcase Section */}
            <div className="w-full flex flex-col px-8 pb-32 max-w-[2000px] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 w-full gap-8">
                <h2 className="text-[32px] md:text-[44px] leading-[1.1] font-medium tracking-tight max-w-[450px]">
                  Showcase of selected projects and archive
                </h2>
                <div className="flex flex-col items-start md:items-end gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-semibold mr-1 tracking-widest">Featuring</span>
                    <span className="border border-[#111111]/80 rounded-full px-2.5 py-1 text-[10px] uppercase font-medium">UX-UI</span>
                    <span className="border border-[#111111]/80 rounded-full px-2.5 py-1 text-[10px] uppercase font-medium">VISUAL IDENTITY</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-semibold mr-1 tracking-widest">From</span>
                    <span className="border border-[#111111]/80 rounded-full px-2.5 py-1 text-[10px] uppercase font-medium">2021</span>
                    <span className="text-[10px] uppercase font-semibold mx-1">To</span>
                    <span className="border border-[#111111]/80 rounded-full px-2.5 py-1 text-[10px] uppercase font-medium">2026</span>
                  </div>
                </div>
              </div>
              
              <div className="relative pt-8">
                {/* Custom top borderline overlapping pill */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#111111]/20"></div>
                <div className="bg-[#111111] text-[#f2f2ef] rounded-full px-3 py-1 text-[11px] font-medium absolute -top-3 left-0">Selected Projects</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                  {/* Card 1 */}
                  <div 
                    className="relative group cursor-pointer aspect-[3/4] md:aspect-[4/5] rounded-[24px] overflow-hidden bg-white"
                    onClick={() => setSelectedProject('project1')}
                  >
                    <img 
                      src="/project1.png" 
                      alt="UX/UI设计项目" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      referrerPolicy="no-referrer" 
                    />
                    {/* Gradient Overlay for Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.85)] via-[rgba(17,17,17,0.1)] to-[rgba(17,17,17,0.3)] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                      <div className="flex flex-wrap gap-2">
                        <span className="border border-white/40 text-white rounded-full px-3 py-1 text-[10px] uppercase font-medium backdrop-blur-sm">UX-UI</span>
                      </div>
                      <span className="border border-white/40 text-white rounded-full px-3 py-1 text-[10px] font-medium backdrop-blur-sm">2026</span>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 right-6 text-white group-hover:translate-y-[-4px] transition-transform duration-500">
                      <h3 className="text-[28px] md:text-[32px] font-medium tracking-tight mb-1">字节滴滴</h3>
                      <p className="text-sm md:text-base text-white/80 font-medium">今日头条热点项目</p>
                    </div>
                  </div>
                  
                  {/* Card 2 */}
                  <div 
                    className="relative group cursor-pointer aspect-[3/4] md:aspect-[4/5] rounded-[24px] overflow-hidden bg-white"
                    onClick={() => setSelectedProject('project2')}
                  >
                     <img 
                      src="/project2.png" 
                      alt="视觉项目" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.85)] via-[rgba(17,17,17,0.1)] to-[rgba(17,17,17,0.3)] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                      <div className="flex flex-wrap gap-2">
                        <span className="border border-white/40 text-white rounded-full px-3 py-1 text-[10px] uppercase font-medium backdrop-blur-sm">VISUAL IDENTITY</span>
                      </div>
                      <span className="border border-white/40 text-white rounded-full px-3 py-1 text-[10px] font-medium backdrop-blur-sm">2025</span>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 right-6 text-white group-hover:translate-y-[-4px] transition-transform duration-500">
                      <h3 className="text-[28px] md:text-[32px] font-medium tracking-tight mb-1">AIGC运营视觉项目</h3>
                      <p className="text-sm md:text-base text-white/80 font-medium">美团奶茶狂欢日项目</p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div 
                    className="relative group cursor-pointer aspect-[3/4] md:aspect-[4/5] rounded-[24px] overflow-hidden bg-white"
                    onClick={() => setSelectedProject('project3')}
                  >
                    <img 
                      src="/project3.png" 
                      alt="我的日常" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.85)] via-[rgba(17,17,17,0.1)] to-[rgba(17,17,17,0.3)] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                      <div className="flex flex-wrap gap-2">
                        <span className="border border-white/40 text-white rounded-full px-3 py-1 text-[10px] uppercase font-medium backdrop-blur-sm">LIFE & HOBBY</span>
                      </div>
                      <span className="border border-white/40 text-white rounded-full px-3 py-1 text-[10px] font-medium backdrop-blur-sm">2023 - NOW</span>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 right-6 text-white group-hover:translate-y-[-4px] transition-transform duration-500">
                      <h3 className="text-[28px] md:text-[32px] font-medium tracking-tight mb-1">我的兴趣爱好</h3>
                      <p className="text-sm md:text-base text-white/80 font-medium">美术 & 游戏 & 旅游</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Postcards Section */}
            <div className="w-full flex flex-col px-8 pb-32 max-w-[2000px] mx-auto mt-10">
              {/* Header */}
              <div className="flex flex-col lg:flex-row gap-12 items-start justify-between mb-16 border-t border-[#111111]/20 pt-16">
                <div className="flex flex-col gap-6 max-w-[440px]">
                  <h2 className="text-[40px] md:text-[56px] leading-[1.1] font-medium tracking-tight">Postcards</h2>
                  <div className="text-sm md:text-base leading-relaxed text-[#111111]/80 font-medium">
                    这个网站里基本都是我在单向输出。而这里的明信片给了你一个回应的机会——哪怕只是一两句话。给我留张明信片吧，告诉我你的想法，你从哪里来，或者仅仅是说声你来过。我很期待你的回音。
                  </div>
                </div>
                
                {/* Inline Postcard Form */}
                <div className="w-full lg:w-[500px] bg-[#fdfaf2] shadow-[0_4px_24px_rgb(0,0,0,0.06)] border border-[#111]/5 p-6 md:p-8 flex flex-col relative rotate-1 hover:rotate-0 transition-transform duration-300 transform-gpu z-20">
                  <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111]/40 mb-4 flex items-center justify-between border-b border-[#111]/10 pb-3">
                    Write a Postcard
                    <span className="text-[#111]/20">✿</span>
                  </h3>
                  <textarea
                    value={newCardContent}
                    onChange={(e) => setNewCardContent(e.target.value)}
                    placeholder="Tell me what you're thinking, where you're visiting from..."
                    className="w-full bg-transparent border-none outline-none resize-none font-handwriting text-[24px] md:text-[28px] leading-[1.3] h-[100px] placeholder:text-[#111]/20 text-[#111]"
                  />
                  <div className="flex items-center justify-between mt-4 border-t border-dotted border-[#111]/20 pt-4">
                    <input
                      type="text"
                      value={newCardName}
                      onChange={(e) => setNewCardName(e.target.value)}
                      placeholder="Your Name / Sign"
                      className="w-[150px] bg-transparent border-none outline-none font-handwriting text-[20px] md:text-[24px] placeholder:text-[#111]/20 text-[#111]"
                    />
                    <button
                      onClick={handleAddPostcard}
                      className="bg-[#d2c4ff] text-[#111] rounded-full py-2 px-5 font-sans text-xs font-bold tracking-widest uppercase hover:bg-[#bda5ff] transition-colors flex items-center gap-2"
                    >
                      Send 
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="flex overflow-x-auto gap-8 pb-12 -mx-8 px-8 snap-x z-10" style={{ scrollbarWidth: 'none' }}>
                {postcards.map((p) => (
                  <div 
                    key={p.id} 
                    className="relative shrink-0 w-[85vw] md:w-[480px] h-[300px] bg-[#fdfaf2] shadow-[0_4px_24px_rgb(0,0,0,0.06)] border border-[#111]/5 p-6 md:p-8 flex snap-center hover:-translate-y-2 transition-transform duration-300"
                    style={{ transform: `rotate(${p.rotate}deg)` }}
                  >
                    {/* Left: Message */}
                    <div className="flex-1 pr-4 md:pr-8 flex items-start overflow-hidden">
                      <p className="font-handwriting text-2xl md:text-[32px] leading-[1.3] text-[#111] whitespace-pre-wrap">{p.message}</p>
                    </div>
                    {/* Divider */}
                    <div className="w-[1px] bg-[#111111]/10 h-full"></div>
                    {/* Right: Info & Stamp */}
                    <div className="w-[120px] md:w-[150px] pl-4 md:pl-6 flex flex-col justify-end relative h-full">
                      {/* Stamp image */}
                      <div className="absolute top-0 right-0 w-[50px] h-[60px] md:w-[60px] md:h-[70px] bg-white border-[1.5px] border-dashed border-[#111111]/20 p-1">
                        <img src={p.stamp} alt="stamp" className="w-full h-full object-cover" />
                      </div>
                      {/* Postmark Circle */}
                      <div className="absolute top-4 right-6 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#111]/30 flex items-center justify-center -rotate-12 z-10 pointer-events-none mix-blend-multiply opacity-50">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#111]/30 text-[7px] md:text-[8px] text-[#111] text-center leading-[1.1] flex items-center justify-center font-sans tracking-widest">
                          {p.date.split(' ')[0].toUpperCase()}<br/>2026
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-5 mt-auto">
                        <div>
                          <div className="text-[10px] text-[#111111]/50 uppercase tracking-[0.2em] mb-1 font-sans font-medium">From:</div>
                          <div className="font-handwriting text-[22px] md:text-[26px] border-b border-dotted border-[#111111]/30 pb-0.5 text-[#111] whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-between">
                            {p.from}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-1 opacity-50"><path d="M5 19L19 5M19 5v10M19 5H9"/></svg>
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#111111]/50 uppercase tracking-[0.2em] mb-1 font-sans font-medium">Date:</div>
                          <div className="font-handwriting text-[22px] md:text-[26px] border-b border-dotted border-[#111111]/30 pb-0.5 text-[#111] whitespace-nowrap">{p.date.replace(/, 202\d/, '')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Massive Footer Text scrolling ticker substitute */}
            <div className="w-full border-t border-[#111111]/20 py-2 sm:py-6 overflow-hidden flex whitespace-nowrap bg-white/30 backdrop-blur-md">
              <h1 className="text-[80px] sm:text-[140px] leading-none font-medium tracking-[-0.05em] inline-block pr-10 text-[#111111]">
                Let's talk ↗ Let's talk ↗ Let's talk ↗ Let's talk ↗
              </h1>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center px-4 md:px-8 pb-32 animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-4xl w-full flex flex-col pt-10 md:pt-20">
              <h1 className="text-[52px] md:text-[80px] leading-[1.0] font-medium mb-6 md:mb-10 tracking-[-0.03em]">包可妮</h1>
              <p className="text-xl md:text-2xl text-[#111111]/60 font-medium mb-16 max-w-[600px] leading-relaxed">
                UX / 交互 / 产品设计师。聚焦用户体验与产品增长，在复杂业务中构建清晰、有温度的交互体验。
              </p>

              {/* Archive styled section - About */}
              <div className="w-full border-t border-[#111111]/20 relative pt-16 mb-20">
                <div className="bg-[#111111] text-[#f2f2ef] rounded-full px-3 py-1 text-[11px] font-medium absolute -top-3 left-0 shadow-sm">About Me</div>
                <div className="text-base md:text-lg text-[#111111] leading-relaxed max-w-[600px] flex flex-col gap-6">
                  <p>我是一名就读于中国美术学院的产品设计研究生，专注于用户体验设计与交互创新。我关注技术与人之间的关系，擅长在复杂信息与多场景中，通过结构化设计与情感化表达，构建高效且有感知力的产品体验。</p>
                  <p>在过往实践中，我参与并主导过内容分发、用户增长、分享传播等多个核心场景的设计工作，具备从策略到落地的完整设计能力。</p>
                </div>
              </div>

              {/* Archive styled section - Experience */}
              <div className="w-full border-t border-[#111111]/20 relative pt-16 mb-20">
                <div className="bg-[#111111] text-[#f2f2ef] rounded-full px-3 py-1 text-[11px] font-medium absolute -top-3 left-0 shadow-sm">Archive Experience</div>
                <div className="flex flex-col w-full border-t border-[#111111]/10 mt-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[#111111]/10 gap-3 md:gap-4 hover:bg-black/[0.02] transition-colors group">
                    <div className="text-[22px] font-medium tracking-tight group-hover:translate-x-2 transition-transform">字节跳动｜今日头条</div>
                    <div className="flex gap-2 items-center">
                      <span className="border border-[#111111]/30 rounded-full px-3 py-1 text-[10px] uppercase font-medium bg-white/50">产品设计师</span>
                      <span className="border border-[#111111]/30 rounded-full px-3 py-1 text-[10px] uppercase font-medium bg-white/50">2025</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[#111111]/10 gap-3 md:gap-4 hover:bg-black/[0.02] transition-colors group">
                    <div className="text-[22px] font-medium tracking-tight group-hover:translate-x-2 transition-transform">滴滴出行｜泛出行</div>
                    <div className="flex gap-2 items-center">
                      <span className="border border-[#111111]/30 rounded-full px-3 py-1 text-[10px] uppercase font-medium bg-white/50">UI / 视觉设计师</span>
                      <span className="border border-[#111111]/30 rounded-full px-3 py-1 text-[10px] uppercase font-medium bg-white/50">2025</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[#111111]/10 gap-3 md:gap-4 hover:bg-black/[0.02] transition-colors group">
                    <div className="text-[22px] font-medium tracking-tight group-hover:translate-x-2 transition-transform">英语趣配音 / 赛博众创</div>
                    <div className="flex gap-2 items-center">
                      <span className="border border-[#111111]/30 rounded-full px-3 py-1 text-[10px] uppercase font-medium bg-white/50">UI / 视觉设计师</span>
                      <span className="border border-[#111111]/30 rounded-full px-3 py-1 text-[10px] uppercase font-medium bg-white/50">2024</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Archive styled section - Awards */}
              <div className="w-full border-t border-[#111111]/20 relative pt-16">
                <div className="bg-[#111111] text-[#f2f2ef] rounded-full px-3 py-1 text-[11px] font-medium absolute -top-3 left-0 shadow-sm">Archive Awards</div>
                <div className="flex flex-col w-full border-t border-[#111111]/10 mt-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[#111111]/10 gap-3 md:gap-4 hover:bg-black/[0.02] transition-colors group">
                    <div className="text-[22px] font-medium tracking-tight group-hover:translate-x-2 transition-transform">IDA Design Awards</div>
                    <span className="border border-[#111111]/30 rounded-full px-3 py-1 text-[10px] uppercase font-medium bg-white/50">荣誉提名</span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[#111111]/10 gap-3 md:gap-4 hover:bg-black/[0.02] transition-colors group">
                    <div className="text-[22px] font-medium tracking-tight group-hover:translate-x-2 transition-transform">London Design Awards</div>
                    <span className="border border-[#111111]/30 rounded-full px-3 py-1 text-[10px] uppercase font-medium bg-white/50">铂金奖</span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[#111111]/10 gap-3 md:gap-4 hover:bg-black/[0.02] transition-colors group">
                    <div className="text-[22px] font-medium tracking-tight group-hover:translate-x-2 transition-transform">MUSE Design Awards</div>
                    <span className="border border-[#111111]/30 rounded-full px-3 py-1 text-[10px] uppercase font-medium bg-white/50">金奖</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      <footer className="w-full flex justify-between items-center px-4 md:px-8 py-5 text-xs font-semibold uppercase tracking-wider border-t border-[#111111]/10 z-10 bg-white/40 backdrop-blur-md">
        <div>© 2026 BAOKENI</div>
        <div className="hidden sm:block">Made with love</div>
        <div className="cursor-pointer hover:opacity-50 transition-opacity" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Go all the way up ↑</div>
      </footer>
    </div>
  );
}
