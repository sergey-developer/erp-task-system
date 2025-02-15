export enum RelocationTasksApiPathsEnum {
  GetRelocationTasks = '/relocation-tasks/',
  CreateRelocationTask = '/relocation-tasks/',

  UpdateRelocationTask = '/relocation-tasks/:id',
  GetRelocationTask = '/relocation-tasks/:id',

  ReturnRelocationTaskToRework = '/relocation-tasks/:id/revision',
  ExecuteRelocationTask = '/relocation-tasks/:id/complete',
  CancelRelocationTask = '/relocation-tasks/:id/cancel',
  CloseRelocationTask = '/relocation-tasks/:id/close',
  GetRelocationTaskWaybillM15 = '/relocation-tasks/:id/m-15',
  GetRelocationTaskAttachments = '/relocation-tasks/:id/attachments',
  CreateRelocationTaskAttachment = '/relocation-tasks/:id/attachments',
  CreateRelocationTaskCompletionDocuments = '/relocation-tasks/:id/completion-documents',
  GetRelocationTaskCompletionDocuments = '/relocation-tasks/:id/completion-documents',
  MoveRelocationTaskDraftToWork = '/relocation-tasks/:id/start',

  GetRelocationEquipments = '/relocation-tasks/:relocationTaskId/equipments',
  GetRelocationEquipmentBalances = '/relocation-tasks/:relocationTaskId/equipments/balance',

  UpdateExternalRelocation = '/relocation-tasks/:relocationTaskId/external-relocation',

  CreateRelocationTaskITSM = '/relocation-tasks/itsm/',
}

export enum RelocationTasksEndpointsTagsEnum {
  RelocationTask = 'RelocationTask',
  RelocationEquipmentList = 'RelocationEquipmentList',
}

export enum RelocationTasksEndpointsNamesEnum {
  GetRelocationTask = 'getRelocationTask',
  GetRelocationTasks = 'getRelocationTasks',
}
