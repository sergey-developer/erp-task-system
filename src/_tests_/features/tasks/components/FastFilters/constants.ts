import { fastFiltersConfig } from 'modules/task/components/FastFilters/config'
import { FastFiltersProps } from 'modules/task/components/FastFilters/types'

import taskFixtures from '_tests_/fixtures/task/index'

export const filterCheckedClass = 'ant-tag-checkable-checked'
export const filterDisabledClass = 'ant-tag-checkable--disabled'

export const props: Readonly<FastFiltersProps> = {
  config: fastFiltersConfig.filter((c) => !c.canShow),
  permissions: {},
  counters: taskFixtures.taskCounters(),
  isShowCounters: true,
  disabled: false,
  isLoading: false,
  selectedFilter: null,
  onChange: jest.fn(),
}

export enum TestIdsEnum {
  FastFilterList = 'fast-filter-list',
  FastFilterListItem = 'fast-filter-list-item',
}
