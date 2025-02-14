export enum ReportsApiPathsEnum {
  GetEmployeesActionsReport = '/reports/employees/:id/relocation-equipments',

  GetAmountEquipmentSpentReport = '/reports/relocation-tasks/equipments/',

  GetHistoryNomenclatureOperationsReport = '/reports/nomenclatures/:id/equipments',

  GetInventorizationReport = '/reports/inventorizations/:inventorizationId',

  GetMacroregionsMtsrReport = '/reports/mtsr/macroregions/',
  GetSupportGroupsMtsrReport = '/reports/mtsr/support-groups/',
  GetWorkGroupsMtsrReport = '/reports/mtsr/work-groups/',
  GetUsersMtsrReport = '/reports/mtsr/users/',

  GetFiscalAccumulatorTasksReport = '/fiscal-accumulator/',
}
