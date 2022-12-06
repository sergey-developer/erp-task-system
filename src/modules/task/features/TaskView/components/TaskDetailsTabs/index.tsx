import { Tabs } from 'antd'
import React, { FC } from 'react'

import Spinner from 'components/Spinner'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

import DetailsWrapper from '../TaskDetails/DetailsWrapper'
import { TaskDetailsTabsEnum, taskDetailsTabNamesDict } from './constants'
import DescriptionTab from './DescriptionTab'
import ResolutionTab from './ResolutionTab'

const JournalTab = React.lazy(() => import('./JournalTab'))
const CommentListTab = React.lazy(() => import('./CommentListTab'))

const { TabPane } = Tabs

export type TaskDetailsTabsProps = {
  details: Pick<
    TaskDetailsModel,
    'id' | 'description' | 'userResolution' | 'techResolution' | 'type'
  >
}

const TaskDetailsTabs: FC<TaskDetailsTabsProps> = ({ details }) => {
  return (
    <Tabs
      data-testid='task-details-tabs'
      defaultActiveKey={TaskDetailsTabsEnum.Description}
      type='card'
    >
      <TabPane
        tab={taskDetailsTabNamesDict[TaskDetailsTabsEnum.Description]}
        key={TaskDetailsTabsEnum.Description}
      >
        <DetailsWrapper>
          <DescriptionTab
            title={taskDetailsTabNamesDict[TaskDetailsTabsEnum.Description]}
            description={details.description}
          />
        </DetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNamesDict[TaskDetailsTabsEnum.CommentList]}
        key={TaskDetailsTabsEnum.CommentList}
      >
        <DetailsWrapper>
          <React.Suspense fallback={<Spinner />}>
            <CommentListTab
              title={taskDetailsTabNamesDict[TaskDetailsTabsEnum.CommentList]}
              taskId={details.id}
            />
          </React.Suspense>
        </DetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNamesDict[TaskDetailsTabsEnum.Resolution]}
        key={TaskDetailsTabsEnum.Resolution}
      >
        <DetailsWrapper>
          <ResolutionTab
            type={details.type}
            title={taskDetailsTabNamesDict[TaskDetailsTabsEnum.Resolution]}
            techResolution={details.techResolution}
            userResolution={details.userResolution}
          />
        </DetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNamesDict[TaskDetailsTabsEnum.Journal]}
        key={TaskDetailsTabsEnum.Journal}
      >
        <DetailsWrapper>
          <React.Suspense fallback={<Spinner />}>
            <JournalTab taskId={details.id} />
          </React.Suspense>
        </DetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNamesDict[TaskDetailsTabsEnum.TaskList]}
        key={TaskDetailsTabsEnum.TaskList}
      >
        <DetailsWrapper>
          <span>Задания</span>
        </DetailsWrapper>
      </TabPane>
    </Tabs>
  )
}

export default TaskDetailsTabs
