import { CreateCommentFormProps } from '../interfaces'

export const requiredProps: Readonly<CreateCommentFormProps> = {
  isLoading: false,
  onSubmit: jest.fn(),
}
