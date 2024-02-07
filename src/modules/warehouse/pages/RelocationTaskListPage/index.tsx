import { useBoolean, useSetState } from 'ahooks'
import { Button } from 'antd'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { useGetTask, useGetTasks } from 'modules/task/hooks/task'
import { GetTaskListQueryArgs } from 'modules/task/models'
import { useGetUsers, useMatchUserPermissions } from 'modules/user/hooks'
import { RelocationTaskListFilterFormFields } from 'modules/warehouse/components/RelocationTaskListFilter/types'
import RelocationTaskTable from 'modules/warehouse/components/RelocationTaskTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/components/RelocationTaskTable/sort'
import { RelocationTaskTableProps } from 'modules/warehouse/components/RelocationTaskTable/types'
import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { useGetRelocationTaskList } from 'modules/warehouse/hooks/relocationTask'
import { GetRelocationTaskListQueryArgs } from 'modules/warehouse/models'
import { relocationTaskListFilterToParams } from 'modules/warehouse/utils/relocationTask'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useGetLocationList } from 'shared/hooks/catalogs/location'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const CreateRelocationTaskByIncidentModal = React.lazy(
  () => import('modules/warehouse/components/CreateRelocationTaskByIncidentModal'),
)

const RelocationTaskListFilter = React.lazy(
  () => import('modules/warehouse/components/RelocationTaskListFilter'),
)

const RelocationTaskDetails = React.lazy(
  () => import('modules/warehouse/components/RelocationTaskDetails'),
)

const initialFilterValues: RelocationTaskListFilterFormFields = {
  status: undefined,
  type: undefined,
  deadlineAt: undefined,
  locationsFrom: undefined,
  locationsTo: undefined,
  controller: undefined,
  executor: undefined,
  createdBy: undefined,
  createdAt: undefined,
}

const initialRelocationTasksParams: Pick<
  GetRelocationTaskListQueryArgs,
  'statuses' | 'ordering' | 'offset' | 'limit'
> = {
  ...getInitialPaginationParams(),
  ordering: '-deadline_at',
  statuses: [
    RelocationTaskStatusEnum.New,
    RelocationTaskStatusEnum.Completed,
    RelocationTaskStatusEnum.Returned,
  ],
}

const RelocationTaskListPage: FC = () => {
  // todo: создать хук для useSearchParams который парсит значения в нужный тип
  const [searchParams] = useSearchParams()
  const relocationTaskId = Number(searchParams.get('viewRelocationTask')) || undefined

  const permissions = useMatchUserPermissions(['RELOCATION_TASKS_CREATE'])

  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] = useState<RelocationTaskListFilterFormFields>()

  /* Реализуется в другом эпике */
  // const [searchValue, setSearchValue] = useState<string>()

  const [selectedRelocationTaskId, setSelectedRelocationTaskId] =
    useState<MaybeUndefined<IdType>>(relocationTaskId)

  const [incidentSearchValue, setIncidentSearchValue] = useState('')
  const [selectedIncidentId, setSelectedIncidentId] = useState<IdType>()

  const [tasksParams, setTasksParams] = useSetState<
    Pick<GetTaskListQueryArgs, 'limit' | 'search' | 'sort'>
  >({ limit: 10, sort: 'created_at' })

  const debouncedSetTasksParams = useDebounceFn(setTasksParams, [], 500)

  const onChangeIncidentSearchValue = (value: string) => {
    setIncidentSearchValue(value)
    if (value.length >= 5) {
      debouncedSetTasksParams({ search: value })
    }
  }

  const [
    createRelocationTaskByIncidentModalOpened,
    {
      setTrue: openCreateRelocationTaskByIncidentModal,
      setFalse: closeCreateRelocationTaskByIncidentModal,
    },
  ] = useBoolean(false)

  const onOpenCreateRelocationTaskByIncidentModal = useDebounceFn(
    openCreateRelocationTaskByIncidentModal,
  )

  const onCloseCreateRelocationTaskByIncidentModal = useDebounceFn(() => {
    closeCreateRelocationTaskByIncidentModal()
    setSelectedIncidentId(undefined)
    setTasksParams({ search: undefined })
  })

  const [
    relocationTaskOpened,
    { toggle: toggleOpenRelocationTask, setFalse: closeRelocationTask },
  ] = useBoolean(!!selectedRelocationTaskId)

  const onCloseRelocationTask = useDebounceFn(closeRelocationTask)

  const [relocationTasksParams, setRelocationTasksParams] =
    useSetState<GetRelocationTaskListQueryArgs>(initialRelocationTasksParams)

  const { currentData: relocationTasks, isFetching: relocationTasksIsFetching } =
    useGetRelocationTaskList(relocationTasksParams)

  const { currentData: users = [], isFetching: usersIsFetching } = useGetUsers(undefined, {
    skip: !filterOpened,
  })
  const { currentData: tasks, isFetching: tasksIsFetching } = useGetTasks(tasksParams, {
    skip: !tasksParams.search,
  })

  const { currentData: task, isFetching: taskIsFetching } = useGetTask(selectedIncidentId!, {
    skip: !selectedIncidentId,
  })

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocationList(
    undefined,
    { skip: !filterOpened },
  )

  const onTablePagination = useCallback(
    (pagination: Parameters<RelocationTaskTableProps['onChange']>[0]) => {
      setRelocationTasksParams(calculatePaginationParams(pagination))
    },
    [setRelocationTasksParams],
  )

  const onTableSort = useCallback(
    (sorter: Parameters<RelocationTaskTableProps['onChange']>[2]) => {
      if (sorter) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter
        if (field && (field as string) in sortableFieldToSortValues) {
          setRelocationTasksParams({
            ordering: order ? getSort(field as SortableField, order) : undefined,
          })
        }
      }
    },
    [setRelocationTasksParams],
  )

  const onChangeTable = useCallback<RelocationTaskTableProps['onChange']>(
    (pagination, _, sorter) => {
      onTablePagination(pagination)
      onTableSort(sorter)
    },
    [onTablePagination, onTableSort],
  )

  const onTableRowClick = useCallback<RelocationTaskTableProps['onRow']>(
    (record) => ({
      onClick: debounce(() => {
        setSelectedRelocationTaskId(record.id)
        toggleOpenRelocationTask()
      }, DEFAULT_DEBOUNCE_VALUE),
    }),
    [toggleOpenRelocationTask],
  )

  const onApplyFilter = (values: RelocationTaskListFilterFormFields) => {
    setFilterValues(values)
    setRelocationTasksParams({
      ...relocationTaskListFilterToParams(values),
      offset: initialRelocationTasksParams.offset,
    })
    toggleOpenFilter()
  }

  /* Реализуется в другом эпике */
  // const onSearch = (value: string) =>
  //   setRelocationTasksParams({
  //     search: value || undefined,
  //     offset: initialRelocationTasksParams.offset,
  //   })

  return (
    <>
      <Space data-testid='relocation-task-list-page' $block direction='vertical' size='middle'>
        <Space size='middle'>
          <FilterButton onClick={debouncedToggleOpenFilter} />

          {/* Реализуется в другом эпике */}
          {/*<Search*/}
          {/*  allowClear*/}
          {/*  onSearch={onSearch}*/}
          {/*  onChange={(event) => setSearchValue(event.target.value)}*/}
          {/*  value={searchValue}*/}
          {/*  placeholder='Поиск по номеру'*/}
          {/*  disabled={relocationTasksIsFetching}*/}
          {/*/>*/}

          {permissions?.relocationTasksCreate && (
            <Link to={WarehouseRouteEnum.CreateRelocationTask}>
              <Button>Создать заявку</Button>
            </Link>
          )}

          <Button
            disabled={!permissions?.relocationTasksCreate}
            onClick={onOpenCreateRelocationTaskByIncidentModal}
          >
            Создать заявку на основе инцидента
          </Button>
        </Space>

        <RelocationTaskTable
          dataSource={extractPaginationResults(relocationTasks)}
          pagination={extractPaginationParams(relocationTasks)}
          loading={relocationTasksIsFetching}
          sort={relocationTasksParams.ordering}
          onChange={onChangeTable}
          onRow={onTableRowClick}
        />
      </Space>

      {relocationTaskOpened && selectedRelocationTaskId && (
        <React.Suspense
          fallback={<ModalFallback open tip='Загрузка данных для заявки на перемещение' />}
        >
          <RelocationTaskDetails
            open={relocationTaskOpened}
            onClose={onCloseRelocationTask}
            relocationTaskId={selectedRelocationTaskId}
          />
        </React.Suspense>
      )}

      {filterOpened && (
        <React.Suspense fallback={<ModalFallback open tip='Загрузка данных для фильтров' />}>
          <RelocationTaskListFilter
            open={filterOpened}
            values={filterValues}
            initialValues={initialFilterValues}
            users={users}
            usersIsLoading={usersIsFetching}
            locations={locations}
            locationsIsLoading={locationsIsFetching}
            onClose={debouncedToggleOpenFilter}
            onApply={onApplyFilter}
          />
        </React.Suspense>
      )}

      {createRelocationTaskByIncidentModalOpened && (
        <React.Suspense
          fallback={<ModalFallback open tip='Загрузка модалки для создания заявки по инциденту' />}
        >
          <CreateRelocationTaskByIncidentModal
            open={createRelocationTaskByIncidentModalOpened}
            onCancel={onCloseCreateRelocationTaskByIncidentModal}
            searchValue={incidentSearchValue}
            onSearchIncident={onChangeIncidentSearchValue}
            onChangeIncident={setSelectedIncidentId}
            incidents={extractPaginationResults(tasks)}
            incidentsIsLoading={tasksIsFetching}
            incident={task}
            incidentIsLoading={taskIsFetching}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default RelocationTaskListPage
