import { Button, Col, Row, Typography } from 'antd'
import pick from 'lodash/pick'
import React, { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useIdBelongAuthUser } from 'modules/auth/hooks'
import RelocationTaskList from 'modules/task/components/RelocationTaskList'
import { RelocationTaskListProps } from 'modules/task/components/RelocationTaskList/types'
import { TaskDetailsTabsEnum } from 'modules/task/constants/task'
import { getTaskListPageLink } from 'modules/task/utils/task'
import { useMatchUserPermissions } from 'modules/user/hooks'
import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import {
  useCreateRelocationTaskAttachment,
  useGetRelocationTaskList,
} from 'modules/warehouse/hooks/relocationTask'
import { getRelocationTaskListPageLink } from 'modules/warehouse/utils/relocationTask'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { IdType } from 'shared/types/common'
import { getTextWithCounter } from 'shared/utils/common'
import { extractPaginationResults } from 'shared/utils/pagination'

import { RelocationTaskListTabProps } from './types'

const { Title } = Typography

const RelocationTaskListTab: FC<RelocationTaskListTabProps> = ({ task }) => {
  const navigate = useNavigate()

  const permissions = useMatchUserPermissions(['RELOCATION_TASKS_CREATE'])
  const assigneeIsCurrentUser = useIdBelongAuthUser(task.assignee?.id)

  const [createRelocationTaskAttachment] = useCreateRelocationTaskAttachment()

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
      taskId: task.id,
    })

  const relocationTaskList = extractPaginationResults(paginatedRelocationTaskList)

  const handleClickTask = useCallback(
    (id: IdType) => navigate(getRelocationTaskListPageLink(id)),
    [navigate],
  )

  const handleClickCreate = () =>
    navigate(WarehouseRouteEnum.CreateRelocationTaskSimplified, {
      state: {
        task: pick(
          task,
          'id',
          'recordId',
          'olaNextBreachTime',
          'olaEstimatedTime',
          'olaStatus',
          'shop',
          'assignee',
        ),
        from: getTaskListPageLink({
          viewTaskId: task.id,
          taskDetailsTab: TaskDetailsTabsEnum.RelocationTaskList,
        }),
      },
    })

  const handleCreateAttachment = useCallback<RelocationTaskListProps['onCreateAttachment']>(
    (id) => async (options) => {
      await createRelocationTaskAttachment({ relocationTaskId: id }, options)
    },
    [createRelocationTaskAttachment],
  )

  return (
    <Space data-testid='relocation-task-list-tab' size='middle' direction='vertical' $block>
      <Row justify='space-between' align='middle'>
        <Col>
          <Title level={5}>{getTextWithCounter('Перемещения', relocationTaskList)}</Title>
        </Col>

        <Col>
          <Button
            type='link'
            disabled={!permissions?.relocationTasksCreate || !assigneeIsCurrentUser}
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
        <RelocationTaskList
          data={relocationTaskList}
          onClick={handleClickTask}
          onCreateAttachment={handleCreateAttachment}
        />
      </LoadingArea>
    </Space>
  )
}

export default RelocationTaskListTab
