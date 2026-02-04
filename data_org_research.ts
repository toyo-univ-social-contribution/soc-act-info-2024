import { Activity } from './types';

// --- 人間科学総合研究所 ---
const HUMAN_SCIENCE: Activity[] = [
  {
    id: 33,
    facultyName: "",
    department: "研究推進課",
    title: "SDGsと人文学　公開セミナー",
    role: "講師",
    type: "セミナー・ワークショップ",
    organizer: "人間科学総合研究所",
    eventName: "SDGsと人文学　公開セミナー",
    date: "6/22-1/25",
    location: "東洋大学白山キャンパス",
    target: "高校生, 大学生, 大学院生, 社会人・一般",
    summary: "SDGsの達成に人間科学総合研究所として貢献することをめざし、若手研究者たちがSDGsの問題群を考察する公開セミナーを開催。開催後は講演録を発行・公開している。",
    url: "https://sites.google.com/toyo.jp/ihs/news/20240622SDGs",
    sdgs: "4, 5, 8, 10, 16"
  }
];

// --- 現代社会総合研究所 ---
const MODERN_SOCIETY: Activity[] = [
  {
    id: 43,
    facultyName: "",
    department: "研究推進課",
    title: "SDGｓプロジェクト",
    role: "調査担当等",
    type: "調査",
    organizer: "現代社会総合研究所",
    eventName: "SDGｓプロジェクト",
    date: "継続中",
    location: "Web",
    target: "研究者等",
    summary: "地域創生論に関する自治体アンケート調査を実施。",
    url: "https://sites.google.com/toyo.jp/gensha/project/projectSDGs/20250103",
    sdgs: "11"
  }
];

// --- バイオレジリエンス研究プロジェクト（BRRP） ---
const BIO_RESILIENCE: Activity[] = [
  {
    id: 110,
    facultyName: "",
    department: "研究推進課",
    title: "バイオレジリエンス成果報告会",
    role: "報告",
    type: "講演会",
    organizer: "バイオレジリエンス研究プロジェクト（BRRP）",
    eventName: "2024年度成果報告会",
    date: "2/26",
    location: "朝霞キャンパス",
    target: "研究者等",
    summary: "極限環境微生物による循環型社会実現への成果を報告。",
    url: "https://toyobioresilience.jp/blog/2025-01-09.html",
    sdgs: "9"
  }
];

// 他の研究所・センターについても同様に追加可能

export const RESEARCH_DATA: Activity[] = [
  ...HUMAN_SCIENCE,
  ...MODERN_SOCIETY,
  ...BIO_RESILIENCE
];
