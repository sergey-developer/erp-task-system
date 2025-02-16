import { screen } from '@testing-library/react'

import { buttonTestUtils, spinnerTestUtils } from '_tests_/helpers'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.RelocationTasksTab)

// create task button
const getCreateTaskButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Создать новое перемещение')

// create documents package button
const getCreateDocumentsPackageButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Сформировать пакет документов')

export const relocationTasksTabTestUtils = {
  getContainer,
  expectLoadingFinished: spinnerTestUtils.expectLoadingFinished('relocation-tasks-loading'),

  getCreateTaskButton,
  getCreateDocumentsPackageButton,
}
