import { generateId } from '_tests_/utils'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'

import { CardTitleProps } from '../index'

export const requiredProps: CardTitleProps = {
  id: generateId(),
  type: TaskTypeEnum.Request,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  isAssignedToCurrentUser: false,
  onClose: jest.fn(),
  onClickExecuteTask: jest.fn(),
  onClickRequestReclassification: jest.fn(),
}

export const activeFirstItemProps: Pick<
  CardTitleProps,
  'status' | 'extendedStatus' | 'isAssignedToCurrentUser'
> = {
  status: TaskStatusEnum.InProgress,
  extendedStatus: TaskExtendedStatusEnum.New,
  isAssignedToCurrentUser: true,
}

export const activeSecondItemProps: Pick<
  CardTitleProps,
  'status' | 'olaStatus' | 'type'
> = {
  status: TaskStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  type: TaskTypeEnum.Request,
}
