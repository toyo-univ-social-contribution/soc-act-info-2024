import { Activity } from './types';
import { LITERATURE_DATA } from './data_literature';
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

// 事務組織データ（課・部署ごとの個別ファイル）
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

// 研究推進課（15の研究所・センター・プロジェクト個別のファイル）
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
  ...LITERATURE_DATA,
  ...BUSINESS_FINANCE_DATA,
  ...LAW_DATA,
  ...SOCIOLOGY_DATA,
  ...MECH_ENG_DATA,
  ...ELEC_ENG_DATA,
  ...APPLIED_CHEM_DATA,
  ...ARCHITECTURE_DATA,
  ...COMP_INF_SCI_DATA,
  ...SOCIAL_WELFARE_DEPT_DATA,
  ...CHILD_SUPPORT_DATA,
  ...HUMAN_ENVIRONMENT_DATA,
  // 事務組織データの結合
  ...SOUMU_DATA,
  ...KOUHOU_DATA,
  ...KOKUSAI_DATA,
  ...KYOMU_DATA,
  ...SANKAN_DATA,
  ...GAKUSEI_DATA,
  ...KAWAGOE_DATA,
  ...TOSHO_DATA,
  ...PHILOSOPHY_DATA,
  ...SPORTS_DATA,
  // 研究推進課データの結合（細分化された15組織）
  ...KENKYU_HUMAN_DATA,
  ...KENKYU_MODERN_DATA,
  ...KENKYU_ORIENTAL_DATA,
  ...KENKYU_ASIA_CULT_DATA,
  ...KENKYU_REGIONAL_DATA,
  ...KENKYU_INDUSTRIAL_DATA,
  ...KENKYU_LIFE_INN_DATA,
  ...KENKYU_BIONANO_DATA,
  ...KENKYU_ASIA_PPP_DATA,
  ...KENKYU_GLOBAL_INN_DATA,
  ...KENKYU_BIOMEDICAL_DATA,
  ...KENKYU_PPP_DATA,
  ...KENKYU_INTL_COEXISTENCE_DATA,
  ...KENKYU_WELFARE_DATA,
  ...KENKYU_BIO_DATA
];

// 教員リスト用の学科並び順（学部・学科）
const DEPT_ORDER = [
  "文学部 日本文学文化学科",
  "文学部 英米文学科",
  "文学部 史学科",
  "文学部 教育学科",
  "経営学部 会計ファイナンス学科",
  "法学部 法律学科",
  "社会学部 社会学科",
  "理工学部 機械工学科",
  "理工学部 電気電子情報工学科",
  "理工学部 応用化学科",
  "理工学部 建築学科",
  "総合情報学部 総合情報学科",
  "福祉社会デザイン学部 社会福祉学科",
  "福祉社会デザイン学部 子ども支援学科",
  "福祉社会デザイン学部 人間環境デザイン学科"
];

// 組織リスト用の厳格な並び順
const ORG_ORDER = [
  "総務課",
  "広報課",
  "国際課",
  "文学部教務課",
  "法学部教務課",
  "社会学部教務課",
  "国際学部教務課",
  "国際観光学部教務課",
  "研究推進課",
  "産官学連携推進課",
  "学生支援課",
  "川越事務部総務課",
  "川越事務部教学課",
  "図書事務課（白山）",
  "図書事務課（川越）",
  "図書事務課（朝霞）",
  "図書事務課（赤羽台）",
  "井上円了哲学センター",
  "TOYOスポーツセンター"
];

export const DEPARTMENTS = DEPT_ORDER.filter(dept => 
  RAW_DATA.some(d => d.department === dept && d.facultyName)
);

export const ORGANIZATIONS = ORG_ORDER.filter(org => 
  RAW_DATA.some(d => d.department === org && !d.facultyName)
);

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
  return {
    name: name,
    department: activities[0].department,
    activities
  };
};
