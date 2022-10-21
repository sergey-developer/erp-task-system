import { AddCommentFormProps } from '../interfaces'

export const baseProps: Readonly<AddCommentFormProps> = {
  isLoading: false,
  onSubmit: jest.fn(),
}
