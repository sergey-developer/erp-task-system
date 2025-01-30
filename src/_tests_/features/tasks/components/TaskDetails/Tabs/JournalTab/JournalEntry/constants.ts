import { JournalEntryProps } from 'features/task/components/TaskDetails/Tabs/JournalTab/JournalEntry'
import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'features/task/constants/taskJournal/index'

import taskFixtures from '_tests_/fixtures/task/index'
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
