export enum RelocationTaskApiEnum {
  GetRelocationTask = '/relocation-tasks/:id/',
  CloseRelocationTask = '/relocation-tasks/:id/close/',
  ReturnRelocationTaskToRework = '/relocation-tasks/:id/revision/',
  CancelRelocationTask = '/relocation-tasks/:id/cancel/',
  ExecuteRelocationTask = '/relocation-tasks/:id/complete/',
  GetRelocationTaskWaybillM15 = '/relocation-tasks/:id/m-15/',

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
