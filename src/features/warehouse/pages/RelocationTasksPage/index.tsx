import { useBoolean, useSetState } from 'ahooks'
import { Button } from 'antd'
import { useGetTask, useGetTasks } from 'features/task/hooks/task'
import { GetTasksQueryArgs } from 'features/task/models'
import { UserPermissionsEnum } from 'features/user/constants'
import { useGetUsers, useUserPermissions } from 'features/user/hooks'
import RelocationTaskTable from 'features/warehouse/components/RelocationTaskTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'features/warehouse/components/RelocationTaskTable/sort'
import { RelocationTaskTableProps } from 'features/warehouse/components/RelocationTaskTable/types'
import { RelocationTasksFilterFormFields } from 'features/warehouse/components/RelocationTasksFilter/types'
import { RelocationTaskStatusEnum } from 'features/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'
import {
  useGetRelocationTasks,
  useNavigateToCreateRelocationTaskSimplifiedPage,
} from 'features/warehouse/hooks/relocationTask'
import { GetRelocationTasksQueryArgs } from 'features/warehouse/models'
import {
  makeRelocationTasksPageLink,
  relocationTaskListFilterToParams,
} from 'features/warehouse/utils/relocationTask'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useGetLocationsCatalog } from 'shared/catalogs/hooks/locations'
import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
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
  () => import('features/warehouse/components/CreateRelocationTaskByIncidentModal'),
)

const RelocationTasksFilter = React.lazy(
  () => import('features/warehouse/components/RelocationTasksFilter'),
)

const RelocationTaskDetails = React.lazy(
  () => import('features/warehouse/components/RelocationTaskDetails'),
)

const initialFilterValues: RelocationTasksFilterFormFields = {
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
  GetRelocationTasksQueryArgs,
  'statuses' | 'ordering' | 'offset' | 'limit'
> = {
  ...getInitialPaginationParams(),
  ordering: 'deadline_at',
  statuses: [
    RelocationTaskStatusEnum.New,
    RelocationTaskStatusEnum.Completed,
    RelocationTaskStatusEnum.Returned,
  ],
}

const RelocationTasksPage: FC = () => {
  // todo: создать хук для useSearchParams который парсит значения в нужный тип
  const [searchParams] = useSearchParams()
  const relocationTaskId = Number(searchParams.get('viewRelocationTask')) || undefined

  const permissions = useUserPermissions([UserPermissionsEnum.RelocationTasksCreate])

  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] = useState<RelocationTasksFilterFormFields>()

  /* Реализуется в другом эпике */
  // const [searchValue, setSearchValue] = useState<string>()

  const [selectedRelocationTaskId, setSelectedRelocationTaskId] =
    useState<MaybeUndefined<IdType>>(relocationTaskId)

  const [incidentSearchValue, setIncidentSearchValue] = useState('')
  const [selectedIncidentId, setSelectedIncidentId] = useState<IdType>()

  const [getTasksParams, setGetTasksParams] = useSetState<
    Pick<GetTasksQueryArgs, 'limit' | 'search' | 'sort'>
  >({ limit: 10, sort: 'created_at' })

  const debouncedSetTasksParams = useDebounceFn(setGetTasksParams, [], 500)

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
    setGetTasksParams({ search: undefined })
  })

  const [
    relocationTaskOpened,
    { toggle: toggleOpenRelocationTask, setFalse: closeRelocationTask },
  ] = useBoolean(!!selectedRelocationTaskId)

  const onCloseRelocationTask = useDebounceFn(closeRelocationTask)

  const [getRelocationTasksParams, setGetRelocationTasksParams] =
    useSetState<GetRelocationTasksQueryArgs>({
      ...initialRelocationTasksParams,
      ordering:
        (searchParams.get('ordering') as typeof initialRelocationTasksParams.ordering) ??
        initialRelocationTasksParams.ordering,
    })

  const { currentData: relocationTasks, isFetching: relocationTasksIsFetching } =
    useGetRelocationTasks(getRelocationTasksParams)

  const { currentData: users = [], isFetching: usersIsFetching } = useGetUsers(undefined, {
    skip: !filterOpened,
  })

  const { currentData: tasks, isFetching: tasksIsFetching } = useGetTasks(getTasksParams, {
    skip: !getTasksParams.search,
  })

  const { currentData: task, isFetching: taskIsFetching } = useGetTask(selectedIncidentId!, {
    skip: !selectedIncidentId,
  })

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocationsCatalog(
    undefined,
    { skip: !filterOpened },
  )

  const onTablePagination = useCallback(
    (pagination: Parameters<RelocationTaskTableProps['onChange']>[0]) => {
      setGetRelocationTasksParams(calculatePaginationParams(pagination))
    },
    [setGetRelocationTasksParams],
  )

  const onTableSort = useCallback(
    (sorter: Parameters<RelocationTaskTableProps['onChange']>[2]) => {
      if (sorter) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter
        if (field && (field as string) in sortableFieldToSortValues) {
          setGetRelocationTasksParams({
            ordering: order ? getSort(field as SortableField, order) : undefined,
          })
        }
      }
    },
    [setGetRelocationTasksParams],
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

  const onApplyFilter = (values: RelocationTasksFilterFormFields) => {
    setFilterValues(values)
    setGetRelocationTasksParams({
      ...relocationTaskListFilterToParams(values),
      offset: initialRelocationTasksParams.offset,
    })
    toggleOpenFilter()
  }

  const onCreateRelocationTaskByIncident = useNavigateToCreateRelocationTaskSimplifiedPage({
    task,
    from: makeRelocationTasksPageLink({ ordering: '-created_at' }),
  })

  /* Реализуется в другом эпике */
  // const onSearch = (value: string) =>
  //   setGetRelocationTasksParams({
  //     search: value || undefined,
  //     offset: initialRelocationTasksParams.offset,
  //   })

  return (
    <>
      <Space data-testid='relocation-tasks-page' $block direction='vertical' size='middle'>
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

          {permissions.relocationTasksCreate && (
            <Link to={WarehouseRouteEnum.CreateRelocationTask}>
              <Button>Создать заявку</Button>
            </Link>
          )}

          <Button
            disabled={!permissions.relocationTasksCreate}
            onClick={onOpenCreateRelocationTaskByIncidentModal}
          >
            Создать заявку на основе инцидента
          </Button>
        </Space>

        <RelocationTaskTable
          dataSource={extractPaginationResults(relocationTasks)}
          pagination={extractPaginationParams(relocationTasks)}
          loading={relocationTasksIsFetching}
          sort={getRelocationTasksParams.ordering}
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
          <RelocationTasksFilter
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
            onFinish={onCreateRelocationTaskByIncident}
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

export default RelocationTasksPage
