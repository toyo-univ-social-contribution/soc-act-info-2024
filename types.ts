
export interface Activity {
  id: number;
  facultyName: string;
  department: string;
  title: string;
  role: string;
  type: string;
  organizer: string;
  eventName: string;
  date: string;
  location: string;
  target: string;
  summary: string;
  url: string;
  sdgs: string;
}

export interface FacultyProfile {
  name: string;
  department: string;
  activities: Activity[];
}

export interface DepartmentGroup {
  name: string;
  faculties: FacultyProfile[];
}
