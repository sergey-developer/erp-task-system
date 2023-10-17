export enum RelocationTaskApiEnum {
  GetRelocationTask = '/relocation-tasks/:id/',
  ExecuteRelocationTask = '/relocation-tasks/:id/complete/',
  GetRelocationTaskWaybillM15 = '/relocation-tasks/:id/m-15/',

  GetRelocationTaskList = '/relocation-tasks/',

  GetRelocationEquipmentList = '/relocation-tasks/:id/equipments/',
}

export enum RelocationTaskApiTagEnum {
  RelocationTask = 'RelocationTask',
}
