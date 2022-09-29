import { SorterResult } from 'antd/es/table/interface'

import { SortableFieldKeysEnum } from 'modules/task/features/TaskList/constants/common'

import { TaskTableListItem } from '../TaskTable/interfaces'

export const DEFAULT_PAGE_SIZE = 100

export const DATE_FILTER_FORMAT = 'YYYY[-]MM[-]DD'

export enum SortDirectionsEnum {
  Ascend = 'ascend',
  Descend = 'descend',
}

export enum SortableFieldsEnum {
  id = 'id',
  name = 'name',
  title = 'title',
  comment = 'comment',
  assignee = 'assignee',
  recordId = 'recordId',
  workGroup = 'workGroup',
  createdAt = 'createdAt',
  olaNextBreachTime = 'olaNextBreachTime',
}

export const sortableFields = [
  SortableFieldsEnum.id,
  SortableFieldsEnum.name,
  SortableFieldsEnum.title,
  SortableFieldsEnum.comment,
  SortableFieldsEnum.recordId,
  SortableFieldsEnum.assignee,
  SortableFieldsEnum.workGroup,
  SortableFieldsEnum.createdAt,
  SortableFieldsEnum.olaNextBreachTime,
]

export const SMART_SORT_TO_FIELD_SORT_DIRECTIONS = {
  idAscend: SortableFieldKeysEnum.ByIdAsc,
  idDescend: SortableFieldKeysEnum.ByIdDesc,

  nameAscend: SortableFieldKeysEnum.ByNameAsc,
  nameDescend: SortableFieldKeysEnum.ByNameDesc,

  titleAscend: SortableFieldKeysEnum.ByTitleAsc,
  titleDescend: SortableFieldKeysEnum.ByTitleDesc,

  commentAscend: SortableFieldKeysEnum.ByCommentAsc,
  commentDescend: SortableFieldKeysEnum.ByCommentDesc,

  assigneeAscend: SortableFieldKeysEnum.ByAssigneeAsc,
  assigneeDescend: SortableFieldKeysEnum.ByAssigneeDesc,

  workGroupAscend: SortableFieldKeysEnum.ByWorkGroupAsc,
  workGroupDescend: SortableFieldKeysEnum.ByWorkGroupDesc,

  recordIdAscend: SortableFieldKeysEnum.ByRecordIdAsc,
  recordIdDescend: SortableFieldKeysEnum.ByRecordIdDesc,

  createdAtAscend: SortableFieldKeysEnum.ByCreatedDateAsc,
  createdAtDescend: SortableFieldKeysEnum.ByCreatedDateDesc,

  olaNextBreachTimeAscend: SortableFieldKeysEnum.ByOlaAsc,
  olaNextBreachTimeDescend: SortableFieldKeysEnum.ByOlaDesc,
}

export const sortableFieldConfig: Record<
  SortableFieldKeysEnum,
  SorterResult<TaskTableListItem>
> = {
  [SortableFieldKeysEnum.ByIdAsc]: {
    columnKey: SortableFieldsEnum.id,
    order: SortDirectionsEnum.Ascend,
  },
  [SortableFieldKeysEnum.ByIdDesc]: {
    columnKey: SortableFieldsEnum.id,
    order: SortDirectionsEnum.Descend,
  },

  [SortableFieldKeysEnum.ByOlaAsc]: {
    columnKey: SortableFieldsEnum.olaNextBreachTime,
    order: SortDirectionsEnum.Ascend,
  },
  [SortableFieldKeysEnum.ByOlaDesc]: {
    columnKey: SortableFieldsEnum.olaNextBreachTime,
    order: SortDirectionsEnum.Descend,
  },

  [SortableFieldKeysEnum.ByNameAsc]: {
    columnKey: SortableFieldsEnum.name,
    order: SortDirectionsEnum.Ascend,
  },
  [SortableFieldKeysEnum.ByNameDesc]: {
    columnKey: SortableFieldsEnum.name,
    order: SortDirectionsEnum.Descend,
  },

  [SortableFieldKeysEnum.ByTitleAsc]: {
    columnKey: SortableFieldsEnum.title,
    order: SortDirectionsEnum.Ascend,
  },
  [SortableFieldKeysEnum.ByTitleDesc]: {
    columnKey: SortableFieldsEnum.title,
    order: SortDirectionsEnum.Descend,
  },

  [SortableFieldKeysEnum.ByCommentAsc]: {
    columnKey: SortableFieldsEnum.comment,
    order: SortDirectionsEnum.Ascend,
  },
  [SortableFieldKeysEnum.ByCommentDesc]: {
    columnKey: SortableFieldsEnum.comment,
    order: SortDirectionsEnum.Descend,
  },

  [SortableFieldKeysEnum.ByAssigneeAsc]: {
    columnKey: SortableFieldsEnum.assignee,
    order: SortDirectionsEnum.Ascend,
  },
  [SortableFieldKeysEnum.ByAssigneeDesc]: {
    columnKey: SortableFieldsEnum.assignee,
    order: SortDirectionsEnum.Descend,
  },

  [SortableFieldKeysEnum.ByWorkGroupAsc]: {
    columnKey: SortableFieldsEnum.workGroup,
    order: SortDirectionsEnum.Ascend,
  },
  [SortableFieldKeysEnum.ByWorkGroupDesc]: {
    columnKey: SortableFieldsEnum.workGroup,
    order: SortDirectionsEnum.Descend,
  },

  [SortableFieldKeysEnum.ByRecordIdAsc]: {
    columnKey: SortableFieldsEnum.recordId,
    order: SortDirectionsEnum.Ascend,
  },
  [SortableFieldKeysEnum.ByRecordIdDesc]: {
    columnKey: SortableFieldsEnum.recordId,
    order: SortDirectionsEnum.Descend,
  },

  [SortableFieldKeysEnum.ByCreatedDateAsc]: {
    columnKey: SortableFieldsEnum.createdAt,
    order: SortDirectionsEnum.Ascend,
  },
  [SortableFieldKeysEnum.ByCreatedDateDesc]: {
    columnKey: SortableFieldsEnum.createdAt,
    order: SortDirectionsEnum.Descend,
  },
}
