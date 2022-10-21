import { CreateCommentFormProps } from '../interfaces'

export const baseProps: Readonly<CreateCommentFormProps> = {
  isLoading: false,
  onSubmit: jest.fn(),
}
