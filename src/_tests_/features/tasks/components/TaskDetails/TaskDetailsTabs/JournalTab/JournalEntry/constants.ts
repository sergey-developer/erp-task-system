import { TaskJournalSourceEnum, TaskJournalTypeEnum } from 'features/tasks/api/constants'
import { JournalEntryProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/JournalTab/JournalEntry'

import taskFixtures from '_tests_/fixtures/tasks/index'
import { fakeDateString, fakeId, fakeWord } from '_tests_/helpers'

export const props: Readonly<JournalEntryProps> = {
  id: fakeId(),
  type: TaskJournalTypeEnum.StatusChange,
  createdAt: fakeDateString(),
  description: fakeWord(),
  sourceSystem: TaskJournalSourceEnum.X5,
  author: fakeWord(),
  attachments: [taskFixtures.attachment()],
}
