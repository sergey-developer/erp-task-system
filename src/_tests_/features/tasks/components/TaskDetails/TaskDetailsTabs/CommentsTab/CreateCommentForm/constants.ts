import { CreateCommentFormProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/CreateCommentForm/types'

export const props: Readonly<CreateCommentFormProps> = {
  isLoading: false,
  onSubmit: jest.fn(),
}

export enum TestIdsEnum {
  CreateCommentForm = 'create-comment-form',
  CommentFormItem = 'comment-form-item',
  AttachmentsFormItem = 'attachments-form-item',
}
