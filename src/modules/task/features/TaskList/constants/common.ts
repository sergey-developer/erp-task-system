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

export enum SortableFieldKeysEnum {
  ByIdAsc = 'id',
  ByIdDesc = '-id',

  ByNameAsc = 'name',
  ByNameDesc = '-name',

  ByTitleAsc = 'title',
  ByTitleDesc = '-title',

  ByOlaAsc = 'ola_next_breach_time',
  ByOlaDesc = '-ola_next_breach_time',

  ByRecordIdAsc = 'record_id',
  ByRecordIdDesc = '-record_id',

  ByCommentAsc = 'last_comment_text',
  ByCommentDesc = '-last_comment_text',

  ByAssigneeAsc = 'assignee__last_name',
  ByAssigneeDesc = '-assignee__last_name',

  ByWorkGroupAsc = 'work_group__name',
  ByWorkGroupDesc = '-work_group__name',

  ByCreatedDateAsc = 'created_at',
  ByCreatedDateDesc = '-created_at',
}
