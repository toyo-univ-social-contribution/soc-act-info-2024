import { Activity } from './types';
import { LITERATURE_DATA } from './data_literature';
import { HISTORY_DATA } from './data_history';
import { EDUCATION_DATA } from './data_education';
import { BUSINESS_FINANCE_DATA } from './data_business_finance';
import { LAW_DATA } from './data_law';
import { SOCIOLOGY_DATA } from './data_sociology';
import { MECH_ENG_DATA } from './data_mech_eng';
import { ELEC_ENG_DATA } from './data_elec_eng';
import { APPLIED_CHEM_DATA } from './data_applied_chem';
import { ARCHITECTURE_DATA } from './data_architecture';
import { COMP_INF_SCI_DATA } from './data_comp_inf_sci';
import { SOCIAL_WELFARE_DEPT_DATA } from './data_social_welfare_dept';
import { CHILD_SUPPORT_DATA } from './data_child_support';
import { HUMAN_ENVIRONMENT_DATA } from './data_human_environment';

// 事務組織データ
import { SOUMU_DATA } from './data_org_soumu';
import { KOUHOU_DATA } from './data_org_kouhou';
import { KOKUSAI_DATA } from './data_org_kokusai';
import { KYOMU_DATA } from './data_org_kyomu';
import { SANKAN_DATA } from './data_org_sankan';
import { GAKUSEI_DATA } from './data_org_gakusei';
import { KAWAGOE_DATA } from './data_org_kawagoe';
import { TOSHO_DATA } from './data_org_tosho';
import { PHILOSOPHY_DATA } from './data_org_philosophy';
import { SPORTS_DATA } from './data_org_sports';

// 研究推進課（細分化された15組織）
import { KENKYU_HUMAN_DATA } from './data_org_kenkyu_human';
import { KENKYU_MODERN_DATA } from './data_org_kenkyu_modern';
import { KENKYU_ORIENTAL_DATA } from './data_org_kenkyu_oriental';
import { KENKYU_ASIA_CULT_DATA } from './data_org_kenkyu_asia_cult';
import { KENKYU_REGIONAL_DATA } from './data_org_kenkyu_regional';
import { KENKYU_INDUSTRIAL_DATA } from './data_org_kenkyu_industrial';
import { KENKYU_LIFE_INN_DATA } from './data_org_kenkyu_life_inn';
import { KENKYU_BIONANO_DATA } from './data_org_kenkyu_bionano';
import { KENKYU_ASIA_PPP_DATA } from './data_org_kenkyu_asia_ppp';
import { KENKYU_GLOBAL_INN_DATA } from './data_org_kenkyu_global_inn';
import { KENKYU_BIOMEDICAL_DATA } from './data_org_kenkyu_biomedical';
import { KENKYU_PPP_DATA } from './data_org_kenkyu_ppp';
import { KENKYU_INTL_COEXISTENCE_DATA } from './data_org_kenkyu_intl_coexistence';
import { KENKYU_WELFARE_DATA } from './data_org_kenkyu_welfare';
import { KENKYU_BIO_DATA } from './data_org_kenkyu_bio';

export const RAW_DATA: Activity[] = [
  ...LITERATURE_DATA, ...HISTORY_DATA, ...EDUCATION_DATA, ...BUSINESS_FINANCE_DATA, ...LAW_DATA,
  ...SOCIOLOGY_DATA, ...MECH_ENG_DATA, ...ELEC_ENG_DATA, ...APPLIED_CHEM_DATA, ...ARCHITECTURE_DATA,
  ...COMP_INF_SCI_DATA, ...SOCIAL_WELFARE_DEPT_DATA, ...CHILD_SUPPORT_DATA, ...HUMAN_ENVIRONMENT_DATA,
  ...SOUMU_DATA, ...KOUHOU_DATA, ...KOKUSAI_DATA, ...KYOMU_DATA, ...SANKAN_DATA, ...GAKUSEI_DATA,
  ...KAWAGOE_DATA, ...TOSHO_DATA, ...PHILOSOPHY_DATA, ...SPORTS_DATA,
  ...KENKYU_HUMAN_DATA, ...KENKYU_MODERN_DATA, ...KENKYU_ORIENTAL_DATA, ...KENKYU_ASIA_CULT_DATA,
  ...KENKYU_REGIONAL_DATA, ...KENKYU_INDUSTRIAL_DATA, ...KENKYU_LIFE_INN_DATA, ...KENKYU_BIONANO_DATA,
  ...KENKYU_ASIA_PPP_DATA, ...KENKYU_GLOBAL_INN_DATA, ...KENKYU_BIOMEDICAL_DATA, ...KENKYU_PPP_DATA,
  ...KENKYU_INTL_COEXISTENCE_DATA, ...KENKYU_WELFARE_DATA, ...KENKYU_BIO_DATA
];

export const NAME_MAPPING: Record<string, string> = {
  // 学部・学科
  "文学部 日本文学文化学科": "Faculty of Letters, Dept. of Japanese Literature and Culture",
  "文学部 英米文学科": "Faculty of Letters, Dept. of English and American Literature",
  "文学部 史学科": "Faculty of Letters, Dept. of History",
  "文学部 教育学科": "Faculty of Letters, Dept. of Education",
  "経営学部 会計ファイナンス学科": "Faculty of Business Administration, Dept. of Accounting and Finance",
  "法学部 法律学科": "Faculty of Law, Dept. of Law",
  "社会学部 社会学科": "Faculty of Sociology, Dept. of Sociology",
  "理工学部 機械工学科": "Faculty of Science and Engineering, Dept. of Mechanical Engineering",
  "理工学部 電気電子情報工学科": "Faculty of Science and Engineering, Dept. of Electrical, Electronic and Communications Engineering",
  "理工学部 応用化学科": "Faculty of Science and Engineering, Dept. of Applied Chemistry",
  "理工学部 建築学科": "Faculty of Science and Engineering, Dept. of Architecture",
  "総合情報学部 総合情報学科": "Faculty of Information Sciences and Arts, Dept. of Information Sciences and Arts",
  "福祉社会デザイン学部 社会福祉学科": "Faculty of Design for Welfare Society, Dept. of Social Welfare Studies",
  "福祉社会デザイン学部 子ども支援学科": "Faculty of Design for Welfare Society, Dept. of Child Studies",
  "福祉社会デザイン学部 人間環境デザイン学科": "Faculty of Design for Welfare Society, Dept. of Human Environment Design",
  // 事務組織
  "総務課": "General Affairs Section",
  "広報課": "Public Relations Section",
  "国際課": "International Affairs Section",
  "文学部教務課": "Education Affairs Section for the Faculty of Letters",
  "法学部教務課": "Education Affairs Section for the Faculty of Law",
  "社会学部教務課": "Education Affairs Section for the Faculty of Sociology",
  "国際学部教務課": "Education Affairs Section for the Faculty of Global and Regional Studies",
  "国際観光学部教務課": "Education Affairs Section for the Faculty of International Tourism Management",
  "研究推進課": "Research Promotion Section",
  "産官学連携推進課": "Industry-Government-Academia Partnership Section",
  "学生支援課": "Student Support Section",
  "川越事務部総務課": "General Affairs Section, Kawagoe Campus Office",
  "川越事務部教学課": "Education Affairs Section, Kawagoe Campus Office",
  "図書事務課（白山）": "Library Administration Section (Hakusan)",
  "図書事務課（川越）": "Library Administration Section (Kawagoe)",
  "図書事務課（朝霞）": "Library Administration Section (Asaka)",
  "図書事務課（赤羽台）": "Library Administration Section (Akabanedai)",
  "井上円了哲学センター": "Inoue Enryo Philosophy Center",
  "TOYOスポーツセンター": "TOYO Sports Center",
  // 研究推進課配下のユニット
  "人間科学総合研究所": "Institute of Human Sciences",
  "現代社会総合研究所": "Research Institute of Social Sciences",
  "東洋学研究所": "Institute of Oriental Studies",
  "アジア文化研究所": "Asian Cultures Research Institute",
  "地域活性化研究所": "Institute of Regional Vitalization Studies",
  "工業技術研究所": "Research Institute of Industrial Technology",
  "ライフイノベーション研究所": "Institute of Life Innovation Studies",
  "バイオ・ナノエレクトロニクス研究センター": "Bio-Nano Electronics Research Centre",
  "アジアPPP 研究所": "Asia Public Private Partnership Institute",
  "グローバル・イノベーション学研究センター": "Center for Global Innovation Studies",
  "生体医工学研究センター": "Research Center for Biomedical Engineering",
  "PPP研究センター": "PPP Research Center",
  "国際共生社会研究センター": "Center for Sustainable Development Studies",
  "福祉社会開発研究センター": "Research Center for Development of Welfare Society",
  "バイオレジリエンス研究プロジェクト（BRRP）": "Bio-Resilience Research Project"
};

const DEPT_ORDER = [
  "文学部 日本文学文化学科", "文学部 英米文学科", "文学部 史学科", "文学部 教育学科",
  "経営学部 会計ファイナンス学科", "法学部 法律学科", "社会学部 社会学科",
  "理工学部 機械工学科", "理工学部 電気電子情報工学科", "理工学部 応用化学科",
  "理工学部 建築学科", "総合情報学部 総合情報学科", "福祉社会デザイン学部 社会福祉学科",
  "福祉社会デザイン学部 子ども支援学科", "福祉社会デザイン学部 人間環境デザイン学科"
];

const ORG_ORDER = [
  "総務課", "広報課", "国際課", "文学部教務課", "法学部教務課", "社会学部教務課",
  "国際学部教務課", "国際観光学部教務課", "研究推進課", "産官学連携推進課",
  "学生支援課", "川越事務部総務課", "川越事務部教学課", "図書事務課（白山）",
  "図書事務課（川越）", "図書事務課（朝霞）", "図書事務課（赤羽台）",
  "井上円了哲学センター", "TOYOスポーツセンター"
];

export const DEPARTMENTS = DEPT_ORDER.filter(dept => RAW_DATA.some(d => d.department === dept && d.facultyName));
export const ORGANIZATIONS = ORG_ORDER.filter(org => RAW_DATA.some(d => d.department === org && !d.facultyName));

export const getFacultiesByDept = (dept: string) => {
  const deptData = RAW_DATA.filter(d => d.department === dept && d.facultyName);
  const facultyNames = Array.from(new Set(deptData.map(d => d.facultyName)));
  return facultyNames.map(name => ({
    name,
    department: dept,
    activities: deptData.filter(d => d.facultyName === name)
  }));
};

export const getFacultyActivity = (name: string) => {
  const activities = RAW_DATA.filter(d => d.facultyName === name);
  if (activities.length === 0) return null;
  return { name, department: activities[0].department, activities };
};