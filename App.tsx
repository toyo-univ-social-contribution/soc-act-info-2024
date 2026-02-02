import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { DEPARTMENTS, getFacultiesByDept, getFacultyActivity, RAW_DATA } from './data';
import { Activity } from './types';

// --- UI Components & Icons ---
const ChevronRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
);
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2h2a2 2 0 002-2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
);

// --- Layout Components ---
const Navbar = () => (
  <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-14 sm:h-16">
        <Link to="/" className="flex items-center gap-2 text-blue-900 font-black text-lg">
          <div className="w-7 h-7 bg-blue-900 rounded-lg flex items-center justify-center text-white text-[8px]">TOYO</div>
          <span className="hidden sm:inline tracking-tighter">社会貢献活動ディレクトリ 2024</span>
          <span className="sm:hidden">社会貢献 2024</span>
        </Link>
        <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-black text-gray-400">
          <Link to="/" className="hover:text-blue-900 transition-colors">ホーム</Link>
          <Link to="/list" className="hover:text-blue-900 transition-colors">一覧</Link>
        </div>
      </div>
    </div>
  </header>
);

const Breadcrumbs = ({ paths }: { paths: { label: string; to?: string }[] }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <nav className="flex items-center text-xs text-gray-400 bg-white px-4 py-2.5 rounded-full border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
        <Link to="/" className="hover:text-blue-900 shrink-0"><HomeIcon /></Link>
        {paths.map((p, i) => (
          <React.Fragment key={i}>
            <span className="mx-2 text-gray-200">/</span>
            {p.to ? (
              <Link to={p.to} className="hover:text-blue-900 transition-colors whitespace-nowrap font-bold">{p.label}</Link>
            ) : (
              <span className="font-black text-gray-800 whitespace-nowrap">{p.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
      <button 
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm self-start md:self-auto uppercase tracking-widest"
      >
        <CopyIcon />
        {copied ? 'Copied!' : 'Copy Page URL'}
      </button>
    </div>
  );
};

const SDGBadge = ({ sdgs }: { sdgs: string }) => {
  if (!sdgs || sdgs === "―") return null;
  const codes = sdgs.split(/[ ,;]+/).filter(Boolean);
  return (
    <div className="flex flex-wrap gap-1.5 mt-4">
      {codes.map(c => (
        <span key={c} className="px-2 py-0.5 bg-blue-900 text-white text-[9px] font-black rounded border border-blue-900">
          SDG {c}
        </span>
      ))}
    </div>
  );
};

// --- Page Components ---
const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1.5 h-full bg-gray-100 group-hover:bg-blue-600 transition-colors"></div>
    
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-black rounded uppercase tracking-tighter">
            {activity.type}
          </span>
          <span className="text-[10px] text-gray-300 font-bold">#{activity.id}</span>
        </div>
        <h3 className="text-xl font-black text-gray-900 leading-tight">{activity.title}</h3>
        {activity.eventName !== "―" && <p className="text-sm text-blue-600 font-bold mt-1">{activity.eventName}</p>}
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">開催・場所</label>
        <p className="text-xs text-gray-700 font-bold">{activity.date} / {activity.location}</p>
      </div>
      <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
        <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">主催・対象</label>
        <p className="text-xs text-gray-700 font-bold">{activity.organizer} / {activity.target}</p>
      </div>
    </div>

    <div className="mb-8">
      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{activity.summary}</p>
    </div>

    <div className="flex flex-wrap items-center justify-between border-t border-gray-50 pt-5 gap-4">
      <SDGBadge sdgs={activity.sdgs} />
      {activity.url && (
        <a 
          href={activity.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-black bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all flex items-center gap-2"
        >
          詳細サイトへ <ChevronRight />
        </a>
      )}
    </div>
  </div>
);

const Home = () => {
  const [query, setQuery] = useState('');
  
  const searchResults = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    
    const faculties = Array.from(new Set(RAW_DATA.map(d => d.facultyName)))
      .filter(name => name.toLowerCase().includes(q))
      .map(name => ({ 
        type: 'faculty', 
        name, 
        dept: RAW_DATA.find(d => d.facultyName === name)?.department,
        id: `f-${name}`
      }));

    const activities = RAW_DATA.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.summary.toLowerCase().includes(q)
    ).slice(0, 5).map(a => ({
      type: 'activity',
      name: a.title,
      id: `a-${a.id}`,
      faculty: a.facultyName
    }));

    return [...faculties, ...activities];
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-20 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-4">
          Toyo University Archive
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tighter leading-none">
          2024年度 社会貢献活動<br /><span className="text-blue-900">DIRECTORY</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto font-bold leading-relaxed">
          東洋大学の教員・事務局による<br className="hidden sm:block" />
          社会貢献活動情報を公開しています。
        </p>

        {/* Improved Search Bar */}
        <div className="max-w-xl mx-auto mt-12 relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
            <SearchIcon />
          </div>
          <input 
            type="text"
            placeholder="教員名、キーワードで検索..."
            className="block w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-[2rem] shadow-xl focus:ring-0 focus:border-blue-600 outline-none transition-all text-gray-800 font-bold placeholder:text-gray-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          
          {query.trim().length >= 2 && (
            <div className="absolute w-full mt-4 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-20 text-left animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-3 divide-y divide-gray-50">
                {searchResults.length > 0 ? (
                  searchResults.map((res: any) => (
                    <Link 
                      key={res.id}
                      to={res.type === 'faculty' ? `/faculty/${encodeURIComponent(res.name)}` : `/faculty/${encodeURIComponent(res.faculty)}`}
                      className="flex items-center justify-between p-4 hover:bg-blue-50/50 rounded-2xl transition-all group/item"
                      onClick={() => setQuery('')}
                    >
                      <div>
                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-0.5">
                          {res.type === 'faculty' ? '教員' : '活動内容'}
                        </span>
                        <span className="text-sm font-black text-gray-800 group-hover/item:text-blue-900">
                          {res.name}
                        </span>
                        {res.type === 'faculty' && <span className="text-[10px] text-gray-400 block font-bold">{res.dept}</span>}
                      </div>
                      <ChevronRight />
                    </Link>
                  ))
                ) : (
                  <div className="p-10 text-center text-gray-400 font-bold text-sm italic">
                    No results found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/list" className="group p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
          <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
            <UserIcon />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
            教員別リスト
            <ChevronRight />
          </h2>
          <p className="text-gray-400 font-bold text-sm leading-relaxed mb-10">
            学部・学科ごとに所属教員を一覧表示。各教員の専門性を活かした具体的な活動実績を閲覧できます。
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-blue-900">{RAW_DATA.length}</span>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Reports</span>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-1000"></div>
        </Link>

        <div className="p-10 bg-gray-100/50 rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col justify-center opacity-60">
          <div className="w-14 h-14 bg-gray-200 text-gray-400 rounded-2xl flex items-center justify-center mb-8">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h2 className="text-3xl font-black text-gray-400 mb-4 tracking-tighter">組織・プロジェクト別</h2>
          <p className="text-gray-400 font-bold text-sm">
            研究所や学部単位でのプロジェクトについては現在データメンテナンス中です。
          </p>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="bg-blue-900 rounded-[4rem] p-12 sm:p-20 text-white shadow-2xl relative overflow-hidden text-center sm:text-left">
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black italic tracking-tighter">"Philosophy as the Foundation of all Studies"</h2>
          <p className="text-blue-100/80 font-bold max-w-2xl leading-relaxed">
            「諸学の基礎は哲学にあり」　東洋大学は、教育・研究の成果を社会に還元し、より良い未来の創造に貢献し続けます。<br className="hidden sm:block" />
          </p>
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
      </section>
    </div>
  );
};

const DepartmentList = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <Breadcrumbs paths={[{ label: '一覧' }]} />
    <h2 className="text-4xl font-black text-gray-900 mb-12 tracking-tighter">学部・学科リスト</h2>
    <div className="grid gap-3">
      {DEPARTMENTS.map(dept => (
        <Link 
          key={dept} 
          to={`/dept/${encodeURIComponent(dept)}`}
          className="flex items-center justify-between p-6 bg-white rounded-3xl border-2 border-gray-50 shadow-sm hover:border-blue-600 hover:bg-blue-50/30 transition-all group"
        >
          <span className="text-lg font-black text-gray-700 group-hover:text-blue-900 transition-colors">
            {dept}
          </span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ChevronRight />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const FacultyListPage = () => {
  const { deptName } = useParams<{ deptName: string }>();
  const decodedDept = decodeURIComponent(deptName || '');
  const faculties = getFacultiesByDept(decodedDept);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs paths={[{ label: '一覧', to: '/list' }, { label: decodedDept }]} />
      <div className="mb-12">
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">{decodedDept}</h2>
        <p className="text-[10px] font-black text-blue-600 mt-2 uppercase tracking-[0.4em]">Faculty Members</p>
      </div>
      
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
        {faculties.map(faculty => (
          <Link 
            key={faculty.name} 
            to={`/faculty/${encodeURIComponent(faculty.name)}`}
            className="flex items-center justify-between p-7 sm:p-10 hover:bg-gray-50/80 transition-all group"
          >
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-900 font-black text-2xl rounded-2xl flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all duration-500 shadow-inner">
                {faculty.name[0]}
              </div>
              <div>
                <span className="text-2xl font-black text-gray-800 group-hover:text-blue-900 block transition-colors tracking-tight">{faculty.name}</span>
                <span className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest block">
                  {faculty.activities.length} Activities Found
                </span>
              </div>
            </div>
            <div className="text-gray-200 group-hover:text-blue-600 transition-colors">
              <ChevronRight />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const FacultyDetail = () => {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name || '');
  const profile = getFacultyActivity(decodedName);

  if (!profile) return <div className="p-24 text-center font-black text-gray-300 italic uppercase tracking-widest">Faculty Not Found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs paths={[
        { label: '一覧', to: '/list' },
        { label: profile.department, to: `/dept/${encodeURIComponent(profile.department)}` },
        { label: profile.name }
      ]} />

      <header className="mb-12 bg-gray-900 text-white p-12 sm:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-10">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-blue-600 text-[10px] font-black rounded uppercase tracking-widest">{profile.department}</span>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none">{profile.name}</h1>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center min-w-[140px] shadow-2xl">
            <div className="text-5xl font-black mb-1 italic leading-none">{profile.activities.length}</div>
            <div className="text-[9px] font-black uppercase tracking-[0.3em] opacity-50">Reports</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-40 -mt-40"></div>
      </header>

      <div className="space-y-10">
        {profile.activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans selection:bg-blue-900 selection:text-white antialiased">
        <Navbar />
        <main className="flex-1 bg-gray-50/30">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<DepartmentList />} />
            <Route path="/dept/:deptName" element={<FacultyListPage />} />
            <Route path="/faculty/:name" element={<FacultyDetail />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-100 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
            <div className="w-12 h-1 bg-gray-100 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]">© 2025 Toyo University</p>
            <div className="max-w-2xl mx-auto text-gray-300 text-[11px] font-bold leading-relaxed px-6">
              本サイトは、2024年度の東洋大学教員による社会貢献活動の実績をとりまとめたディレクトリです。<br />
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
