export interface Subject {
  id: string;

  career: string;
  shift: string;
  plan: string;
  semester: string;

  group: string;
  subject: string;
  teacher: string;
  building: string;
  classroom: string;

  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;

  loadedAt: string;
}

export interface ScheduleBlock {
  id: string;
  subjectIds: string[];
  
  subjects: string[];
  abbSubjects: string[]
  groups: string[];

  column: ColType;
  rowStart: RowType;
  span: SpanType;

  variant: VariantType[];
}

export interface ListBlock {
  id: string;
  subject: string;
  teacher: string;
  group: string;
  variants: VariantType[];
}

export const variantStyle = {
  base: 'bg-primary text-background',
  overlap: 'bg-overlap text-foreground',
  repeated: 'outline-1 outline-background'
} as const;

export const colStyle = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
} as const;

export const rowStyle = {
  1: 'row-start-1',
  2: 'row-start-2',
  3: 'row-start-3',
  4: 'row-start-4',
  5: 'row-start-5',
  6: 'row-start-6',
  7: 'row-start-7',
  8: 'row-start-8',
  9: 'row-start-9',
  10: 'row-start-10',
} as const;

export const spanStyle = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
  7: 'row-span-7',
  8: 'row-span-8',
  9: 'row-span-9',
  10: 'row-span-10'
} as const;

export type VariantType = keyof typeof variantStyle;
export type ColType = keyof typeof colStyle;
export type RowType = keyof typeof rowStyle;
export type SpanType = keyof typeof spanStyle;