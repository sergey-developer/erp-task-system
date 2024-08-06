import { Button, Flex, Space, Typography } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types'
import { makeCreateRelocationTaskDraftPageLocationState } from 'modules/warehouse/utils/relocationTask'

export type ExecuteInventorizationRelocationsTabProps = Pick<
  ExecuteInventorizationPageLocationState,
  'inventorization'
>

const { Title } = Typography

const ExecuteInventorizationRelocationsTab: FC<ExecuteInventorizationRelocationsTabProps> = ({
  inventorization,
}) => {
  const navigate = useNavigate()

  const onClickExecuteInventorization = () =>
    navigate(WarehouseRouteEnum.CreateRelocationTaskDraft, {
      state: makeCreateRelocationTaskDraftPageLocationState(inventorization),
    })

  return (
    <Flex data-testid='execute-inventorization-relocations-tab' vertical gap='small'>
      <Space direction='vertical'>
        <Title level={5}>Заявки на перемещение оборудования</Title>

        <Button onClick={onClickExecuteInventorization}>Создать заявку</Button>
      </Space>
    </Flex>
  )
}

export default ExecuteInventorizationRelocationsTab
