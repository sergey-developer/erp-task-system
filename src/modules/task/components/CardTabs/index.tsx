import { TabsProps } from 'antd'
import React, { FC } from 'react'

import { TaskModel } from 'modules/task/models'
import { useMatchUserPermissions } from 'modules/user/hooks'

import Spinner from 'components/Spinner'

import TaskCardWrapper from '../TaskCard/TaskCardWrapper'
import DescriptionTab from './DescriptionTab'
import ResolutionTab from './ResolutionTab'
import { taskCardTabNamesDict, TaskCardTabsEnum } from './constants'
import { TabsStyled } from './styles'

const JournalTab = React.lazy(() => import('./JournalTab'))
const CommentListTab = React.lazy(() => import('./CommentListTab'))
const SubTaskListTab = React.lazy(() => import('./SubTaskListTab'))
const RelocationListTab = React.lazy(() => import('./RelocationListTab'))

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
}

const CardTabs: FC<CardTabsProps> = ({ task }) => {
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
            <SubTaskListTab task={task} />
          </React.Suspense>
        </TaskCardWrapper>
      ),
    },
    ...(userPermissions?.relocationTasksRead
      ? [
          {
            key: TaskCardTabsEnum.RelocationList,
            label: taskCardTabNamesDict[TaskCardTabsEnum.RelocationList],
            children: (
              <TaskCardWrapper>
                <React.Suspense fallback={<Spinner />}>
                  <RelocationListTab taskId={task.id} />
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
      defaultActiveKey={TaskCardTabsEnum.Description}
      type='card'
      destroyInactiveTabPane
      items={tabsItems}
    />
  )
}

export default CardTabs
