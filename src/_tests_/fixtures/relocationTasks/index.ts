import * as relocationTaskAttachmentDetail from './relocationTaskAttachmentDetail'
import * as relocationTask from './relocationTaskDetail'
import * as relocationTasks from './relocationTasks'

const relocationTasksFixtures = {
  ...relocationTask,
  ...relocationTasks,
  ...relocationTaskAttachmentDetail,
} as const

export default relocationTasksFixtures
