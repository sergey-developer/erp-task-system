import * as assignee from './assignee'
import * as comment from './comment'
import * as counters from './counters'
import * as journal from './journal'
import * as list from './list'
import * as reclassificationRequest from './reclassificationRequest'
import * as table from './table'
import * as task from './task'
import * as workGroup from './workGroup'

const taskFixtures = {
  ...task,
  ...assignee,
  ...comment,
  ...counters,
  ...journal,
  ...list,
  ...reclassificationRequest,
  ...table,
  ...workGroup,
}

export default taskFixtures
