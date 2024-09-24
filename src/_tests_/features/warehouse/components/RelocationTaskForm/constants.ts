import pick from 'lodash/pick'

import { RelocationTaskFormProps } from 'modules/warehouse/components/RelocationTaskForm/types'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask/index'

import userFixtures from '_tests_/fixtures/user/index'

export const props: RelocationTaskFormProps = {
  isLoading: false,
  authUser: pick(userFixtures.user(), 'id'),
  permissions: {},

  onUploadImage: jest.fn(),
  imageIsUploading: false,
  onDeleteImage: jest.fn(),
  imageIsDeleting: false,
  imagesIsLoading: false,

  users: [],
  usersIsLoading: false,

  usersGroups: [],
  usersGroupsIsLoading: false,

  relocateFromLocations: [],
  relocateFromLocationListIsLoading: false,
  relocateToLocations: [],
  relocateToLocationListIsLoading: false,

  controllerIsRequired: true,

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
