import { TaskDetailsModel } from 'modules/tasks/taskView/models'

export type AddTaskSolutionFormFields = {
  solutionForUser: TaskDetailsModel['userResolution']
  technicalSolution: TaskDetailsModel['techResolution']
}
