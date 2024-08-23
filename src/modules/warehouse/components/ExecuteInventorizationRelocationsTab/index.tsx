import { useBoolean } from 'ahooks'
import { Button, Flex, Space, Typography } from 'antd'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types'
import { makeCreateRelocationTaskDraftPageLocationState } from 'modules/warehouse/utils/relocationTask'

import ModalFallback from 'components/Modals/ModalFallback'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'

const RelocationTaskDetails = React.lazy(
  () => import('modules/warehouse/components/RelocationTaskDetails'),
)

export type ExecuteInventorizationRelocationsTabProps = Pick<
  ExecuteInventorizationPageLocationState,
  'inventorization'
> & {
  defaultRelocationTaskId?: IdType
}

const { Title } = Typography

const ExecuteInventorizationRelocationsTab: FC<ExecuteInventorizationRelocationsTabProps> = ({
  inventorization,
  defaultRelocationTaskId,
}) => {
  const navigate = useNavigate()

  const [relocationTaskId, setRelocationTaskId] = useState(defaultRelocationTaskId)
  const [relocationTaskOpened, { setTrue: openRelocationTask, setFalse: closeRelocationTask }] =
    useBoolean(!!relocationTaskId)

  const onOpenRelocationTask = useDebounceFn(
    (id: IdType) => {
      openRelocationTask()
      setRelocationTaskId(id)
    },
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
      </Flex>

      {relocationTaskOpened && relocationTaskId && (
        <React.Suspense
          fallback={<ModalFallback open tip='Загрузка карточки заявки на перемещение' />}
        >
          <RelocationTaskDetails
            open={relocationTaskOpened}
            onClose={onCloseRelocationTask}
            relocationTaskId={relocationTaskId}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default ExecuteInventorizationRelocationsTab
