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
  ...HUMAN_ENVIRONMENT_DATA
];

// 学科の並び順の優先順位
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

export const DEPARTMENTS = Array.from(new Set(RAW_DATA.map(d => d.department))).sort((a, b) => {
  const indexA = DEPT_ORDER.indexOf(a);
  const indexB = DEPT_ORDER.indexOf(b);
  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;
  return a.localeCompare(b, 'ja');
});

export const getFacultiesByDept = (dept: string) => {
  const deptData = RAW_DATA.filter(d => d.department === dept);
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
