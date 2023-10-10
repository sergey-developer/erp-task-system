export enum RelocationTaskApiEnum {
  GetRelocationTask = '/relocation-tasks/:id/',
  GetRelocationTaskWaybillM15 = '/relocation-tasks/:id/m-15/',

  CreateRelocationTask = '/relocation-tasks/',
  UpdateRelocationTask = '/relocation-tasks/:id/',
  GetRelocationTaskList = '/relocation-tasks/',

  GetRelocationEquipmentList = '/relocation-tasks/:id/equipments/',
  GetRelocationEquipmentBalanceList = '/relocation-tasks/:id/equipments/balance/',
}
