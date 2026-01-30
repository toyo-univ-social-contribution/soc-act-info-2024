
import React from 'react';
import { HashRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { DEPARTMENTS, getFacultiesByDept, getFacultyActivity, RAW_DATA } from './data';
import { Activity } from './types';

// Icons
const ChevronRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
);
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const OfficeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);

const Navbar = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2 text-blue-900 font-bold text-xl">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white text-[10px]">TOYO</div>
          <span className="hidden sm:inline">2024年度 社会貢献活動ディレクトリ</span>
          <span className="sm:hidden text-base">社会貢献 2024</span>
        </Link>
        <div className="flex gap-4 sm:gap-6 text-sm font-bold text-gray-500">
          <Link to="/" className="hover:text-blue-900 transition-colors">ホーム</Link>
          <Link to="/faculty-activities" className="hover:text-blue-900 transition-colors">活動一覧</Link>
        </div>
      </div>
    </div>
  </header>
);

const Breadcrumbs = ({ paths }: { paths: { label: string; to?: string }[] }) => (
  <nav className="flex items-center text-xs sm:text-sm text-gray-400 mb-6 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
    <Link to="/" className="hover:text-blue-900"><HomeIcon /></Link>
    {paths.map((p, i) => (
      <React.Fragment key={i}>
        <span className="mx-2 text-gray-300">/</span>
        {p.to ? (
          <Link to={p.to} className="hover:text-blue-900 transition-colors">{p.label}</Link>
        ) : (
          <span className="font-bold text-gray-800 truncate">{p.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

const SDGBadge = ({ sdgs }: { sdgs: string }) => {
  if (!sdgs || sdgs === "―") return null;
  const codes = sdgs.split(/[ ,;]+/).filter(Boolean);
  return (
    <div className="flex flex-wrap gap-1 mt-3">
      {codes.map(c => (
        <span key={c} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full border border-blue-100">
          SDG {c}
        </span>
      ))}
    </div>
  );
};

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all border-b-4 border-b-gray-100 hover:border-b-blue-500">
    <div className="flex justify-between items-start gap-4 mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-black text-gray-900 leading-tight mb-1">{activity.title}</h3>
        {activity.eventName !== "―" && <p className="text-sm text-gray-400 font-bold">{activity.eventName}</p>}
      </div>
      <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black rounded-lg shrink-0 uppercase tracking-tighter">
        {activity.type}
      </span>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-xl">
      <div className="space-y-0.5">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">開催時期 / 場所</label>
        <p className="text-xs text-gray-700 font-bold">{activity.date} @ {activity.location}</p>
      </div>
      <div className="space-y-0.5">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">主催者</label>
        <p className="text-xs text-gray-700 font-bold">{activity.organizer}</p>
      </div>
    </div>

    <div className="mb-6">
      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{activity.summary}</p>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-50 pt-4 gap-4">
      <SDGBadge sdgs={activity.sdgs} />
      {activity.url && (
        <a 
          href={activity.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors self-end"
        >
          詳しく見る <ChevronRight />
        </a>
      )}
    </div>
  </div>
);

const Home = () => (
  <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
    <section className="text-center space-y-6">
      <h1 className="text-4xl sm:text-6xl font-black text-blue-900 tracking-tighter">社会貢献活動 2024</h1>
      <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
        東洋大学の教育・研究成果を社会へ還元。<br className="hidden sm:block" />
        地域連携や教育支援など、多彩な活動の実績。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
        <Link to="/faculty-activities" className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 text-left relative overflow-hidden">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
            <UserIcon />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
            教員から探す
            <ChevronRight />
          </h2>
          <p className="text-gray-400 font-medium leading-relaxed">
            個別の専門性を活かした講演や研究指導。各学部の教員リストから活動実績を確認できます。
          </p>
          <div className="mt-10 flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-900">{RAW_DATA.length}</span>
            <span className="text-xs font-bold text-gray-400 uppercase">件の活動を掲載中</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
        </Link>

        <div className="bg-gray-100 p-10 rounded-[2.5rem] border border-dashed border-gray-300 opacity-60 text-left flex flex-col justify-center">
          <div className="w-16 h-16 bg-gray-200 text-gray-400 rounded-2xl flex items-center justify-center mb-8">
            <OfficeIcon />
          </div>
          <h2 className="text-2xl font-black text-gray-400 mb-4">組織から探す</h2>
          <p className="text-gray-400 font-medium">
            学部・学科・研究所単位の活動。現在データを整理中です。近日公開予定。
          </p>
        </div>
      </div>
    </section>

    <section className="bg-blue-900 rounded-[3rem] p-10 sm:p-20 text-white relative overflow-hidden shadow-2xl">
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-3xl font-black mb-8">諸学の基礎は哲学にあり</h2>
        <p className="text-blue-100 text-lg leading-relaxed opacity-90 font-medium">
          蓄積された知見を広く社会に還元し、持続可能な社会の実現に寄与することを目指しています。
        </p>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full -mr-32 -mt-32 blur-[100px] opacity-40"></div>
    </section>
  </div>
);

const DepartmentList = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <Breadcrumbs paths={[{ label: '活動一覧' }]} />
    <h2 className="text-3xl font-black text-gray-900 mb-10 border-l-8 border-blue-900 pl-6">学部・学科から探す</h2>
    <div className="grid gap-4">
      {DEPARTMENTS.map(dept => (
        <Link 
          key={dept} 
          to={`/dept/${encodeURIComponent(dept)}`}
          className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all group"
        >
          <span className="text-lg font-black text-gray-700 group-hover:text-blue-900">
            {dept}
          </span>
          <div className="text-gray-300 group-hover:text-blue-600 transition-colors">
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
      <Breadcrumbs paths={[{ label: '活動一覧', to: '/faculty-activities' }, { label: decodedDept }]} />
      <div className="mb-10">
        <h2 className="text-3xl font-black text-gray-900">{decodedDept}</h2>
        <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Faculty List</p>
      </div>
      
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
        {faculties.map(faculty => (
          <Link 
            key={faculty.name} 
            to={`/faculty/${encodeURIComponent(faculty.name)}`}
            className="flex items-center justify-between p-6 sm:p-8 hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                {faculty.name[0]}
              </div>
              <div>
                <span className="text-xl font-black text-gray-800 group-hover:text-blue-900 block transition-colors">{faculty.name}</span>
                <span className="text-xs font-bold text-gray-400 mt-1 block uppercase tracking-tighter">
                  {faculty.activities.length} Activities Found
                </span>
              </div>
            </div>
            <ChevronRight />
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

  if (!profile) return <div className="p-20 text-center font-bold text-gray-400">教員データが見つかりませんでした。</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs paths={[
        { label: '活動一覧', to: '/faculty-activities' },
        { label: profile.department, to: `/dept/${encodeURIComponent(profile.department)}` },
        { label: profile.name }
      ]} />

      <header className="mb-12 bg-blue-900 text-white p-10 sm:p-16 rounded-[3rem] relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div className="space-y-2">
            <p className="text-blue-300 text-sm font-black uppercase tracking-[0.2em]">{profile.department}</p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter">{profile.name}</h1>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center min-w-[120px]">
            <div className="text-4xl font-black mb-1">{profile.activities.length}</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">掲載件数</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/20 rounded-full blur-[80px] -mr-40 -mt-40"></div>
      </header>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          {profile.activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1 bg-gray-50/30">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faculty-activities" element={<DepartmentList />} />
            <Route path="/dept/:deptName" element={<FacultyListPage />} />
            <Route path="/faculty/:name" element={<FacultyDetail />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <p className="text-gray-400 text-xs font-black uppercase tracking-[0.3em]">© 2025 Toyo University</p>
            <p className="text-gray-300 text-[10px] max-w-xl mx-auto leading-relaxed font-bold">
              本ディレクトリは東洋大学教員による社会貢献活動をアーカイブ化したものです。<br />
              データの二次利用については大学広報課までお問い合わせください。
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
