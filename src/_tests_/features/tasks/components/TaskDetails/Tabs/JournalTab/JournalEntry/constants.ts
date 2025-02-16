import { JournalEntryProps } from 'features/tasks/components/TaskDetails/Tabs/JournalTab/JournalEntry'
import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'features/tasks/constants/taskJournal/index'

import taskFixtures from '_tests_/fixtures/tasks/index'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const props: Readonly<JournalEntryProps> = {
  id: fakeId(),
  type: TaskJournalTypeEnum.StatusChange,
  createdAt: fakeDateString(),
  description: fakeWord(),
  sourceSystem: TaskJournalSourceEnum.X5,
  author: fakeWord(),
  attachments: [taskFixtures.attachment()],
}
