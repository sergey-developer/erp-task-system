export enum RelocationTaskApiEnum {
  GetRelocationTask = '/relocation-tasks/:id/',
  ReturnRelocationTaskToRework = '/relocation-tasks/:id/revision/',
  ExecuteRelocationTask = '/relocation-tasks/:id/complete/',
  CancelRelocationTask = '/relocation-tasks/:id/cancel/',
  CloseRelocationTask = '/relocation-tasks/:id/close/',
  GetRelocationTaskWaybillM15 = '/relocation-tasks/:id/m-15/',
  GetRelocationTaskAttachments = '/relocation-tasks/:id/attachments/',
  CreateRelocationTaskAttachment = '/relocation-tasks/:id/attachments/',
  CreateRelocationTaskITSM = '/relocation-tasks/itsm/',
  CreateRelocationTask = '/relocation-tasks/',
  UpdateRelocationTask = '/relocation-tasks/:id/',

  GetRelocationTaskList = '/relocation-tasks/',

  GetRelocationEquipmentList = '/relocation-tasks/:id/equipments/',
  GetRelocationEquipmentBalanceList = '/relocation-tasks/:id/equipments/balance/',
}

export enum RelocationTaskApiTagEnum {
  RelocationTask = 'RelocationTask',
  RelocationEquipmentList = 'RelocationEquipmentList',
}

export enum RelocationTaskApiTriggerEnum {
  GetRelocationTask = 'getRelocationTask',
}
