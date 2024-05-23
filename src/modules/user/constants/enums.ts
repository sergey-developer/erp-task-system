export enum UserRoleEnum {
  FirstLineSupport = 'FIRST_LINE_SUPPORT',
  Engineer = 'ENGINEER',
  SeniorEngineer = 'SENIOR_ENGINEER',
  HeadOfDepartment = 'HEAD_OF_DEPARTMENT',
}

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

  TaskInternalDescriptionUpdate = 'TASK_INTERNAL_DESCRIPTION_UPDATE',
  TaskHistoryDescriptionRead = 'TASK_HISTORY_DESCRIPTION_READ',
  TaskHistoryDescriptionUpdate = 'TASK_HISTORY_DESCRIPTION_UPDATE',
  TaskHistoryDeadlineRead = 'TASK_HISTORY_DEADLINE_READ',
  TaskHistoryDeadlineUpdate = 'TASK_HISTORY_DEADLINE_UPDATE',
  TaskInternalDeadlineUpdate = 'TASK_INTERNAL_DEADLINE_UPDATE',

  EnteringBalances = 'ENTERING_BALANCES',

  FiscalAccumulatorTasksRead = 'FISCAL_ACCUMULATOR_TASKS_READ',

  ReportMainIndicatorsRead = 'REPORT_MAIN_INDICATORS_READ',

  InventorizationRead = 'INVENTORIZATION_READ',
  InventorizationCreate = 'INVENTORIZATION_CREATE',
}
