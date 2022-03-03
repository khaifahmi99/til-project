export interface BaseTIL {
  id: string;
  date_created: Date;
  title: string;
  tags: string[];
}

export interface FullTIL extends BaseTIL {
  content: string;
}