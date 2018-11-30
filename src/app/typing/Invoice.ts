export interface Invoice {
  id?: number;
  addedAt: number;
  title: string;
  description: string;
  guarantyYears: number;
  guarantyUntil: number;
  hasGuaranty?: boolean;
}
