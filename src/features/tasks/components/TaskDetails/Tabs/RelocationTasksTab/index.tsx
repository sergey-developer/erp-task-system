import { Button, Col, Row, Typography } from 'antd'
import { useIdBelongAuthUser } from 'features/auth/hooks'
import { makeRelocationTasksPageLink } from 'features/relocationTasks/api/helpers'
import { RelocationTaskStatusEnum } from 'features/relocationTasks/constants'
import {
  useCreateRelocationTaskAttachment,
  useGetRelocationTasks,
  useNavigateToCreateRelocationTaskSimplifiedPage,
} from 'features/relocationTasks/hooks'
import RelocationTasks from 'features/tasks/components/RelocationTasks'
import { RelocationTasksProps } from 'features/tasks/components/RelocationTasks/types'
import { TaskDetailsTabsEnum } from 'features/tasks/constants'
import { makeGetTasksPageLink } from 'features/tasks/helpers'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { useUserPermissions } from 'features/users/hooks'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import pick from 'lodash/pick'
import React, { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { IdType } from 'shared/types/common'
import { getTextWithCounter } from 'shared/utils/common'
import { extractPaginationResults } from 'shared/utils/pagination'

import { RelocationTasksTabProps } from './types'

const { Title } = Typography

const RelocationTasksTab: FC<RelocationTasksTabProps> = ({ task }) => {
  const navigate = useNavigate()

  const permissions = useUserPermissions([UserPermissionsEnum.RelocationTasksCreate])
  const assigneeIsCurrentUser = useIdBelongAuthUser(task.assignee?.id)

  const [createRelocationTaskAttachment] = useCreateRelocationTaskAttachment()

  const { currentData: paginatedRelocationTasks, isFetching: relocationTasksIsFetching } =
    useGetRelocationTasks({
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

  const relocationTasks = extractPaginationResults(paginatedRelocationTasks)

  const onClickTask = useCallback(
    (id: IdType) => navigate(makeRelocationTasksPageLink({ viewRelocationTask: id })),
    [navigate],
  )

  const onClickCreate = useNavigateToCreateRelocationTaskSimplifiedPage({
    task,
    from: makeGetTasksPageLink({
      viewTask: task.id,
      tab: TaskDetailsTabsEnum.RelocationTasks,
    }),
  })

  const onClickCreateDocumentsPackage = () =>
    // todo: формировать state через функцию как сделано например для создания черновика заявки на перемещение
    navigate(WarehousesRoutesEnum.CreateDocumentsPackage, {
      state: {
        task: pick(task, 'id', 'recordId'),
        from: makeGetTasksPageLink({
          viewTask: task.id,
          tab: TaskDetailsTabsEnum.RelocationTasks,
        }),
      },
    })

  const onCreateAttachment = useCallback<RelocationTasksProps['onCreateAttachment']>(
    (id) => async (options) => {
      await createRelocationTaskAttachment({ relocationTaskId: id }, options)
    },
    [createRelocationTaskAttachment],
  )

  return (
    <Space data-testid='relocation-tasks-tab' size='middle' direction='vertical' $block>
      <Row justify='space-between'>
        <Col>
          <Title level={5}>{getTextWithCounter('Перемещения', relocationTasks)}</Title>
        </Col>

        <Col>
          <Space direction='vertical'>
            <Button type='link' onClick={onClickCreateDocumentsPackage}>
              Сформировать пакет документов
            </Button>

            <Button
              type='link'
              disabled={!permissions.relocationTasksCreate || !assigneeIsCurrentUser}
              onClick={onClickCreate}
            >
              Создать новое перемещение
            </Button>
          </Space>
        </Col>
      </Row>

      <LoadingArea data-testid='relocation-tasks-loading' isLoading={relocationTasksIsFetching}>
        <RelocationTasks
          data={relocationTasks}
          onClick={onClickTask}
          onCreateAttachment={onCreateAttachment}
        />
      </LoadingArea>
    </Space>
  )
}

export default RelocationTasksTab
