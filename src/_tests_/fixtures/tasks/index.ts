import * as subTask from './subTask'
import * as task from './task'
import * as taskAssignee from './taskAssignee'
import * as taskAttachment from './taskAttachment'
import * as taskComment from './taskComment'
import * as taskCounters from './taskCounters'
import * as taskJournal from './taskJournal'
import * as taskReclassificationRequest from './taskReclassificationRequest'
import * as taskRegistrationRequestRecipientsFN from './taskRegistrationRequestRecipientsFN'
import * as taskSupportGroup from './taskSupportGroup'
import * as taskSuspendRequest from './taskSuspendRequest'
import * as taskWorkGroup from './taskWorkGroup'
import * as tasks from './tasks'
import * as tasksTable from './tasksTable'

const tasksFixtures = {
  ...task,
  ...tasks,
  ...tasksTable,
  ...taskCounters,
  ...subTask,
  ...taskComment,
  ...taskAttachment,
  ...taskAssignee,
  ...taskWorkGroup,
  ...taskJournal,
  ...taskReclassificationRequest,
  ...taskSuspendRequest,
  ...taskSupportGroup,
  ...taskRegistrationRequestRecipientsFN,
} as const

export default tasksFixtures
