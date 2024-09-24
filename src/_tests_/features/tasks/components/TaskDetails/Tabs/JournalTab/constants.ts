import { JournalTabProps } from 'modules/task/components/TaskDetails/Tabs/JournalTab/index'

import { fakeId } from '_tests_/utils/index'

export const props: Readonly<JournalTabProps> = {
  taskId: fakeId(),
}

export enum TestIdsEnum {
  TaskJournal = 'task-journal',
  TypeFilterSelect = 'type-filter-select',
  JournalBtnDownload = 'journal-btn-download',
  TaskJournalLoading = 'task-journal-loading',
}
