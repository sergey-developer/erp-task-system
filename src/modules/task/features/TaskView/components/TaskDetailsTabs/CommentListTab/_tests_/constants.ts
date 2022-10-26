import { generateId, generateWord } from '_tests_/utils'

import { CommentListTabProps } from '../index'

export const baseProps: CommentListTabProps = {
  title: generateWord(),
  taskId: generateId(),
}
