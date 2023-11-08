import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import RelocationList from 'modules/task/components/RelocationList'
import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { useGetRelocationTaskList } from 'modules/warehouse/hooks/relocationTask'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { IdType } from 'shared/types/common'
import { getTextWithCounter } from 'shared/utils/common'
import { extractPaginationResults } from 'shared/utils/pagination'

const { Title } = Typography

type RelocationListTabProps = {
  taskId: IdType
}

const RelocationListTab: FC<RelocationListTabProps> = ({ taskId }) => {
  const { currentData: paginatedRelocationList, isFetching: relocationListIsFetching } =
    useGetRelocationTaskList({
      ordering: '-created_at',
      limit: 999999,
      statuses: [
        RelocationTaskStatusEnum.New,
        RelocationTaskStatusEnum.Completed,
        RelocationTaskStatusEnum.Returned,
        RelocationTaskStatusEnum.Closed,
        RelocationTaskStatusEnum.Canceled,
      ],
      taskId,
    })

  const relocationList = extractPaginationResults(paginatedRelocationList)

  return (
    <Space data-testid='relocation-list-tab' size='middle' direction='vertical' $block>
      <Row justify='space-between' align='middle'>
        <Col>
          <Title level={5}>{getTextWithCounter('Перемещения', relocationList)}</Title>
        </Col>

        <Col>
          <Button type='link'>Создать новое перемещение</Button>
        </Col>
      </Row>

      <LoadingArea isLoading={relocationListIsFetching}>
        <RelocationList data={relocationList} />
      </LoadingArea>
    </Space>
  )
}

export default RelocationListTab
