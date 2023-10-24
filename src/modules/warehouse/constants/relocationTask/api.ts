export enum RelocationTaskApiEnum {
  GetRelocationTask = '/relocation-tasks/:id/',
  CancelRelocationTask = '/relocation-tasks/:id/cancel/',
  GetRelocationTaskWaybillM15 = '/relocation-tasks/:id/m-15/',

  GetRelocationTaskList = '/relocation-tasks/',

  GetRelocationEquipmentList = '/relocation-tasks/:id/equipments/',
}

export enum RelocationTaskApiTriggerEnum {
  GetRelocationTask = 'getRelocationTask',
}
