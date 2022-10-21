import { generateId, generateWord } from '_tests_/utils'

import { CommentListProps } from '../index'

export const baseProps: CommentListProps = {
  title: generateWord(),
  taskId: generateId(),
}
