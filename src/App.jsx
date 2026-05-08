import React, { useState } from 'react';
import { Coffee, Users, Brain, Globe, TrendingUp, Briefcase, Zap, Heart, MessageCircle, Link, Camera, Hash, Shield, Download, Loader2, Maximize2, Minimize2, ExternalLink } from 'lucide-react';

// 手写 GitHub SVG 图标，彻底解决 [MISSING_EXPORT] 报错
const GithubIcon = ({ size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.2-.3 2.4 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const themes = [
  { id: "01", title: "宏观 vs Crypto", subtitle: "Macro vs Crypto: Who Drives the Market?", icon: <TrendingUp size={48} />, color: "#002FA7", accent: "#FF4F00", tags: ["利率", "流动性", "ETF"] },
  { id: "02", title: "AI：泡沫还是革命？", subtitle: "AI: Bubble or Real Productivity Shift?", icon: <Brain size={48} />, color: "#002FA7", accent: "#00F0FF", tags: ["ChatGPT", "商业护城河", "估值"] },
  { id: "03", title: "留学生求职现实", subtitle: "Job Hunting: Effort vs Structure", icon: <Briefcase size={48} />, color: "#002FA7", accent: "#FFD700", tags: ["H1B", "Sponsorship", "回国/留美"] },
  { id: "04", title: "创业 vs 打工", subtitle: "Startup vs Corporate: What Makes Sense?", icon: <Zap size={48} />, color: "#002FA7", accent: "#FF4F00", tags: ["大厂", "小团队", "职场稳定"] },
  { id: "05", title: "注意力经济", subtitle: "Attention Economy: Who Controls You?", icon: <Camera size={48} />, color: "#002FA7", accent: "#FF0055", tags: ["算法", "小红书/TikTok", "商业化"] },
  { id: "06", title: "AI 会取代谁？", subtitle: "AI & The Future of Jobs", icon: <Users size={48} />, color: "#002FA7", accent: "#00FF41", tags: ["编程/金融", "教育落后", "技能重构"] },
  { id: "07", title: "钱 vs 兴趣", subtitle: "Money vs Passion: A False Choice?", icon: <Heart size={48} />, color: "#002FA7", accent: "#FF4F00", tags: ["高薪", "意义感", "人生阶段"] },
  { id: "08", title: "全球化正在倒退吗？", subtitle: "Is Globalization Reversing?", icon: <Globe size={48} />, color: "#002FA7", accent: "#FF4F00", tags: ["中美关系", "供应链", "职业出路"] },
  { id: "09", title: "Web3 的未来", subtitle: "Web3: Vision or Just Narrative?", icon: <Link size={48} />, color: "#002FA7", accent: "#00F0FF", tags: ["去中心化", "VC逻辑", "Builder"] },
  { id: "10", title: "建立人脉的本质", subtitle: "Networking: Connection or Transaction?", icon: <MessageCircle size={48} />, color: "#002FA7", accent: "#FFD700", tags: ["Coffee Chat文化", "社恐/社牛", "本质"] },
];

export default function App() {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [time, setTime] = useState("THURSDAY / 18:30");
  const [location, setLocation] = useState("USC VILLAGE / LOS ANGELES");
  const [statusLabel, setStatusLabel] = useState("SIGNAL");
  const [hosts, setHosts] = useState("USC & UCLA");
  const [isExporting, setIsExporting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = () => {
    setIsExporting(true);
    const element = document.getElementById('poster-canvas');
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = () => {
      window.html2canvas(element, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
            const clonedPoster = clonedDoc.getElementById('poster-canvas');
            clonedPoster.style.transform = 'none';
        }
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `CoffeeChat_${currentTheme.id}_${statusLabel}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        setIsExporting(false);
      }).catch(err => {
        console.error("Export failed:", err);
        setIsExporting(false);
      });
    };
    document.head.appendChild(script);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-100 font-sans text-neutral-900 overflow-hidden text-left">
      
      {!isFullscreen && (
        <div className="w-full md:w-80 bg-white p-6 shadow-xl z-20 overflow-y-auto max-h-screen border-r border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <h2 className="text-sm font-black tracking-widest uppercase text-neutral-400 italic">Production v4.4</h2>
            </div>
            <a href="https://github.com/ReginaJin168/coffechat-poster" target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-black transition-colors">
              <GithubIcon size={18} />
            </a>
          </div>
          
          <div className="mb-6">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4 block">选择对话焦点</label>
            <div className="grid grid-cols-1 gap-1.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentTheme(t)}
                  className={`text-left px-4 py-2.5 text-xs font-bold transition-all border-l-4 ${
                    currentTheme.id === t.id 
                    ? 'bg-neutral-900 text-white border-blue-600 pl-6 shadow-md scale-[1.02]' 
                    : 'bg-neutral-50 text-neutral-500 border-transparent hover:bg-neutral-200'
                  }`}
                >
                  {t.id} / {t.title}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="group">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1 block group-focus-within:text-blue-600 transition-colors">Hosted By</label>
              <input value={hosts} onChange={(e) => setHosts(e.target.value.toUpperCase())} className="w-full p-2 text-sm border-b border-neutral-200 focus:border-neutral-900 outline-none font-black text-blue-600 bg-transparent transition-all" />
            </div>
            <div className="group">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1 block group-focus-within:text-black transition-colors">Status Label</label>
              <input value={statusLabel} onChange={(e) => setStatusLabel(e.target.value.toUpperCase())} className="w-full p-2 text-sm border-b border-neutral-200 focus:border-neutral-900 outline-none font-black bg-transparent transition-all" />
            </div>
            <div className="group">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1 block group-focus-within:text-black transition-colors">Logistics</label>
              <input value={time} onChange={(e) => setTime(e.target.value.toUpperCase())} className="w-full p-2 mb-1 text-sm border-b border-neutral-200 focus:border-neutral-900 outline-none font-mono bg-transparent transition-all" />
              <input value={location} onChange={(e) => setLocation(e.target.value.toUpperCase())} className="w-full p-2 text-sm border-b border-neutral-200 focus:border-neutral-900 outline-none font-mono bg-transparent transition-all" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setIsFullscreen(true)} 
              className="w-full bg-neutral-900 text-white font-black py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
            >
              <Maximize2 size={16} /> 截图预览模式
            </button>
            <button 
              onClick={handleDownload} 
              disabled={isExporting} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-sm transition-all flex items-center justify-center gap-2 disabled:bg-neutral-300 shadow-lg active:scale-95"
            >
              {isExporting ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
              {isExporting ? '生成中...' : '下载高清 PNG'}
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-sm">
             <div className="flex items-center gap-2 mb-2">
               <div className="p-1 bg-blue-600 rounded-full text-white"><Shield size={10} /></div>
               <p className="text-[10px] font-bold text-blue-800 uppercase tracking-widest italic">Visual Scale Up</p>
             </div>
             <p className="text-[11px] text-blue-700/80 leading-relaxed italic">
               Regina，海报已扩容至 576px (max-xl)，增加了 25% 的视觉面积，更适合朋友圈传播。
             </p>
          </div>
        </div>
      )}

      {/* 海报预览区域 - 垂直水平居中 */}
      <div className={`flex-1 p-4 md:p-8 flex flex-col items-center justify-center overflow-y-auto bg-neutral-300/50 relative transition-all duration-500 ${isFullscreen ? 'h-screen z-50 pt-16 pb-16' : 'min-h-screen'}`}>
        
        {isFullscreen && (
            <button 
                onClick={() => setIsFullscreen(false)}
                className="absolute top-6 right-8 bg-neutral-900 text-white p-2 rounded-full shadow-2xl z-50 hover:scale-110 active:scale-90 transition-all flex items-center gap-2 px-6 font-black text-xs"
            >
                <Minimize2 size={16} /> 退出预览
            </button>
        )}

        {/* 海报本体 - 提升至 max-w-xl */}
        <div 
          id="poster-canvas" 
          className="relative w-full max-w-xl bg-white shadow-[0_80px_200px_-20px_rgba(0,0,0,0.35)] overflow-hidden aspect-[3/4.2] flex flex-col shrink-0 origin-center transition-all duration-700" 
          style={{ border: `20px solid ${currentTheme.color}` }}
        >
          {/* 主办方背书区域 */}
          <div className="absolute top-8 left-10 z-30">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100/60 backdrop-blur-md rounded-sm border border-neutral-200/50">
               <Shield size={16} color={currentTheme.accent} fill={currentTheme.accent} />
               <span className="text-[10px] font-mono font-black tracking-[0.1em] text-neutral-800 uppercase">
                 [ HOSTED BY: {hosts} ]
               </span>
            </div>
          </div>

          {/* 标识符 */}
          <div className="absolute top-0 right-0 p-8 flex flex-col items-end z-20">
             <div className="flex items-center gap-2 mb-1">
                <Coffee size={14} color={currentTheme.color} strokeWidth={3} />
                <span className="text-[16px] font-black tracking-[0.3em] uppercase italic" style={{ color: currentTheme.color }}>COFFEE CHAT</span>
             </div>
             <div className="h-[2px] w-32 bg-neutral-900 opacity-20"></div>
          </div>

          {/* 状态大标题 */}
          <div className="p-10 pt-20 pb-0 flex flex-col">
            <span className="text-[7.5rem] font-black tracking-tighter leading-[0.75] italic uppercase opacity-[0.9] select-none" style={{ color: currentTheme.color }}>
              {statusLabel}
            </span>
            <div className="mt-3 flex items-center gap-4">
              <span className="text-[13px] font-black px-2.5 py-1 text-white italic" style={{ backgroundColor: currentTheme.accent }}>
                 VOL. {currentTheme.id}
              </span>
              <span className="text-[12px] font-black tracking-[0.5em] opacity-30 uppercase italic">Cross-Network Protocol</span>
            </div>
          </div>

          {/* 议题标题 */}
          <div className="px-10 mt-12 relative">
             <div className="absolute -left-2 top-0 bottom-0 w-2.5" style={{ backgroundColor: currentTheme.accent }}></div>
             <h1 className="text-[4rem] font-black leading-[0.8] tracking-tighter break-words" style={{ color: currentTheme.color }}>
                {currentTheme.title}
             </h1>
             <p className="mt-6 text-sm font-black text-neutral-400 uppercase tracking-tighter leading-tight italic max-w-[80%]">
                {currentTheme.subtitle}
             </p>
          </div>

          {/* 视觉资产区域 */}
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden flex flex-wrap gap-12 p-6">
              {Array.from({length: 12}).map((_, i) => (
                <div key={i} className="transform rotate-[20deg] scale-[2.2]">{currentTheme.icon}</div>
              ))}
            </div>
            
            <div className="relative z-10 transform scale-110 lg:scale-[1.25]">
               <svg width="340" height="160" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(170, 70)">
                    <circle r="6" stroke={currentTheme.accent} strokeWidth="2" fill="white" />
                    <path d="M0 -15V-35" stroke={currentTheme.accent} strokeWidth="2" strokeDasharray="4 2" />
                    <path d="M0 15V35" stroke={currentTheme.accent} strokeWidth="2" strokeDasharray="4 2" />
                  </g>
                  <g transform="translate(45, 75) rotate(-6)">
                    <path d="M-20 65C10 65 40 60 55 50M55 50C65 45 68 30 68 30" stroke="black" strokeWidth="12" strokeLinecap="round" />
                    <path d="M55 10H105L98 95H62L55 10Z" fill="white" stroke="black" strokeWidth="7" />
                    <path d="M58 45H102L99 75H61L58 45Z" fill={currentTheme.color} />
                    <path d="M50 5H110V15H50V5Z" fill="black" />
                  </g>
                  <g transform="translate(295, 75) rotate(6) scale(-1, 1)">
                    <path d="M-20 65C10 65 40 60 55 50M55 50C65 45 68 30 68 30" stroke="black" strokeWidth="12" strokeLinecap="round" />
                    <path d="M55 10H105L98 95H62L55 10Z" fill="white" stroke="black" strokeWidth="7" />
                    <path d="M58 45H102L99 75H61L58 45Z" fill={currentTheme.color} />
                    <path d="M50 5H110V15H50V15Z" fill="black" />
                  </g>
               </svg>
            </div>

            {/* 标签云 */}
            <div className="mt-4 flex flex-wrap justify-center gap-5 px-10">
              {currentTheme.tags.map((tag, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                   <Hash size={10} color={currentTheme.accent} strokeWidth={4} />
                   <span className="text-[12px] font-black uppercase tracking-[0.15em] text-neutral-600 italic">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 底部信息栏 */}
          <div className="p-10 bg-neutral-900 text-white flex justify-between items-end border-t-[10px]" style={{ borderTopColor: currentTheme.accent }}>
            <div className="flex flex-col gap-1.5 text-left">
              <div className="text-[10px] font-black text-blue-500 tracking-[0.5em] uppercase mb-1 opacity-80 italic">Access Protocol</div>
              <p className="text-lg font-black tracking-tighter italic leading-none truncate max-w-[240px] uppercase">{time}</p>
              <p className="text-lg font-black tracking-tighter italic leading-none opacity-40 uppercase truncate max-w-[240px]">{location}</p>
            </div>
            <div className="flex flex-col items-end shrink-0 text-right">
               <div className="w-12 h-12 bg-white p-1.5 mb-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <div className="w-full h-full grid grid-cols-4 gap-0.5">
                    {Array.from({length: 16}).map((_, i) => (
                      <div key={i} className={`w-full h-full ${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'}`}></div>
                    ))}
                  </div>
               </div>
               <span className="text-[9px] font-black tracking-[0.4em] text-blue-400 uppercase opacity-80">USC SSI / NETWORK</span>
            </div>
          </div>
        </div>
        
        {!isFullscreen && (
          <p className="mt-8 text-[10px] font-black text-neutral-400 uppercase tracking-widest opacity-30 select-none text-center italic">
            Elite Connection Protocol / Production Environment v4.4
          </p>
        )}
      </div>
    </div>
  );
}