import { generateWord } from '_tests_/utils'
import * as taskFixtures from 'fixtures/task'

import { TaskReclassificationRequestProps } from '../index'

const reclassificationRequest = taskFixtures.getTaskReclassificationRequest()

export const requiredProps: TaskReclassificationRequestProps = {
  title: generateWord(),
  actionText: generateWord(),
  user: reclassificationRequest.user,
  comment: reclassificationRequest.comment.text,
  createdAt: reclassificationRequest.createdAt,
  onAction: jest.fn(),
}
