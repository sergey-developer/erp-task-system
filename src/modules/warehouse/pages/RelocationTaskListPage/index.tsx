import { useBoolean, useSetState } from 'ahooks'
import { Button } from 'antd'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import MatchUserPermissions from 'modules/user/components/MatchUserPermissions'
import RelocationTaskDetails from 'modules/warehouse/components/RelocationTaskDetails'
import RelocationTaskListFilter from 'modules/warehouse/components/RelocationTaskListFilter'
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
import Space from 'components/Space'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

const initialFilterValues: Pick<RelocationTaskListFilterFormFields, 'status'> = {
  status: [
    RelocationTaskStatusEnum.New,
    RelocationTaskStatusEnum.Completed,
    RelocationTaskStatusEnum.Returned,
  ],
}

const initialRelocationTaskListParams: Pick<
  GetRelocationTaskListQueryArgs,
  'statuses' | 'ordering' | 'offset' | 'limit'
> = {
  ...getInitialPaginationParams(),
  ordering: 'deadline_at',
  statuses: initialFilterValues.status,
}

const RelocationTaskListPage: FC = () => {
  // const location = useLocation()
  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] = useState<RelocationTaskListFilterFormFields>()

  const [selectedRelocationTaskId, setSelectedRelocationTaskId] = useState<IdType>()

  const [relocationTaskOpened, { toggle: toggleOpenRelocationTask }] = useBoolean(false)
  const debouncedToggleOpenRelocationTask = useDebounceFn(toggleOpenRelocationTask)

  const [relocationTaskListParams, setRelocationTaskListParams] =
    useSetState<GetRelocationTaskListQueryArgs>(initialRelocationTaskListParams)

  const { currentData: relocationTaskList, isFetching: relocationTaskListIsFetching } =
    useGetRelocationTaskList(relocationTaskListParams)

  // useEffect(() => {
  //   if (!relocationTaskOpened && location.state.viewRelocationTaskId) {
  //     setSelectedRelocationTaskId(location.state.viewRelocationTaskId)
  //     toggleOpenRelocationTask()
  //   }
  // }, [location.state.viewRelocationTaskId, relocationTaskOpened, toggleOpenRelocationTask])

  const handleTablePagination = useCallback(
    (pagination: Parameters<RelocationTaskTableProps['onChange']>[0]) => {
      setRelocationTaskListParams(calculatePaginationParams(pagination))
    },
    [setRelocationTaskListParams],
  )

  const handleTableSort = useCallback(
    (sorter: Parameters<RelocationTaskTableProps['onChange']>[2]) => {
      if (sorter) {
        const { columnKey, order } = Array.isArray(sorter) ? sorter[0] : sorter

        if (columnKey && (columnKey as string) in sortableFieldToSortValues) {
          setRelocationTaskListParams({
            ordering: order ? getSort(columnKey as SortableField, order) : undefined,
          })
        }
      }
    },
    [setRelocationTaskListParams],
  )

  const handleChangeTable = useCallback<RelocationTaskTableProps['onChange']>(
    (pagination, _, sorter) => {
      handleTablePagination(pagination)
      handleTableSort(sorter)
    },
    [handleTablePagination, handleTableSort],
  )

  const handleTableRowClick = useCallback<RelocationTaskTableProps['onRow']>(
    (record) => ({
      onClick: debounce(() => {
        setSelectedRelocationTaskId(record.id)
        toggleOpenRelocationTask()
      }, DEFAULT_DEBOUNCE_VALUE),
    }),
    [toggleOpenRelocationTask],
  )

  const handleApplyFilter = (values: RelocationTaskListFilterFormFields) => {
    setFilterValues(values)
    setRelocationTaskListParams(relocationTaskListFilterToParams(values))
    toggleOpenFilter()
  }

  return (
    <>
      <Space data-testid='relocation-task-list-page' $block direction='vertical' size='middle'>
        <Space size='middle'>
          <FilterButton onClick={debouncedToggleOpenFilter} />

          <MatchUserPermissions expected={['RELOCATION_TASKS_CREATE']}>
            {({ permissions }) =>
              permissions.relocationTasksCreate ? (
                <Link to={WarehouseRouteEnum.CreateRelocationTask}>
                  <Button>Создать заявку</Button>
                </Link>
              ) : null
            }
          </MatchUserPermissions>
        </Space>

        <RelocationTaskTable
          dataSource={relocationTaskList?.results || []}
          pagination={relocationTaskList?.pagination || false}
          loading={relocationTaskListIsFetching}
          sort={relocationTaskListParams.ordering}
          onChange={handleChangeTable}
          onRow={handleTableRowClick}
        />
      </Space>

      {relocationTaskOpened && (
        <RelocationTaskDetails
          open={relocationTaskOpened}
          onClose={debouncedToggleOpenRelocationTask}
          relocationTaskId={selectedRelocationTaskId}
        />
      )}

      {filterOpened && (
        <RelocationTaskListFilter
          open={filterOpened}
          values={filterValues}
          initialValues={initialFilterValues}
          onClose={debouncedToggleOpenFilter}
          onApply={handleApplyFilter}
        />
      )}
    </>
  )
}

export default RelocationTaskListPage
