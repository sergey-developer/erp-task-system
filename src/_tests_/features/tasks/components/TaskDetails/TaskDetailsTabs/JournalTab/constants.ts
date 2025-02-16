import { JournalTabProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/JournalTab/index'

import { fakeId } from '_tests_/helpers'

export const props: Readonly<JournalTabProps> = {
  taskId: fakeId(),
}

export enum TestIdsEnum {
  TaskJournal = 'task-journal',
  TypeFilterSelect = 'type-filter-select',
  JournalBtnDownload = 'journal-btn-download',
  TaskJournalLoading = 'task-journal-loading',
}
