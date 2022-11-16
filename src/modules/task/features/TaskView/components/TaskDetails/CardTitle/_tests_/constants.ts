import { generateId } from '_tests_/utils'
import {
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'

import { CardTitleProps } from '../index'

export const requiredProps: CardTitleProps = {
  id: generateId(),
  type: TaskTypeEnum.Request,
  status: TaskStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  hasReclassificationRequest: false,
  isAssignedToCurrentUser: false,
  onClose: jest.fn(),
  onClickExecuteTask: jest.fn(),
  onClickRequestReclassification: jest.fn(),
}

export const firstItemActiveProps: Pick<
  CardTitleProps,
  'status' | 'isAssignedToCurrentUser' | 'hasReclassificationRequest'
> = {
  status: TaskStatusEnum.InProgress,
  isAssignedToCurrentUser: true,
  hasReclassificationRequest: false,
}

export const secondItemActiveProps: Pick<
  CardTitleProps,
  'status' | 'olaStatus' | 'type'
> = {
  status: TaskStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  type: TaskTypeEnum.Request,
}
