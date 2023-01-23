import * as assignee from './assignee'
import * as comment from './comment'
import * as counters from './counters'
import * as journal from './journal'
import * as reclassificationRequest from './reclassificationRequest'
import * as suspendRequest from './suspendRequest'
import * as task from './task'
import * as taskList from './taskList'
import * as taskTable from './taskTable'
import * as workGroup from './workGroup'

const taskFixtures = {
  ...task,
  ...taskList,
  ...counters,
  ...taskTable,
  ...comment,
  ...assignee,
  ...workGroup,
  ...journal,
  ...reclassificationRequest,
  ...suspendRequest,
}

export default taskFixtures
