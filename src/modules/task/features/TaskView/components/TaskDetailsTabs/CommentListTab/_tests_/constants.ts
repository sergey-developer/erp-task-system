import { generateId, generateWord } from '_tests_/utils'

import { CommentListTabProps } from '../index'

export const requiredProps: CommentListTabProps = {
  title: generateWord(),
  taskId: generateId(),
}
