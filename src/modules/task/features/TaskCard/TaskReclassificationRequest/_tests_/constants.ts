import taskFixtures from 'fixtures/task'

import { TaskReclassificationRequestProps } from '../index'

const reclassificationRequest = taskFixtures.getTaskReclassificationRequest()

export const requiredProps: TaskReclassificationRequestProps = {
  user: reclassificationRequest.user,
  comment: reclassificationRequest.comment.text,
  date: reclassificationRequest.createdAt,
  onCancel: jest.fn(),
  cancelBtnDisabled: false,
}
