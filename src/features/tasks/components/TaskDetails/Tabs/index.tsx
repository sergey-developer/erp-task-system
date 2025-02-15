import { TabsProps as AntdTabsProps } from 'antd'
import { taskDetailsTabNameDict, TaskDetailsTabsEnum } from 'features/tasks/constants'
import { TaskDetailDTO } from 'features/tasks/api/dto'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { UserActionsDTO } from 'features/users/api/dto'
import { useUserPermissions } from 'features/users/hooks'
import pick from 'lodash/pick'
import React, { FC } from 'react'

import Spinner from 'components/Spinner'

import DescriptionTab from './DescriptionTab'
import ResolutionTab from './ResolutionTab'
import { TabsStyled } from './styles'

const JournalTab = React.lazy(() => import('./JournalTab'))
const CommentsTab = React.lazy(() => import('./CommentsTab'))
const SubTaskListTab = React.lazy(() => import('./SubTaskListTab'))
const RelocationTasksTab = React.lazy(() => import('./RelocationTasksTab'))

export type TabsProps = {
  task: Pick<
    TaskDetailDTO,
    | 'id'
    | 'title'
    | 'description'
    | 'userResolution'
    | 'techResolution'
    | 'type'
    | 'status'
    | 'extendedStatus'
    | 'assignee'
    | 'recordId'
    | 'suspendRequest'
    | 'resolution'
    | 'attachments'
    | 'olaNextBreachTime'
    | 'olaEstimatedTime'
    | 'olaStatus'
    | 'shop'
    | 'isDescriptionChanged'
    | 'previousDescription'
  >
  userActions: UserActionsDTO
  activeTab?: TaskDetailsTabsEnum
}

const Tabs: FC<TabsProps> = ({
  task,
  activeTab = TaskDetailsTabsEnum.Description,
  userActions,
}) => {
  const permissions = useUserPermissions([
    UserPermissionsEnum.RelocationTasksRead,
    UserPermissionsEnum.TaskHistoryDescriptionRead,
    UserPermissionsEnum.TaskHistoryDescriptionUpdate,
    UserPermissionsEnum.AnySubtasksDelete,
    UserPermissionsEnum.AnySubtasksRework,
  ])

  const tabsItems: AntdTabsProps['items'] = [
    {
      key: TaskDetailsTabsEnum.Description,
      label: taskDetailsTabNameDict[TaskDetailsTabsEnum.Description],
      children: permissions && (
        <DescriptionTab
          permissions={permissions}
          title={taskDetailsTabNameDict[TaskDetailsTabsEnum.Description]}
          taskTitle={task.title}
          description={task.description}
          previousDescription={task.previousDescription}
          isDescriptionChanged={task.isDescriptionChanged}
          attachments={task.attachments}
        />
      ),
    },
    {
      key: TaskDetailsTabsEnum.Comments,
      label: taskDetailsTabNameDict[TaskDetailsTabsEnum.Comments],
      children: (
        <React.Suspense fallback={<Spinner tip='Загрузка вкладки комментариев' />}>
          <CommentsTab
            title={taskDetailsTabNameDict[TaskDetailsTabsEnum.Comments]}
            taskId={task.id}
          />
        </React.Suspense>
      ),
    },
    {
      key: TaskDetailsTabsEnum.Resolution,
      label: taskDetailsTabNameDict[TaskDetailsTabsEnum.Resolution],
      children: (
        <ResolutionTab
          title={taskDetailsTabNameDict[TaskDetailsTabsEnum.Resolution]}
          type={task.type}
          techResolution={task.techResolution}
          userResolution={task.userResolution}
          attachments={task.resolution.attachments}
        />
      ),
    },
    {
      key: TaskDetailsTabsEnum.Journal,
      label: taskDetailsTabNameDict[TaskDetailsTabsEnum.Journal],
      children: (
        <React.Suspense fallback={<Spinner tip='Загрузка вкладки журнала' />}>
          <JournalTab taskId={task.id} />
        </React.Suspense>
      ),
    },
    {
      key: TaskDetailsTabsEnum.SubTaskList,
      label: taskDetailsTabNameDict[TaskDetailsTabsEnum.SubTaskList],
      children: (
        <React.Suspense fallback={<Spinner tip='Загрузка вкладки задач заявок' />}>
          <SubTaskListTab
            task={pick(
              task,
              'id',
              'assignee',
              'status',
              'extendedStatus',
              'type',
              'recordId',
              'title',
              'description',
              'suspendRequest',
            )}
            userActions={userActions}
            permissions={permissions}
          />
        </React.Suspense>
      ),
    },
    ...(permissions.relocationTasksRead
      ? [
          {
            key: TaskDetailsTabsEnum.RelocationTasks,
            label: taskDetailsTabNameDict[TaskDetailsTabsEnum.RelocationTasks],
            children: (
              <React.Suspense fallback={<Spinner tip='Загрузка вкладки заявок на перемещение' />}>
                <RelocationTasksTab
                  task={pick(
                    task,
                    'id',
                    'assignee',
                    'recordId',
                    'olaNextBreachTime',
                    'olaEstimatedTime',
                    'olaStatus',
                    'shop',
                  )}
                />
              </React.Suspense>
            ),
          },
        ]
      : []),
  ]

  return (
    <TabsStyled
      data-testid='task-details-tabs'
      defaultActiveKey={activeTab}
      type='card'
      items={tabsItems}
    />
  )
}

export default Tabs
