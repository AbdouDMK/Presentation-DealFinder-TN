/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import SlideDeck from './components/SlideDeck';
import { Slide } from './types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Search, 
  Share2, 
  Database, 
  Layout, 
  Server, 
  Code2, 
  Zap, 
  Target, 
  Lightbulb, 
  Smartphone,
  CheckCircle2,
  Globe,
  Clock,
  TrendingUp,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const savingsData = [
  { month: 'Jan', savings: 400 },
  { month: 'Feb', savings: 800 },
  { month: 'Mar', savings: 1200 },
  { month: 'Apr', savings: 2100 },
  { month: 'May', savings: 3400 },
  { month: 'Jun', savings: 5200 },
];

const LiveClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="font-mono text-primary">{time}</span>;
};

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const titleVariants = {
  initial: { opacity: 0, scale: 0.9, y: 30 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const sidebarVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const slides: Slide[] = [
  // 1. Title Slide
  {
    id: 'title',
    title: 'dealfinder-tn',
    subtitle: 'Connecting Tunisia with the best deals and discounts.',
    content: (
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex-1 slide-container grid md:grid-cols-[1fr_400px] gap-12 p-20 relative overflow-hidden h-full"
      >
        <div className="main-content z-10 flex flex-col justify-center">
          <motion.div variants={itemVariants} className="text-primary font-bold tracking-[0.4em] text-[10px] mb-6 uppercase flex items-center gap-3">
             <div className="w-12 h-px bg-primary/30" />
             ESTABLISHED 2024 / TUNISIA
          </motion.div>
          <motion.h1 variants={titleVariants} className="bold-heading mb-10 text-white">
            DEAL<br />FINDER<span className="text-primary italic animate-pulse">.TN</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-[#A1A1AA] text-2xl max-w-lg leading-relaxed mb-12 font-light">
            A high-performance aggregation engine redefining how <span className="text-white font-medium">12M+ Tunisians</span> access retail intelligence.
          </motion.p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { title: 'Predictive Pricing', desc: 'AI-driven forecasting of upcoming sales cycles.', icon: <TrendingUp size={16} /> },
              { title: 'Verified Only', desc: 'Triple-layer security ensuring zero scam activity.', icon: <ShieldCheck size={16} /> },
            ].map((f, i) => (
              <motion.div key={i} variants={itemVariants} className="feature-card !p-6 border border-white/5 hover:border-primary/20 bg-white/[0.02]">
                <div className="text-primary mb-3">{f.icon}</div>
                <h3 className="text-white text-xs uppercase tracking-widest mb-2 font-bold">{f.title}</h3>
                <p className="text-[#71717A] text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.aside variants={sidebarVariants} className="sidebar-container !bg-[#080808] z-10 border-white/5">
          <div className="space-y-12">
            <div>
              <div className="text-muted text-[10px] uppercase tracking-[0.3em] mb-8 font-bold flex items-center gap-2">
                <Cpu size={12} className="text-primary" />
                SYSTEM_LOAD_DISTRIBUTION
              </div>
              <div className="space-y-8">
                {[
                  { label: 'Real-time Scrutiny', sub: 'Node.js Cluster', val: '98%' },
                  { label: 'Merchant API Sync', sub: 'REST / GraphQL', val: '92%' },
                  { label: 'Query Latency', sub: 'Redis Cached', val: '45ms' }
                ].map((tech, i) => (
                  <motion.div key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1 + i*0.1, duration: 1 }}>
                    <div className="flex justify-between text-[11px] mb-3 font-medium">
                      <span className="text-[#A1A1AA]">{tech.label} <span className="opacity-40 text-[9px]">({tech.sub})</span></span>
                      <span className="text-primary font-mono">{tech.val}</span>
                    </div>
                    <div className="h-[2px] bg-white/5 rounded-full w-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: tech.val.includes('ms') ? '100%' : tech.val }}
                        transition={{ delay: 1.5 + i*0.1, duration: 1.5, ease: "circOut" }}
                        className="h-full bg-primary" 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="pt-10 border-t border-white/5 space-y-4">
               <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Local Time</span>
                  <div className="text-xs font-mono"><LiveClock /></div>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted uppercase tracking-widest font-bold">Relay Node</span>
                  <span className="text-[10px] font-mono text-accent">TUN_NORTH_01</span>
               </div>
            </div>
          </div>
          <motion.div variants={itemVariants} className="mt-auto pt-10">
              <div className="text-4xl font-black tracking-tighter text-white opacity-10">
                DFL<span className="text-primary">TR</span>
              </div>
          </motion.div>
        </motion.aside>
      </motion.div>
    )
  },
  // 2. Savings Impact Slide (NEW)
  {
    id: 'impact',
    title: 'Market Savings Impact',
    content: (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex-1 grid md:grid-cols-[1fr_340px] gap-12 p-20 h-full">
        <div className="flex flex-col">
          <motion.div variants={itemVariants} className="text-primary font-bold tracking-[0.4em] text-[10px] mb-6 uppercase">SYSTEM PERFORMANCE 02</motion.div>
          <motion.h1 variants={titleVariants} className="bold-heading mb-10">
            TOTAL<br />SAVED<span className="text-primary">.</span>
          </motion.h1>
          
          <div className="flex-1 min-h-[300px] mt-4">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={savingsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF5A1F" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF5A1F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#FF5A1F' }}
                  />
                  <XAxis dataKey="month" stroke="#4B5563" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke="#4B5563" fontSize={10} axisLine={false} tickLine={false} dx={-10} />
                  <Area type="monotone" dataKey="savings" stroke="#FF5A1F" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
          <p className="text-muted text-sm mt-8 max-w-md italic font-light">
            Cumulative community savings in TND (Thousands). Our engine tracks real consumer impact as users redeem verified codes.
          </p>
        </div>
        <motion.div variants={sidebarVariants} className="sidebar-container">
           <div className="space-y-12">
              <div className="flex flex-col gap-2">
                 <motion.span variants={itemVariants} className="text-[40px] font-black leading-none text-primary">€1.2M</motion.span>
                 <motion.span variants={itemVariants} className="text-[10px] uppercase tracking-widest font-bold text-muted">Market Cap Saved</motion.span>
              </div>
              <div className="space-y-6">
                 {[
                   { label: 'Active Users', val: '45,820', color: 'bg-primary' },
                   { label: 'Deal Velocity', val: '+24%', color: 'bg-green-500' },
                   { label: 'Trust Factor', val: '99.8%', color: 'bg-blue-500' }
                 ].map((stat, i) => (
                   <motion.div key={i} variants={itemVariants}>
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-[10px] font-bold uppercase text-muted tracking-tight">{stat.label}</span>
                        <span className="text-sm font-black italic text-white">{stat.val}</span>
                      </div>
                      <div className="h-[4px] bg-white/5 rounded-full w-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 2 }} className={`h-full ${stat.color}`} />
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
           <div className="text-[10px] font-mono text-muted mt-auto leading-tight">
              STATS_SYNC: AUG_2024<br />
              SOURCE: COMMUNITY_LEDGER
           </div>
        </motion.div>
      </motion.div>
    )
  },
  // 3. Problem Slide
  {
    id: 'problem',
    title: 'The Challenge',
    content: (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex-1 p-20 flex flex-col justify-center h-full">
        <motion.div variants={itemVariants} className="text-primary font-bold tracking-[0.4em] text-[10px] mb-6 uppercase">MARKET FRICTION 03</motion.div>
        <motion.h1 variants={titleVariants} className="bold-heading mb-16">THE<br />FRICTION<span className="text-primary">.</span></motion.h1>
        <div className="grid md:grid-cols-3 gap-12">
           {[
             { title: 'Information Decay', icon: <Clock />, desc: 'Deals expire in hours, creating a cycle of frustration for late-comers.' },
             { title: 'Discovery Fatigue', icon: <Search />, desc: 'Deals are buried in social noise and chaotic PDF brochures.' },
             { title: 'Social Proof Leak', icon: <Layout />, desc: 'Lack of verified community feedback leads to "phantom" deals.' }
           ].map((p, i) => (
             <motion.div key={i} variants={itemVariants} className="feature-card !bg-transparent !p-0 border-none group">
                <div className="mb-8 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">{p.icon}</div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter text-white">{p.title}</h3>
                <p className="text-[#71717A] text-sm leading-relaxed">{p.desc}</p>
             </motion.div>
           ))}
        </div>
      </motion.div>
    )
  },
  // 4. Stack Slide
  {
    id: 'tech-stack',
    title: 'Technology Stack',
    content: (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex-1 grid md:grid-cols-[380px_1fr] gap-12 p-20 h-full">
        <motion.div variants={sidebarVariants} className="sidebar-container relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] rounded-full" />
           <div className="z-10">
              <motion.div variants={itemVariants} className="text-muted text-[10px] uppercase tracking-[0.3em] mb-8 font-bold">ENGINEERING_MANIFESTO</motion.div>
              <motion.h3 variants={titleVariants} className="text-[40px] font-black mb-8 leading-[1.1] uppercase tracking-tighter text-white">Stability<br />meets<br />scale.</motion.h3>
              <motion.p variants={itemVariants} className="text-sm border-l-2 border-primary/40 pl-6 py-2 text-[#A1A1AA] font-light leading-relaxed">
                Leveraging the polyglot power of high-speed JS and legacy-hardened PHP for a hybrid system that never fails.
              </motion.p>
           </div>
           <div className="mt-auto font-mono text-[9px] leading-tight text-muted uppercase tracking-widest z-10">
              LOG_778: VERIFIED<br />
              STACK: MULTI_THREADED
           </div>
        </motion.div>
        <div className="flex flex-col justify-center">
          <motion.div variants={itemVariants} className="text-primary font-bold tracking-[0.4em] text-[10px] mb-6 uppercase">STACK ARCHITECTURE 04</motion.div>
          <motion.h1 variants={titleVariants} className="bold-heading mb-10">THE<br />ENGINE<span className="text-primary">.</span></motion.h1>
          <div className="grid grid-cols-2 gap-8">
             {[
               { label: '/ FRONTENDCORE', desc: 'Precision-rendered layouts prioritizing content-first indexing and speed.' },
               { label: '/ BACKEND_DEEP', desc: 'Node.js Express + PHP micro-modules for high-concurrency deal processing.' },
               { label: '/ APIGATEWAY', desc: 'Secure entry point handling auth, rate-limiting, and request routing.' },
               { label: '/ DATALAYER', desc: 'Optimized MySQL indices cross-referenced with local Redis caching.' },
               { label: '/ SYNCMODULE', desc: 'PHP cron-engine ensuring 15-min interval synchronicity with major retailers.' },
               { label: '/ SECURITY_TX', desc: 'End-to-end encryption and triple-layer verification for all submissions.' }
             ].map((item, i) => (
               <motion.div key={i} variants={itemVariants} className="p-8 bg-white/[0.01] border border-white/5 rounded-[32px] hover:border-primary/30 transition-all duration-500 group">
                 <h4 className="text-accent font-mono text-[10px] mb-3 group-hover:text-primary transition-colors">{item.label}</h4>
                 <p className="text-[#A1A1AA] text-xs leading-relaxed font-light">{item.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </motion.div>
    )
  },
  // 5. Backend Logic
  {
    id: 'backend',
    title: 'The Backend Ecosystem',
    content: (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex-1 flex flex-col bg-[#050505] h-full">
        <div className="p-12 border-b border-white/5 flex justify-between items-center bg-[#080808]">
          <div className="flex flex-col">
            <motion.span variants={itemVariants} className="text-primary font-bold tracking-[0.4em] text-[10px] mb-2 uppercase">ENGINEERING DEEP-DIVE 05</motion.span>
            <motion.h1 variants={titleVariants} className="text-5xl font-black uppercase tracking-tighter text-white">BACKEND<br />LOGIC<span className="text-primary">.</span></motion.h1>
          </div>
          <motion.span variants={itemVariants} className="px-5 py-2 bg-green-500/10 text-green-500 text-xs rounded-full font-mono border border-green-500/20">SYSTEM_HEALTH: 100%</motion.span>
        </div>
        <div className="flex-1 grid md:grid-cols-3 divide-x divide-white/5">
          {[
            { 
              title: 'Node.js Cluster', 
              icon: <Zap size={24} className="text-yellow-500" />, 
              desc: 'High-speed I/O handling the deal ingestion pipeline.',
              items: ['Stateless API design', 'Event-driven architecture', 'Socket.io real-time push'], 
              bullet: 'bg-yellow-500' 
            },
            { 
              title: 'PHP Core', 
              icon: <Code2 size={24} className="text-blue-500" />, 
              desc: 'Legacy-robust modules for heavy administrative processing.',
              items: ['Merchant batch processing', 'Complex PDF scrapers', 'Secure admin dashboards'], 
              bullet: 'bg-blue-500' 
            },
            { 
              title: 'MySQL / Redis', 
              icon: <Database size={24} className="text-purple-500" />, 
              desc: 'Relational integrity combined with blazing fast caching.',
              items: ['Atomic deal transactions', 'Sub-50ms cache hits', 'Audited user logs'], 
              bullet: 'bg-purple-500' 
            }
          ].map((col, i) => (
            <motion.div key={i} variants={itemVariants} className="p-16 hover:bg-white/[0.02] transition-colors group">
               <div className="mb-10 p-4 w-fit bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                 {col.icon}
               </div>
               <h3 className="text-3xl font-bold mb-6 text-white uppercase tracking-tight">
                 {col.title}
               </h3>
               <p className="text-[#71717A] text-sm mb-10 leading-relaxed italic pr-8">
                 "{col.desc}"
               </p>
               <ul className="space-y-5">
                 {col.items.map((line, j) => (
                   <li key={j} className="flex items-center gap-4 text-sm font-light text-[#A1A1AA]">
                     <div className={`w-1.5 h-1.5 ${col.bullet} rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]`} /> 
                     {line}
                   </li>
                 ))}
               </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  },
  // 6. Impact & Features
  {
    id: 'features',
    title: 'Core Functionality',
    content: (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex-1 p-20 flex flex-col justify-center h-full">
        <motion.div variants={itemVariants} className="text-primary font-bold tracking-[0.4em] text-[10px] mb-6 uppercase text-center">CAPABILITIES 06</motion.div>
        <motion.h2 variants={titleVariants} className="bold-heading mb-20 text-center">CORE<br />XP<span className="text-primary">.</span></motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Smart Discovery', icon: <Search />, color: 'bg-blue-600', val: '400ms search' },
            { label: 'Cloud Submission', icon: <Share2 />, color: 'bg-orange-600', val: '1-tap share' },
            { label: 'Deep Categories', icon: <Layout />, color: 'bg-green-600', val: '24+ sectors' },
            { label: 'Auth Verify', icon: <CheckCircle2 />, color: 'bg-purple-600', val: 'Admin backed' },
          ].map((feat, i) => (
            <motion.div key={i} variants={itemVariants} className="group relative aspect-square bg-[#0c0c0c] border border-white/5 rounded-[40px] overflow-hidden p-10 flex flex-col justify-between hover:bg-[#111] transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,90,31,0.1)]">
              <div className={`w-14 h-14 ${feat.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:-translate-y-2 transition-transform duration-500`}>
                {feat.icon}
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-1 text-white">{feat.label}</h4>
                <p className="text-[10px] uppercase tracking-widest text-[#71717A] font-bold">{feat.val}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  },
  // 7. Conclusion
  {
    id: 'conclusion',
    title: 'Thank You',
    content: (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex-1 bg-white text-black p-24 flex flex-col justify-center items-center text-center h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        <motion.div variants={itemVariants} className="text-primary font-bold tracking-[0.5em] text-[10px] mb-12 uppercase">FINALE 07</motion.div>
        <motion.h1 
          variants={titleVariants}
          className="text-[15vw] leading-[0.75] font-black uppercase tracking-[-0.08em] mb-16 text-black"
        >
          MERCI<span className="text-primary italic animate-ping">.</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-3xl font-light text-black/50 max-w-2xl mb-20 leading-snug">
          The future of <span className="font-bold text-black italic">dealfinder-tn</span> is built on community trust and engineering excellence.
        </motion.p>
        <motion.div variants={itemVariants} className="flex gap-20 pt-16 border-t border-black/5">
           <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-3">Project Status</span>
              <span className="text-2xl font-black italic">V1.0 LIVE</span>
           </div>
           <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A1A1AA] block mb-3">Official Node</span>
              <span className="text-2xl font-black tracking-tighter hover:text-primary transition-colors cursor-pointer">DEALFINDER.TN</span>
           </div>
        </motion.div>
      </motion.div>
    )
  }
];

export default function App() {
  return (
    <main className="w-full h-screen overflow-hidden">
      <SlideDeck slides={slides} />
    </main>
  );
}
