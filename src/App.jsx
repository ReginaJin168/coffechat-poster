import React, { useState } from 'react';
import { Coffee, Users, Brain, Globe, TrendingUp, Briefcase, Zap, Heart, MessageCircle, Link, Camera, Hash, Shield, Download, Loader2, Maximize2, Minimize2, Github, ExternalLink } from 'lucide-react';

// 主题数据模型
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

const App = () => {
  // 状态管理
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [time, setTime] = useState("THURSDAY / 18:30");
  const [location, setLocation] = useState("USC VILLAGE / LOS ANGELES");
  const [statusLabel, setStatusLabel] = useState("SIGNAL");
  const [hosts, setHosts] = useState("USC & UCLA");
  const [isExporting, setIsExporting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 导出逻辑：使用 html2canvas 抓取指定 DOM 元素
  const handleDownload = () => {
    setIsExporting(true);
    const element = document.getElementById('poster-canvas');
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = () => {
      window.html2canvas(element, {
        scale: 4, // 高清导出倍率
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
            const clonedPoster = clonedDoc.getElementById('poster-canvas');
            clonedPoster.style.transform = 'none'; // 移除克隆副本中的缩放位移
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
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-100 font-sans text-neutral-900 overflow-hidden">
      
      {/* 左侧控制台 - 预览模式下隐藏 */}
      {!isFullscreen && (
        <div className="w-full md:w-80 bg-white p-6 shadow-xl z-20 overflow-y-auto max-h-screen border-r border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <h2 className="text-sm font-black tracking-widest uppercase text-neutral-400">Stable Build v4.0</h2>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-black transition-colors">
              <Github size={18} />
            </a>
          </div>
          
          {/* 议题选择器 */}
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

          {/* 信息输入框 */}
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

          {/* 操作按钮组 */}
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

          {/* Regina 专属说明 */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-sm">
             <div className="flex items-center gap-2 mb-2">
               <div className="p-1 bg-blue-600 rounded-full text-white"><Shield size={10} /></div>
               <p className="text-[10px] font-bold text-blue-800 uppercase tracking-widest">Technical PM Hint</p>
             </div>
             <p className="text-[11px] text-blue-700/80 leading-relaxed italic">
               Regina，此版本已优化了 v4.0 的渲染布局。将此 URL 分享给组织成员，即可实现协作。
             </p>
          </div>
        </div>
      )}

      {/* 海报预览区域 - 居中布局 */}
      <div className={`flex-1 p-4 md:p-8 flex flex-col items-center justify-center overflow-y-auto bg-neutral-200 relative transition-all duration-500 ${isFullscreen ? 'h-screen z-50' : 'min-h-screen'}`}>
        
        {isFullscreen && (
            <button 
                onClick={() => setIsFullscreen(false)}
                className="absolute top-6 right-8 bg-neutral-900 text-white p-2 rounded-full shadow-2xl z-50 hover:scale-110 active:scale-90 transition-all flex items-center gap-2 px-6 font-black text-xs"
            >
                <Minimize2 size={16} /> 退出预览
            </button>
        )}

        {/* 海报本体 */}
        <div 
          id="poster-canvas" 
          className="relative w-full max-w-md bg-white shadow-[0_80px_160px_-20px_rgba(0,0,0,0.3)] overflow-hidden aspect-[3/4.2] flex flex-col shrink-0 origin-center" 
          style={{ border: `16px solid ${currentTheme.color}` }}
        >
          {/* 主办方背书区域 - 已强化标识 */}
          <div className="absolute top-6 left-8 z-30">
            <div className="flex items-center gap-2 px-2 py-1 bg-neutral-100/60 backdrop-blur-md rounded-sm border border-neutral-200/50">
               <Shield size={14} color={currentTheme.accent} fill={currentTheme.accent} />
               <span className="text-[9px] font-mono font-black tracking-[0.1em] text-neutral-800 uppercase">
                 [ HOSTED BY: {hosts} ]
               </span>
            </div>
          </div>

          {/* 标识符 */}
          <div className="absolute top-0 right-0 p-5 flex flex-col items-end z-20">
             <div className="flex items-center gap-2 mb-1">
                <Coffee size={12} color={currentTheme.color} strokeWidth={3} />
                <span className="text-[12px] font-black tracking-[0.3em] uppercase italic" style={{ color: currentTheme.color }}>COFFEE CHAT</span>
             </div>
             <div className="h-[1.5px] w-24 bg-neutral-900 opacity-20"></div>
          </div>

          {/* 状态大标题 - 压缩边距确保不重叠 */}
          <div className="p-8 pt-16 pb-0 flex flex-col">
            <span className="text-[5.5rem] font-black tracking-tighter leading-[0.75] italic uppercase opacity-[0.9] select-none" style={{ color: currentTheme.color }}>
              {statusLabel}
            </span>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-[11px] font-black px-2 py-0.5 text-white italic" style={{ backgroundColor: currentTheme.accent }}>
                 VOL. {currentTheme.id}
              </span>
              <span className="text-[10px] font-black tracking-[0.4em] opacity-30 uppercase italic">Cross-Network Protocol</span>
            </div>
          </div>

          {/* 议题标题 */}
          <div className="px-8 mt-10 relative">
             <div className="absolute -left-2 top-0 bottom-0 w-2" style={{ backgroundColor: currentTheme.accent }}></div>
             <h1 className="text-[3.1rem] font-black leading-[0.8] tracking-tighter break-words" style={{ color: currentTheme.color }}>
                {currentTheme.title}
             </h1>
             <p className="mt-5 text-xs font-black text-neutral-400 uppercase tracking-tighter leading-tight italic max-w-[85%]">
                {currentTheme.subtitle}
             </p>
          </div>

          {/* 视觉资产区域 */}
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-0">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden flex flex-wrap gap-8 p-4">
              {Array.from({length: 12}).map((_, i) => (
                <div key={i} className="transform rotate-[20deg] scale-150">{currentTheme.icon}</div>
              ))}
            </div>
            
            <div className="relative z-10 transform scale-75 lg:scale-90">
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
            <div className="mt-1 flex flex-wrap justify-center gap-3 px-8">
              {currentTheme.tags.map((tag, idx) => (
                <div key={idx} className="flex items-center gap-1">
                   <Hash size={8} color={currentTheme.accent} strokeWidth={4} />
                   <span className="text-[10px] font-black uppercase tracking-[0.1em] text-neutral-600">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 底部信息栏 - Session Info 安全区域 */}
          <div className="p-8 bg-neutral-900 text-white flex justify-between items-end border-t-4" style={{ borderTopColor: currentTheme.accent }}>
            <div className="flex flex-col gap-1 text-left">
              <div className="text-[8px] font-black text-blue-500 tracking-[0.4em] uppercase mb-1 opacity-80">Logistics Detail</div>
              <p className="text-sm font-black tracking-tighter italic leading-none truncate max-w-[180px]">{time}</p>
              <p className="text-sm font-black tracking-tighter italic leading-none opacity-40 uppercase truncate max-w-[180px]">{location}</p>
            </div>
            <div className="flex flex-col items-end shrink-0">
               <div className="w-10 h-10 bg-white p-1 mb-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <div className="w-full h-full grid grid-cols-4 gap-0.5">
                    {Array.from({length: 16}).map((_, i) => (
                      <div key={i} className={`w-full h-full ${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'}`}></div>
                    ))}
                  </div>
               </div>
               <span className="text-[7px] font-black tracking-[0.3em] text-blue-400 uppercase opacity-80">USC SSI / NETWORK</span>
            </div>
          </div>
        </div>
        
        {/* 页脚装饰（仅主界面可见） */}
        {!isFullscreen && (
          <p className="mt-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest opacity-30 select-none">
            Secure Deployment / End-to-End Visual Logic
          </p>
        )}
      </div>
    </div>
  );
};

export default App;