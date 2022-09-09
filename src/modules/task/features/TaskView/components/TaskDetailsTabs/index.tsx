import { Tabs } from 'antd'
import React, { FC } from 'react'

import Spinner from 'components/Spinner'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

import DetailsWrapper from '../TaskDetails/DetailsWrapper'
import { TaskDetailsTabsEnum, taskDetailsTabNames } from './constants'
import Description from './Description'
import Resolution from './Resolution'

const Journal = React.lazy(() => import('./Journal'))
const CommentList = React.lazy(() => import('./CommentList'))

const { TabPane } = Tabs

type TaskDetailsTabsProps = {
  details: Pick<
    TaskDetailsModel,
    'id' | 'description' | 'type' | 'userResolution' | 'techResolution'
  >
  defaultTab: TaskDetailsTabsEnum
}

const TaskDetailsTabs: FC<TaskDetailsTabsProps> = ({ details, defaultTab }) => {
  return (
    <Tabs defaultActiveKey={defaultTab} type='card'>
      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Description]}
        key={TaskDetailsTabsEnum.Description}
      >
        <DetailsWrapper>
          <Description
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Description]}
            description={details.description}
          />
        </DetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Comments]}
        key={TaskDetailsTabsEnum.Comments}
      >
        <DetailsWrapper>
          <React.Suspense fallback={<Spinner />}>
            <CommentList
              title={taskDetailsTabNames[TaskDetailsTabsEnum.Comments]}
              taskId={details.id}
            />
          </React.Suspense>
        </DetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Resolution]}
        key={TaskDetailsTabsEnum.Resolution}
      >
        <DetailsWrapper>
          <Resolution
            type={details.type}
            title={taskDetailsTabNames[TaskDetailsTabsEnum.Resolution]}
            techResolution={details.techResolution}
            userResolution={details.userResolution}
          />
        </DetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Journal]}
        key={TaskDetailsTabsEnum.Journal}
      >
        <DetailsWrapper>
          <React.Suspense fallback={<Spinner />}>
            <Journal taskId={details.id} />
          </React.Suspense>
        </DetailsWrapper>
      </TabPane>

      <TabPane
        tab={taskDetailsTabNames[TaskDetailsTabsEnum.Tasks]}
        key={TaskDetailsTabsEnum.Tasks}
      >
        <DetailsWrapper>
          <span>Задания</span>
        </DetailsWrapper>
      </TabPane>
    </Tabs>
  )
}

export default TaskDetailsTabs
