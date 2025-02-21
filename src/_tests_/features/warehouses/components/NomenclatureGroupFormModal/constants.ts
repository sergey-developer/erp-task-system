import { NomenclatureGroupFormModalProps } from 'features/nomenclatures/components/NomenclatureGroupFormModal/types'

import { fakeWord } from '_tests_/helpers'

export const props: Readonly<NomenclatureGroupFormModalProps> = {
  open: true,
  title: fakeWord(),
  okText: fakeWord(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

export const addModeProps: Readonly<Pick<NomenclatureGroupFormModalProps, 'okText'>> = {
  okText: 'Добавить',
}

export const editModeProps: Readonly<Pick<NomenclatureGroupFormModalProps, 'okText'>> = {
  okText: 'Сохранить',
}

export enum TestIdsEnum {
  NomenclatureGroupFormModal = 'nomenclature-group-form-modal',
  NameFormItem = 'name-form-item',
}
