import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import RelocationTaskList from 'modules/task/components/RelocationTaskList'
import { TaskCardTabsEnum } from 'modules/task/constants/task'
import { getTaskListPageLink } from 'modules/task/utils/task'
import { useMatchUserPermissions } from 'modules/user/hooks'
import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { useGetRelocationTaskList } from 'modules/warehouse/hooks/relocationTask'
import { getRelocationTaskListPageLink } from 'modules/warehouse/utils/relocationTask'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { IdType } from 'shared/types/common'
import { getTextWithCounter } from 'shared/utils/common'
import { extractPaginationResults } from 'shared/utils/pagination'

const { Title } = Typography

export type RelocationTaskListTabProps = {
  taskId: IdType
}

const RelocationTaskListTab: FC<RelocationTaskListTabProps> = ({ taskId }) => {
  const navigate = useNavigate()

  const userPermissions = useMatchUserPermissions(['RELOCATION_TASKS_CREATE'])

  const { currentData: paginatedRelocationTaskList, isFetching: relocationTaskListIsFetching } =
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

  const relocationTaskList = extractPaginationResults(paginatedRelocationTaskList)

  const handleClickTask = (id: IdType) => navigate(getRelocationTaskListPageLink(id))

  const handleClickCreate = () =>
    navigate(WarehouseRouteEnum.CreateRelocationTask, {
      state: {
        from: getTaskListPageLink({
          viewTaskId: taskId,
          taskCardTab: TaskCardTabsEnum.RelocationTaskList,
        }),
      },
    })

  return (
    <Space data-testid='relocation-task-list-tab' size='middle' direction='vertical' $block>
      <Row justify='space-between' align='middle'>
        <Col>
          <Title level={5}>{getTextWithCounter('Перемещения', relocationTaskList)}</Title>
        </Col>

        <Col>
          <Button
            type='link'
            disabled={!userPermissions?.relocationTasksCreate}
            onClick={handleClickCreate}
          >
            Создать новое перемещение
          </Button>
        </Col>
      </Row>

      <LoadingArea
        data-testid='relocation-task-list-loading'
        isLoading={relocationTaskListIsFetching}
      >
        <RelocationTaskList data={relocationTaskList} onClick={handleClickTask} />
      </LoadingArea>
    </Space>
  )
}

export default RelocationTaskListTab
