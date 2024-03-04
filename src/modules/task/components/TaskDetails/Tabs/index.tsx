import { TabsProps as AntdTabsProps } from 'antd'
import pick from 'lodash/pick'
import React, { FC } from 'react'

import { taskDetailsTabNameDict, TaskDetailsTabsEnum } from 'modules/task/constants/task'
import { TaskModel } from 'modules/task/models'
import { useMatchUserPermissions } from 'modules/user/hooks'

import Spinner from 'components/Spinner'

import DescriptionTab from './DescriptionTab'
import ResolutionTab from './ResolutionTab'
import { TabsStyled } from './styles'

const JournalTab = React.lazy(() => import('./JournalTab'))
const CommentListTab = React.lazy(() => import('./CommentListTab'))
const SubTaskListTab = React.lazy(() => import('./SubTaskListTab'))
const RelocationTaskListTab = React.lazy(() => import('./RelocationTaskListTab'))

export type TabsProps = {
  task: Pick<
    TaskModel,
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
  >

  activeTab?: TaskDetailsTabsEnum
}

const Tabs: FC<TabsProps> = ({ task, activeTab = TaskDetailsTabsEnum.Description }) => {
  const permissions = useMatchUserPermissions(['RELOCATION_TASKS_READ'])

  const tabsItems: AntdTabsProps['items'] = [
    {
      key: TaskDetailsTabsEnum.Description,
      label: taskDetailsTabNameDict[TaskDetailsTabsEnum.Description],
      children: (
        <DescriptionTab
          title={taskDetailsTabNameDict[TaskDetailsTabsEnum.Description]}
          taskTitle={task.title}
          description={task.description}
          attachments={task.attachments}
        />
      ),
    },
    {
      key: TaskDetailsTabsEnum.CommentList,
      label: taskDetailsTabNameDict[TaskDetailsTabsEnum.CommentList],
      children: (
        <React.Suspense fallback={<Spinner />}>
          <CommentListTab
            title={taskDetailsTabNameDict[TaskDetailsTabsEnum.CommentList]}
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
        <React.Suspense fallback={<Spinner />}>
          <JournalTab taskId={task.id} />
        </React.Suspense>
      ),
    },
    {
      key: TaskDetailsTabsEnum.SubTaskList,
      label: taskDetailsTabNameDict[TaskDetailsTabsEnum.SubTaskList],
      children: (
        <React.Suspense fallback={<Spinner />}>
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
          />
        </React.Suspense>
      ),
    },
    ...(permissions?.relocationTasksRead
      ? [
          {
            key: TaskDetailsTabsEnum.RelocationTasks,
            label: taskDetailsTabNameDict[TaskDetailsTabsEnum.RelocationTasks],
            children: (
              <React.Suspense fallback={<Spinner />}>
                <RelocationTaskListTab
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
