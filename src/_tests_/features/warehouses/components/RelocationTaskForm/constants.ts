import { RelocationTaskTypeEnum } from 'features/relocationTasks/api/constants'
import { RelocationTaskFormProps } from 'features/relocationTasks/components/RelocationTaskForm/types'

export const props: RelocationTaskFormProps = {
  isLoading: false,
  permissions: {},

  onUploadImage: jest.fn(),
  imageIsUploading: false,
  onDeleteImage: jest.fn(),
  imageIsDeleting: false,
  imagesIsLoading: false,

  relocateFromLocations: [],
  relocateFromLocationsIsLoading: false,
  relocateToLocations: [],
  relocateToLocationsIsLoading: false,

  controllersOptions: [],
  controllersIsLoading: false,
  controllerIsRequired: true,

  executorsOptions: [],
  executorsIsLoading: false,

  type: RelocationTaskTypeEnum.Relocation,
  onChangeType: jest.fn(),

  onChangeRelocateTo: jest.fn(),
  onChangeRelocateFrom: jest.fn(),
}

export enum TestIdsEnum {
  RelocationTaskForm = 'relocation-task-form',
  DeadlineAtFormItem = 'deadline-at-form-item',
  DeadlineAtDateFormItem = 'deadline-at-date-form-item',
  DeadlineAtTimeFormItem = 'deadline-at-time-form-item',
  ExecutorsFormItem = 'executors-form-item',
  ExecutorsSelectDropdown = 'executors-select-dropdown',
  ControllerFormItem = 'controller-form-item',
  ControllerSelectDropdown = 'controller-select-dropdown',
  TypeFormItem = 'type-form-item',
  RelocateFromFormItem = 'relocate-from-form-item',
  RelocateToFormItem = 'relocate-to-form-item',
  CommentFormItem = 'comment-form-item',
  Attachments = 'attachments',
}
