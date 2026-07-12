export interface User {
  name: string;
  role: string;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
}

export interface DashboardData {
  user: User;
  projects: number;
  researchPapers: number;
  prototypeProgress: number;
  prototypes: number;
  dueToday: number;
  recentActivity: Activity[];
}