import * as supportGroup from './supportGroup'
import * as task from './task'
import * as taskAssignee from './taskAssignee'
import * as taskComment from './taskComment'
import * as taskCounters from './taskCounters'
import * as taskJournal from './taskJournal'
import * as taskList from './taskList'
import * as taskReclassificationRequest from './taskReclassificationRequest'
import * as taskTable from './taskTable'
import * as taskWorkGroup from './taskWorkGroup'

export const taskFixtures = {
  ...task,
  ...taskList,
  ...taskCounters,
  ...taskTable,
  ...taskComment,
  ...taskAssignee,
  ...taskWorkGroup,
  ...supportGroup,
  ...taskJournal,
  ...taskReclassificationRequest,
}
