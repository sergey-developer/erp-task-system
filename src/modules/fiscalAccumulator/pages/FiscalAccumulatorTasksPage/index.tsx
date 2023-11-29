import { useBoolean, useLocalStorageState, useSetState } from 'ahooks'
import { Col, Row } from 'antd'
import pick from 'lodash/pick'
import React, { FC, useCallback, useState } from 'react'

import FiscalAccumulatorTaskTable from 'modules/fiscalAccumulator/components/FiscalAccumulatorTaskTable'
import {
  FiscalAccumulatorTasksFilterFormFields,
  FiscalAccumulatorTasksFilterProps,
} from 'modules/fiscalAccumulator/components/FiscalAccumulatorTasksFilter/types'
import { useGetFiscalAccumulatorTasks } from 'modules/fiscalAccumulator/hooks'
import { GetFiscalAccumulatorTasksQueryArgs } from 'modules/fiscalAccumulator/models'
import { useGetSupportGroupList } from 'modules/supportGroup/hooks'
import UpdateTasksButton from 'modules/task/components/UpdateTasksButton'
import {
  TaskStorageKeysEnum,
  TasksUpdateVariantsEnum,
  tasksUpdateVariantsIntervals,
} from 'modules/task/constants/task'
import { TasksFiltersStorageData } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { useOnChangeUserStatus, UseOnChangeUserStatusFn } from 'modules/user/hooks'
import { checkUserStatusOffline } from 'modules/user/utils'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { useGetMacroregionList } from 'shared/hooks/macroregion'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

const FiscalAccumulatorTasksFilter = React.lazy(
  () => import('modules/fiscalAccumulator/components/FiscalAccumulatorTasksFilter'),
)

const initialFilterValues: Readonly<FiscalAccumulatorTasksFilterFormFields> = {
  customers: [],
  macroregions: [],
  supportGroups: [],
}

const FiscalAccumulatorTasksPage: FC = () => {
  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)

  const [autoUpdateEnabled, { toggle: toggleAutoUpdateEnabled }] = useBoolean(false)

  const [preloadedFilters, setPreloadedFilters] = useLocalStorageState<
    MaybeUndefined<TasksFiltersStorageData>
  >(TaskStorageKeysEnum.TasksFilters)

  const [selectedCustomers, setSelectedCustomers] = useState<MaybeUndefined<IdType[]>>(
    preloadedFilters?.customers,
  )

  const [selectedMacroregions, setSelectedMacroregions] = useState<MaybeUndefined<IdType[]>>(
    preloadedFilters?.macroregions,
  )

  const [filterValues, setFilterValues] = useSetState<FiscalAccumulatorTasksFilterFormFields>({
    ...initialFilterValues,
    ...preloadedFilters,
  })

  const [fiscalAccumulatorTasksQueryArgs, setFiscalAccumulatorTasksQueryArgs] =
    useSetState<GetFiscalAccumulatorTasksQueryArgs>(preloadedFilters || {})

  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomerList(
    undefined,
    { skip: !filterOpened },
  )

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } =
    useGetMacroregionList({ customers: selectedCustomers }, { skip: !filterOpened })

  const { currentData: supportGroups = [], isFetching: supportGroupsIsFetching } =
    useGetSupportGroupList(
      {
        customers: selectedCustomers,
        macroregions: selectedMacroregions,
        assignedToUser: true,
      },
      { skip: !filterOpened },
    )

  const {
    currentData: fiscalAccumulatorTasks = [],
    isFetching: fiscalAccumulatorTasksIsFetching,
    refetch: refetchFiscalAccumulatorTasks,
  } = useGetFiscalAccumulatorTasks(fiscalAccumulatorTasksQueryArgs, {
    pollingInterval: autoUpdateEnabled
      ? tasksUpdateVariantsIntervals[TasksUpdateVariantsEnum.AutoUpdate1M]
      : undefined,
  })

  const onChangeUserStatus = useCallback<UseOnChangeUserStatusFn>(
    (status) => {
      if (checkUserStatusOffline(status)) {
        setPreloadedFilters(undefined)
        const initialSupportGroupFilters = pick(
          initialFilterValues,
          'customers',
          'macroregions',
          'supportGroups',
        )
        setFilterValues(initialSupportGroupFilters)
        setSelectedCustomers(initialSupportGroupFilters.customers)
        setSelectedMacroregions(initialSupportGroupFilters.macroregions)
        setFiscalAccumulatorTasksQueryArgs(initialSupportGroupFilters)
      }
    },
    [setFilterValues, setFiscalAccumulatorTasksQueryArgs, setPreloadedFilters],
  )

  useOnChangeUserStatus(onChangeUserStatus)

  const handleApplyFilter: FiscalAccumulatorTasksFilterProps['onSubmit'] = (values) => {
    setFilterValues(values)
    setFiscalAccumulatorTasksQueryArgs(values)
    setPreloadedFilters(pick(values, 'customers', 'macroregions', 'supportGroups'))
    toggleOpenFilter()
  }

  return (
    <>
      <Row data-testid='fiscal-accumulator-tasks-page' gutter={[20, 20]}>
        <Col span={24}>
          <Row justify='space-between'>
            <Col>
              <FilterButton
                onClick={debouncedToggleOpenFilter}
                disabled={fiscalAccumulatorTasksIsFetching}
              />
            </Col>

            <Col>
              <UpdateTasksButton
                onClick={refetchFiscalAccumulatorTasks}
                disabled={fiscalAccumulatorTasksIsFetching}
                onAutoUpdate={toggleAutoUpdateEnabled}
              />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <FiscalAccumulatorTaskTable
            loading={fiscalAccumulatorTasksIsFetching}
            dataSource={fiscalAccumulatorTasks}
          />
        </Col>
      </Row>

      {filterOpened && (
        <React.Suspense fallback={<ModalFallback open onCancel={debouncedToggleOpenFilter} />}>
          <FiscalAccumulatorTasksFilter
            open={filterOpened}
            values={filterValues}
            initialValues={initialFilterValues}
            customers={customers}
            customersIsLoading={customersIsFetching}
            onChangeCustomers={setSelectedCustomers}
            macroregions={macroregions}
            macroregionsIsLoading={macroregionsIsFetching}
            onChangeMacroregions={setSelectedMacroregions}
            supportGroups={supportGroups}
            supportGroupsIsLoading={supportGroupsIsFetching}
            onClose={debouncedToggleOpenFilter}
            onSubmit={handleApplyFilter}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default FiscalAccumulatorTasksPage
