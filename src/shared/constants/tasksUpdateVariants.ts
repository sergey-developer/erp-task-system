// todo: перенести в модуль tasks
export enum TasksUpdateVariantsEnum {
  AutoUpdate1M = 'AutoUpdate1M',
}

export const tasksUpdateVariantsIntervals: Record<TasksUpdateVariantsEnum, number> = {
  [TasksUpdateVariantsEnum.AutoUpdate1M]: 60000,
}
