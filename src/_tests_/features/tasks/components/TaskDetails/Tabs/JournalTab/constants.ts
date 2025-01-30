import { JournalTabProps } from 'features/task/components/TaskDetails/Tabs/JournalTab/index'

import { fakeId } from '_tests_/utils'

export const props: Readonly<JournalTabProps> = {
  taskId: fakeId(),
}

export enum TestIdsEnum {
  TaskJournal = 'task-journal',
  TypeFilterSelect = 'type-filter-select',
  JournalBtnDownload = 'journal-btn-download',
  TaskJournalLoading = 'task-journal-loading',
}
