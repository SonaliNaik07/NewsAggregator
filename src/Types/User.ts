export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Student' | 'Researcher' | 'General';
  categories: string[];
  status?: 'active' | 'inactive';
}
