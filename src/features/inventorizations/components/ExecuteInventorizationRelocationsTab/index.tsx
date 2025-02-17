import { useBoolean, useSetState } from 'ahooks'
import { Button, Flex, Space, Typography } from 'antd'
import ExecuteInventorizationRelocationTaskTable from 'features/inventorizations/components/ExecuteInventorizationRelocationTaskTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'features/inventorizations/components/ExecuteInventorizationRelocationTaskTable/sort'
import {
  ExecuteInventorizationRelocationTaskTableProps,
  ExecuteInventorizationRelocationTaskTableSortValue,
} from 'features/inventorizations/components/ExecuteInventorizationRelocationTaskTable/types'
import { GetRelocationTasksRequest } from 'features/relocationTasks/api/schemas'
import { makeCreateRelocationTaskDraftPageLocationState } from 'features/relocationTasks/helpers'
import { useGetRelocationTasks } from 'features/relocationTasks/hooks'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

import { ExecuteInventorizationPageLocationState } from '../../types'

const RelocationTaskDetails = React.lazy(
  () => import('features/relocationTasks/components/RelocationTaskDetails'),
)

const { Title } = Typography

const initialGetRelocationTasksRequestArgs: Pick<
  GetRelocationTasksRequest<ExecuteInventorizationRelocationTaskTableSortValue>,
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

  const [getRelocationTasksRequestArgs, setGetRelocationTasksRequestArgs] = useSetState<
    Pick<
      GetRelocationTasksRequest<ExecuteInventorizationRelocationTaskTableSortValue>,
      'ordering' | 'offset' | 'limit' | 'inventorization'
    >
  >({ ...initialGetRelocationTasksRequestArgs, inventorization: inventorization.id })

  const {
    currentData: relocationTasks,
    isFetching: relocationTasksIsFetching,
    refetch: refetchRelocationTasks,
  } = useGetRelocationTasks(getRelocationTasksRequestArgs)

  const onTablePagination = useCallback(
    (pagination: Parameters<ExecuteInventorizationRelocationTaskTableProps['onChange']>[0]) => {
      setGetRelocationTasksRequestArgs(calculatePaginationParams(pagination))
    },
    [setGetRelocationTasksRequestArgs],
  )

  const onTableSort = useCallback(
    (sorter: Parameters<ExecuteInventorizationRelocationTaskTableProps['onChange']>[2]) => {
      if (sorter) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter
        if (field && (field as string) in sortableFieldToSortValues) {
          setGetRelocationTasksRequestArgs({
            ordering: order ? getSort(field as SortableField, order) : undefined,
          })
        }
      }
    },
    [setGetRelocationTasksRequestArgs],
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
    navigate(WarehousesRoutesEnum.CreateRelocationTaskDraft, {
      state: makeCreateRelocationTaskDraftPageLocationState({ inventorization }),
    })

  return (
    <>
      <Flex data-testid='execute-inventorizationDetail-relocations-tab' vertical gap='small'>
        <Space direction='vertical'>
          <Title level={5}>Заявки на перемещение оборудования</Title>

          <Button onClick={onClickExecuteInventorization}>Создать заявку</Button>
        </Space>

        <ExecuteInventorizationRelocationTaskTable
          dataSource={extractPaginationResults(relocationTasks)}
          pagination={extractPaginationParams(relocationTasks)}
          loading={relocationTasksIsFetching}
          sort={getRelocationTasksRequestArgs.ordering}
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
            inventorization={inventorization}
            refetchRelocationTasks={refetchRelocationTasks}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default ExecuteInventorizationRelocationsTab
