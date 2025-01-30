import { CreateInventorizationRequestModalProps } from 'features/warehouse/components/CreateInventorizationRequestModal/types'

export const props: CreateInventorizationRequestModalProps = {
  open: true,
  confirmLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),

  warehouses: [],
  warehousesIsLoading: false,
  onChangeWarehouses: jest.fn(),

  executors: [],
  executorsIsLoading: false,

  nomenclatures: [],
  nomenclaturesIsLoading: false,

  onCreateAttachment: jest.fn(),
  attachmentIsCreating: false,
  onDeleteAttachment: jest.fn(),
  attachmentIsDeleting: false,
}

export enum TestIdsEnum {
  CreateInventorizationRequestModal = 'create-inventorization-request-modal',
  DeadlineAtFormItem = 'deadline-at-form-item',
  DeadlineAtDateFormItem = 'deadline-at-date-form-item',
  DeadlineAtTimeFormItem = 'deadline-at-time-form-item',
  TypeFormItem = 'type-form-item',
  DescriptionFormItem = 'description-form-item',
  AttachmentsFormItem = 'attachments-form-item',
  ExecutorFormItem = 'executor-form-item',
  NomenclaturesFormItem = 'nomenclatures-form-item',
  WarehousesFormItem = 'warehouses-form-item',
}
