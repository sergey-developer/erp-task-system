export enum TasksUpdateVariants {
  AutoUpdate1M = 'AutoUpdate1M',
}

export const tasksUpdateVariantsIntervals: Record<TasksUpdateVariants, number> = {
  [TasksUpdateVariants.AutoUpdate1M]: 60000,
}
