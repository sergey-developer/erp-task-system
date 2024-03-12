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
  useNavigateToCreateRelocationTaskSimplifiedPage,
} from 'modules/warehouse/hooks/relocationTask'
import { getRelocationTasksPageLink } from 'modules/warehouse/utils/relocationTask'

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

  const onClickTask = useCallback(
    (id: IdType) => navigate(getRelocationTasksPageLink({ viewRelocationTask: id })),
    [navigate],
  )

  const onClickCreate = useNavigateToCreateRelocationTaskSimplifiedPage({
    task,
    from: getTaskListPageLink({
      viewTask: task.id,
      taskDetailsTab: TaskDetailsTabsEnum.RelocationTasks,
    }),
  })

  const onClickCreateDocumentsPackage = () =>
    navigate(WarehouseRouteEnum.CreateDocumentsPackage, {
      state: {
        task: pick(task, 'id', 'recordId'),
        from: getTaskListPageLink({
          viewTask: task.id,
          taskDetailsTab: TaskDetailsTabsEnum.RelocationTasks,
        }),
      },
    })

  const onCreateAttachment = useCallback<RelocationTaskListProps['onCreateAttachment']>(
    (id) => async (options) => {
      await createRelocationTaskAttachment({ relocationTaskId: id }, options)
    },
    [createRelocationTaskAttachment],
  )

  return (
    <Space data-testid='relocation-task-list-tab' size='middle' direction='vertical' $block>
      <Row justify='space-between'>
        <Col>
          <Title level={5}>{getTextWithCounter('Перемещения', relocationTaskList)}</Title>
        </Col>

        <Col>
          <Space direction='vertical'>
            <Button type='link' onClick={onClickCreateDocumentsPackage}>
              Сформировать пакет документов
            </Button>

            <Button
              type='link'
              disabled={!permissions?.relocationTasksCreate || !assigneeIsCurrentUser}
              onClick={onClickCreate}
            >
              Создать новое перемещение
            </Button>
          </Space>
        </Col>
      </Row>

      <LoadingArea
        data-testid='relocation-task-list-loading'
        isLoading={relocationTaskListIsFetching}
      >
        <RelocationTaskList
          data={relocationTaskList}
          onClick={onClickTask}
          onCreateAttachment={onCreateAttachment}
        />
      </LoadingArea>
    </Space>
  )
}

export default RelocationTaskListTab
