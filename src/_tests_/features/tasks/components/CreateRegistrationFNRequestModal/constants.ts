import { CreateRegistrationFNRequestModalProps } from 'features/task/components/CreateRegistrationFNRequestModal/types'

export const props: CreateRegistrationFNRequestModalProps = {
  open: true,
  confirmLoading: false,
  values: {},
  onSubmit: jest.fn(),
  onCancel: jest.fn(),

  email: [],
  emailAsCopy: [],
  recipientsIsLoading: false,

  changeTypes: [],
  changeTypesIsLoading: false,

  onCreateAttachment: jest.fn(),
  createAttachmentIsLoading: false,
}

export enum TestIdsEnum {
  CreateRegistrationFNRequestModal = 'create-registration-fn-request-modal',
  ChangeTypeFormItem = 'change-type-form-item',
  AttachmentsFormItem = 'attachments-form-item',
}