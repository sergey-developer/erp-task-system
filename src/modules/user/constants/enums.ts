export enum UserRoleEnum {
  FirstLineSupport = 'FIRST_LINE_SUPPORT',
  Engineer = 'ENGINEER',
  SeniorEngineer = 'SENIOR_ENGINEER',
  HeadOfDepartment = 'HEAD_OF_DEPARTMENT',
}

//todo: reuse everywhere
export enum UserPermissionsEnum {
  WarehouseReportsRead = 'WAREHOUSE_REPORTS_READ',

  RelocationTasksRead = 'RELOCATION_TASKS_READ',
  RelocationTasksCreate = 'RELOCATION_TASKS_CREATE',
  RelocationTasksUpdate = 'RELOCATION_TASKS_UPDATE',

  EquipmentsRead = 'EQUIPMENTS_READ',
  EquipmentsCreate = 'EQUIPMENTS_CREATE',
  EquipmentsDelete = 'EQUIPMENTS_DELETE',
  EquipmentsUpdate = 'EQUIPMENTS_UPDATE',

  NomenclatureGroupsRead = 'NOMENCLATURE_GROUPS_READ',
  NomenclatureGroupsCreate = 'NOMENCLATURE_GROUPS_CREATE',
  NomenclatureGroupsDelete = 'NOMENCLATURE_GROUPS_DELETE',
  NomenclatureGroupsUpdate = 'NOMENCLATURE_GROUPS_UPDATE',

  NomenclaturesRead = 'NOMENCLATURES_READ',
  NomenclaturesCreate = 'NOMENCLATURES_CREATE',
  NomenclaturesDelete = 'NOMENCLATURES_DELETE',
  NomenclaturesUpdate = 'NOMENCLATURES_UPDATE',
}
