import { TaskRequestProps } from 'modules/task/components/TaskRequest/index'

import { PauseCircleIcon } from 'components/Icons'

import { ArrayFirst } from 'shared/types/utils'

import userFixtures from '_tests_/fixtures/user/index'
import { fakeDateString, fakeWord } from '_tests_/utils/index'

export const action: ArrayFirst<TaskRequestProps['actions']> = {
  text: fakeWord(),
  onClick: jest.fn(),
  disabled: false,
  loading: false,
}

export enum TestIdsEnum {
  TaskRequest = 'task-request',
}

export const props: Readonly<TaskRequestProps & { 'data-testid': string }> = {
  user: userFixtures.baseUser(),
  title: fakeWord(),
  comment: fakeWord(),
  date: fakeDateString(),
  icon: <PauseCircleIcon />,
  actions: [action],
  'data-testid': TestIdsEnum.TaskRequest,
}
