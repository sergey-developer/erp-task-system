import { useBoolean, useSetState } from 'ahooks'
import { Button, Flex, Space, Typography } from 'antd'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ExecuteInventorizationRelocationTaskTable from 'modules/warehouse/components/ExecuteInventorizationRelocationTaskTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/components/ExecuteInventorizationRelocationTaskTable/sort'
import {
  ExecuteInventorizationRelocationTaskTableProps,
  ExecuteInventorizationRelocationTaskTableSortValue,
} from 'modules/warehouse/components/ExecuteInventorizationRelocationTaskTable/types'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { useGetRelocationTasks } from 'modules/warehouse/hooks/relocationTask'
import { GetRelocationTasksQueryArgs } from 'modules/warehouse/models'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types'
import { makeCreateRelocationTaskDraftPageLocationState } from 'modules/warehouse/utils/relocationTask'

import ModalFallback from 'components/Modals/ModalFallback'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const RelocationTaskDetails = React.lazy(
  () => import('modules/warehouse/components/RelocationTaskDetails'),
)

const { Title } = Typography

const initialRelocationTasksParams: Pick<
  GetRelocationTasksQueryArgs<ExecuteInventorizationRelocationTaskTableSortValue>,
  'ordering' | 'offset' | 'limit'
> = {
  ...getInitialPaginationParams(),
  ordering: 'type',
}

export type ExecuteInventorizationRelocationsTabProps = Pick<
  ExecuteInventorizationPageLocationState,
  'inventorization'
> & {
  defaultRelocationTaskId?: IdType
}

const ExecuteInventorizationRelocationsTab: FC<ExecuteInventorizationRelocationsTabProps> = ({
  inventorization,
  defaultRelocationTaskId,
}) => {
  const navigate = useNavigate()

  const [relocationTaskId, setRelocationTaskId] = useState(defaultRelocationTaskId)
  const [relocationTaskOpened, { setTrue: openRelocationTask, setFalse: closeRelocationTask }] =
    useBoolean(!!relocationTaskId)

  const [getRelocationTasksParams, setGetRelocationTasksParams] = useSetState<
    Pick<
      GetRelocationTasksQueryArgs<ExecuteInventorizationRelocationTaskTableSortValue>,
      'ordering' | 'offset' | 'limit' | 'inventorization'
    >
  >({ ...initialRelocationTasksParams, inventorization: inventorization.id })

  const {
    currentData: relocationTasks,
    isFetching: relocationTasksIsFetching,
    refetch: refetchRelocationTasks,
  } = useGetRelocationTasks(getRelocationTasksParams)

  const onTablePagination = useCallback(
    (pagination: Parameters<ExecuteInventorizationRelocationTaskTableProps['onChange']>[0]) => {
      setGetRelocationTasksParams(calculatePaginationParams(pagination))
    },
    [setGetRelocationTasksParams],
  )

  const onTableSort = useCallback(
    (sorter: Parameters<ExecuteInventorizationRelocationTaskTableProps['onChange']>[2]) => {
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

  const onChangeTable = useCallback<ExecuteInventorizationRelocationTaskTableProps['onChange']>(
    (pagination, _, sorter) => {
      onTablePagination(pagination)
      onTableSort(sorter)
    },
    [onTablePagination, onTableSort],
  )

  const onTableRowClick = useCallback<ExecuteInventorizationRelocationTaskTableProps['onRow']>(
    (record) => ({
      onClick: debounce(() => {
        setRelocationTaskId(record.id)
        openRelocationTask()
      }, DEFAULT_DEBOUNCE_VALUE),
    }),
    [openRelocationTask],
  )

  const onCloseRelocationTask = useDebounceFn(() => {
    closeRelocationTask()
    setRelocationTaskId(undefined)
  }, [closeRelocationTask])

  const onClickExecuteInventorization = () =>
    navigate(WarehouseRouteEnum.CreateRelocationTaskDraft, {
      state: makeCreateRelocationTaskDraftPageLocationState(inventorization),
    })

  return (
    <>
      <Flex data-testid='execute-inventorization-relocations-tab' vertical gap='small'>
        <Space direction='vertical'>
          <Title level={5}>Заявки на перемещение оборудования</Title>

          <Button onClick={onClickExecuteInventorization}>Создать заявку</Button>
        </Space>

        <ExecuteInventorizationRelocationTaskTable
          dataSource={extractPaginationResults(relocationTasks)}
          pagination={extractPaginationParams(relocationTasks)}
          loading={relocationTasksIsFetching}
          sort={getRelocationTasksParams.ordering}
          onChange={onChangeTable}
          onRow={onTableRowClick}
        />
      </Flex>

      {relocationTaskOpened && relocationTaskId && (
        <React.Suspense
          fallback={<ModalFallback open tip='Загрузка карточки заявки на перемещение' />}
        >
          <RelocationTaskDetails
            open={relocationTaskOpened}
            onClose={onCloseRelocationTask}
            relocationTaskId={relocationTaskId}
            refetchRelocationTasks={refetchRelocationTasks}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default ExecuteInventorizationRelocationsTab
