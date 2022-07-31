export enum FilterTypeEnum {
  Fast = 'Fast',
  Extended = 'Extended',
  Search = 'Search',
}

export enum FastFilterEnum {
  All = 'ALL',
  Free = 'FREE',
  Mine = 'MINE',
  Overdue = 'OVERDUE',
  Closed = 'CLOSED',
}

export enum SortEnum {
  ByCreatedDateAsc = 'created_at',
  ByCreatedDateDesc = '-created_at',
  ByOlaAsc = 'ola_next_breach_time',
  ByOlaDesc = '-ola_next_breach_time',
}
