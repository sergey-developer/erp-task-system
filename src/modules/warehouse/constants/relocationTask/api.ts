export enum RelocationTaskApiEnum {
  GetRelocationTask = '/relocation-tasks/:id/',
  ExecuteRelocationTask = '/relocation-tasks/:id/complete/',
  GetRelocationTaskWaybillM15 = '/relocation-tasks/:id/m-15/',

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
