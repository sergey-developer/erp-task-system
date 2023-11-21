import { TabsProps } from 'antd'
import pick from 'lodash/pick'
import React, { FC } from 'react'

import { taskCardTabNamesDict, TaskCardTabsEnum } from 'modules/task/constants/task'
import { TaskModel } from 'modules/task/models'
import { useMatchUserPermissions } from 'modules/user/hooks'

import Spinner from 'components/Spinner'

import TaskCardWrapper from '../TaskCard/TaskCardWrapper'
import DescriptionTab from './DescriptionTab'
import ResolutionTab from './ResolutionTab'
import { TabsStyled } from './styles'

const JournalTab = React.lazy(() => import('./JournalTab'))
const CommentListTab = React.lazy(() => import('./CommentListTab'))
const SubTaskListTab = React.lazy(() => import('./SubTaskListTab'))
const RelocationTaskListTab = React.lazy(() => import('./RelocationTaskListTab'))

export type CardTabsProps = {
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
  >

  activeTab?: TaskCardTabsEnum
}

const CardTabs: FC<CardTabsProps> = ({ task, activeTab = TaskCardTabsEnum.Description }) => {
  const userPermissions = useMatchUserPermissions(['RELOCATION_TASKS_READ'])

  const tabsItems: TabsProps['items'] = [
    {
      key: TaskCardTabsEnum.Description,
      label: taskCardTabNamesDict[TaskCardTabsEnum.Description],
      children: (
        <TaskCardWrapper>
          <DescriptionTab
            title={taskCardTabNamesDict[TaskCardTabsEnum.Description]}
            taskTitle={task.title}
            description={task.description}
            attachments={task.attachments}
          />
        </TaskCardWrapper>
      ),
    },
    {
      key: TaskCardTabsEnum.CommentList,
      label: taskCardTabNamesDict[TaskCardTabsEnum.CommentList],
      children: (
        <TaskCardWrapper>
          <React.Suspense fallback={<Spinner />}>
            <CommentListTab
              title={taskCardTabNamesDict[TaskCardTabsEnum.CommentList]}
              taskId={task.id}
            />
          </React.Suspense>
        </TaskCardWrapper>
      ),
    },
    {
      key: TaskCardTabsEnum.Resolution,
      label: taskCardTabNamesDict[TaskCardTabsEnum.Resolution],
      children: (
        <TaskCardWrapper>
          <ResolutionTab
            title={taskCardTabNamesDict[TaskCardTabsEnum.Resolution]}
            type={task.type}
            techResolution={task.techResolution}
            userResolution={task.userResolution}
            attachments={task.resolution.attachments}
          />
        </TaskCardWrapper>
      ),
    },
    {
      key: TaskCardTabsEnum.Journal,
      label: taskCardTabNamesDict[TaskCardTabsEnum.Journal],
      children: (
        <TaskCardWrapper>
          <React.Suspense fallback={<Spinner />}>
            <JournalTab taskId={task.id} />
          </React.Suspense>
        </TaskCardWrapper>
      ),
    },
    {
      key: TaskCardTabsEnum.SubTaskList,
      label: taskCardTabNamesDict[TaskCardTabsEnum.SubTaskList],
      children: (
        <TaskCardWrapper>
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
        </TaskCardWrapper>
      ),
    },
    ...(userPermissions?.relocationTasksRead
      ? [
          {
            key: TaskCardTabsEnum.RelocationTaskList,
            label: taskCardTabNamesDict[TaskCardTabsEnum.RelocationTaskList],
            children: (
              <TaskCardWrapper>
                <React.Suspense fallback={<Spinner />}>
                  <RelocationTaskListTab taskId={task.id} taskAssignee={task.assignee} />
                </React.Suspense>
              </TaskCardWrapper>
            ),
          },
        ]
      : []),
  ]

  return (
    <TabsStyled
      data-testid='task-card-tabs'
      defaultActiveKey={activeTab}
      type='card'
      items={tabsItems}
    />
  )
}

export default CardTabs
