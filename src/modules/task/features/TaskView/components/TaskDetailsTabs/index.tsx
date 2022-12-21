import { Tabs } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'

import Spinner from 'components/Spinner'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

import TaskDetailsWrapper from '../TaskDetails/TaskDetailsWrapper'
import { TaskDetailsTabsEnum, taskDetailsTabNamesDict } from './constants'
import DescriptionTab from './DescriptionTab'
import ResolutionTab from './ResolutionTab'
import { TabsStyled } from './styles'

const JournalTab = React.lazy(() => import('./JournalTab'))
const CommentListTab = React.lazy(() => import('./CommentListTab'))
const SubTaskListTab = React.lazy(() => import('./SubTaskListTab'))

const { TabPane } = Tabs

export type TaskDetailsTabsProps = {
  details: Pick<
    TaskDetailsModel,
    | 'id'
    | 'title'
    | 'description'
    | 'userResolution'
    | 'techResolution'
    | 'type'
    | 'status'
    | 'assignee'
    | 'recordId'
  >
}

const TaskDetailsTabs: FC<TaskDetailsTabsProps> = ({ details }) => {
  const breakpoints = useBreakpoint()

  return (
    <TabsStyled
      data-testid='task-details-tabs'
      $breakpoints={breakpoints}
      defaultActiveKey={TaskDetailsTabsEnum.Description}
      type='card'
      destroyInactiveTabPane //todo: написать тесты
    >
      <TabPane
        tab={taskDetailsTabNamesDict[TaskDetailsTabsEnum.Description]}
        key={TaskDetailsTabsEnum.Description}
      >
        <TaskDetailsWrapper>
          <DescriptionTab
            title={taskDetailsTabNamesDict[TaskDetailsTabsEnum.Description]}
            description={details.description}
          />
        </TaskDetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNamesDict[TaskDetailsTabsEnum.CommentList]}
        key={TaskDetailsTabsEnum.CommentList}
      >
        <TaskDetailsWrapper>
          <React.Suspense fallback={<Spinner />}>
            <CommentListTab
              title={taskDetailsTabNamesDict[TaskDetailsTabsEnum.CommentList]}
              taskId={details.id}
            />
          </React.Suspense>
        </TaskDetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNamesDict[TaskDetailsTabsEnum.Resolution]}
        key={TaskDetailsTabsEnum.Resolution}
      >
        <TaskDetailsWrapper>
          <ResolutionTab
            type={details.type}
            title={taskDetailsTabNamesDict[TaskDetailsTabsEnum.Resolution]}
            techResolution={details.techResolution}
            userResolution={details.userResolution}
          />
        </TaskDetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNamesDict[TaskDetailsTabsEnum.Journal]}
        key={TaskDetailsTabsEnum.Journal}
      >
        <TaskDetailsWrapper>
          <React.Suspense fallback={<Spinner />}>
            <JournalTab taskId={details.id} />
          </React.Suspense>
        </TaskDetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNamesDict[TaskDetailsTabsEnum.SubTaskList]}
        key={TaskDetailsTabsEnum.SubTaskList}
      >
        <TaskDetailsWrapper>
          <React.Suspense fallback={<Spinner />}>
            <SubTaskListTab task={details} />
          </React.Suspense>
        </TaskDetailsWrapper>
      </TabPane>
    </TabsStyled>
  )
}

export default TaskDetailsTabs
