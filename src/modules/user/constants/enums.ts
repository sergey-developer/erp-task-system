import { TaskActionsPermissionsEnum } from 'modules/task/constants/task'

export enum UserPermissionsEnum {
  WarehouseReportsRead = 'WAREHOUSE_REPORTS_READ',

  InternalTasksCreate = 'INTERNAL_TASKS_CREATE',

  RelocationTasksRead = 'RELOCATION_TASKS_READ',
  RelocationTasksCreate = 'RELOCATION_TASKS_CREATE',
  RelocationTasksUpdate = 'RELOCATION_TASKS_UPDATE',
  RelocationTasksDelete = 'RELOCATION_TASKS_DELETE',

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

  InventorizationRead = 'INVENTORIZATION_READ',
  InventorizationCreate = 'INVENTORIZATION_CREATE',
  InventorizationDelete = 'INVENTORIZATION_DELETE',
  InventorizationUpdate = 'INVENTORIZATION_UPDATE',
  CompletionDocumentsCreate = 'COMPLETION_DOCUMENTS_CREATE',
  FirstLineTasksRead = 'FIRST_LINE_TASKS_READ',
  SecondLineTasksRead = 'SECOND_LINE_TASKS_READ',
  WorkGroupTasksRead = 'WORK_GROUP_TASKS_READ',
  PutFirstLineTasksOnSecondLine = 'PUT_FIRST_LINE_TASKS_ON_SECOND_LINE',
  TasksAnyWorkGroupDelete = 'TASKS_ANY_WORK_GROUP_DELETE',
  TasksSelfWorkGroupDelete = 'TASKS_SELF_WORK_GROUP_DELETE',
  FirstLineReclassificationRequestsCreate = 'FIRST_LINE_RECLASSIFICATION_REQUESTS_CREATE',
  SecondLineReclassificationRequestsCreate = 'SECOND_LINE_RECLASSIFICATION_REQUESTS_CREATE',
  WorkGroupReclassificationRequestsCreate = 'WORK_GROUP_RECLASSIFICATION_REQUESTS_CREATE',
  FirstLineSuspendRequestsCreate = 'FIRST_LINE_SUSPEND_REQUESTS_CREATE',
  SecondLineSuspendRequestsCreate = 'SECOND_LINE_SUSPEND_REQUESTS_CREATE',
  WorkGroupSuspendRequestsCreate = 'WORK_GROUP_SUSPEND_REQUESTS_CREATE',
  SelfAssigneeTasksUpdate = 'SELF_ASSIGNEE_TASKS_UPDATE',
  AnyAssigneeTasksUpdate = 'ANY_ASSIGNEE_TASKS_UPDATE',
  FirstLineExecuteTasks = 'FIRST_LINE_EXECUTE_TASKS',
  SecondLineExecuteTasks = 'SECOND_LINE_EXECUTE_TASKS',
  WorkGroupExecuteTasks = 'WORK_GROUP_EXECUTE_TASKS',
  FirstLineResolveTasks = 'FIRST_LINE_RESOLVE_TASKS',
  SecondLineResolveTasks = 'SECOND_LINE_RESOLVE_TASKS',
  WorkGroupResolveTasks = 'WORK_GROUP_RESOLVE_TASKS',
  TasksCommentCreate = 'TASKS_COMMENT_CREATE',
  AssigneeSubtasksCreate = 'ASSIGNEE_SUBTASKS_CREATE',
  WorkGroupSubtasksCreate = 'WORK_GROUP_SUBTASKS_CREATE',
  FirstLineSubtasksCreate = 'FIRST_LINE_SUBTASKS_CREATE',
  SecondLineSubtasksCreate = 'SECOND_LINE_SUBTASKS_CREATE',
  AnySubtasksDelete = 'ANY_SUBTASKS_DELETE',
  AnySubtasksRework = 'ANY_SUBTASKS_REWORK',
  AnySupportGroupsRead = 'ANY_SUPPORT_GROUPS_READ',
  AnyMacroregionsRead = 'ANY_MACROREGIONS_READ',
  SelfWorkGroupsRead = 'SELF_WORK_GROUPS_READ',
  AnyWorkGroupsRead = 'ANY_WORK_GROUPS_READ',
  UsersShopsUpdate = 'USERS_SHOPS_UPDATE',
  SelfWorkGroupUpdate = 'SELF_WORK_GROUP_UPDATE',

  InfrastructureProjectLeading = 'INFRASTRUCTURE_PROJECT_LEADING',
  InfrastructureProjectRead = 'INFRASTRUCTURE_PROJECT_READ',
  AnyStatusInfrastructureProjectRead = 'ANY_STATUS_INFRASTRUCTURE_PROJECT_READ',

  ReadRecycledEquipment = 'READ_RECYCLED_EQUIPMENT',
  CreateEquipmentRecycle = 'CREATE_EQUIPMENT_RECYCLE',
  ApproveEquipmentRecycle = 'APPROVE_EQUIPMENT_RECYCLE',
  InfrastructureCoExecutorsAssignee = 'INFRASTRUCTURE_CO_EXECUTORS_ASSIGNEE',
  InfrastructurePrivateCommentRead = 'INFRASTUCTURE_PRIVATE_COMMENT_READ',
  InfrastructurePrivateCommentCreate = 'INFRASTUCTURE_PRIVATE_COMMENT_CREATE',

  EnteringBalances = 'ENTERING_BALANCES',

  FiscalAccumulatorTasksRead = 'FISCAL_ACCUMULATOR_TASKS_READ',

  ReportMainIndicatorsRead = 'REPORT_MAIN_INDICATORS_READ',

  ClassificationOfWorkTypes = 'CLASSIFICATION_OF_WORK_TYPES',
}

export type UserActionsPermissions = TaskActionsPermissionsEnum
