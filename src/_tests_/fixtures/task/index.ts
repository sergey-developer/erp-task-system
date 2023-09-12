import * as assignee from './assignee'
import * as attachment from './attachment'
import * as comment from './comment'
import * as counters from './counters'
import * as fiscalAccumulatorList from './fiscalAccumulatorList'
import * as journal from './journal'
import * as reclassificationRequest from './reclassificationRequest'
import * as subTask from './subTask'
import * as supportGroup from './supportGroup'
import * as suspendRequest from './suspendRequest'
import * as task from './task'
import * as workGroup from './workGroup'

const taskFixtures = {
  ...task,
  ...counters,
  ...subTask,
  ...comment,
  ...attachment,
  ...assignee,
  ...workGroup,
  ...journal,
  ...reclassificationRequest,
  ...suspendRequest,
  ...supportGroup,
  ...fiscalAccumulatorList,
} as const

export default taskFixtures
