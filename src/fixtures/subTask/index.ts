import * as subTask from './subTask'
import * as subTaskTemplate from './subTaskTemplate'

const subTaskFixtures = {
  ...subTask,
  ...subTaskTemplate,
} as const

export default subTaskFixtures
