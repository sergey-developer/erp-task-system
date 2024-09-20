import { FastFilterEnum, fastFilterNamesDict } from 'modules/task/constants/task'
import { MatchedUserPermissions } from 'modules/user/types'

export type FastFilterConfig = {
  filter: FastFilterEnum
  text: string
  canShow?: (permissions: MatchedUserPermissions) => boolean
}

/* Последовательность имеет значение */
export const fastFiltersConfig: FastFilterConfig[] = [
  {
    filter: FastFilterEnum.FirstLine,
    text: fastFilterNamesDict[FastFilterEnum.FirstLine],
    canShow: (permissions) =>
      Boolean(
        permissions.firstLineTasksRead &&
          (permissions.secondLineTasksRead || permissions.workGroupTasksRead),
      ),
  },
  {
    filter: FastFilterEnum.SecondLine,
    text: fastFilterNamesDict[FastFilterEnum.SecondLine],
    canShow: (permissions) =>
      Boolean(
        permissions.firstLineTasksRead &&
          (permissions.secondLineTasksRead || permissions.workGroupTasksRead),
      ),
  },
  {
    filter: FastFilterEnum.All,
    text: fastFilterNamesDict[FastFilterEnum.All],
  },
  {
    filter: FastFilterEnum.Mine,
    text: fastFilterNamesDict[FastFilterEnum.Mine],
  },
  {
    filter: FastFilterEnum.Free,
    text: fastFilterNamesDict[FastFilterEnum.Free],
  },
  {
    filter: FastFilterEnum.LessThreeHours,
    text: fastFilterNamesDict[FastFilterEnum.LessThreeHours],
  },
  {
    filter: FastFilterEnum.LessOneHour,
    text: fastFilterNamesDict[FastFilterEnum.LessOneHour],
  },
  {
    filter: FastFilterEnum.Overdue,
    text: fastFilterNamesDict[FastFilterEnum.Overdue],
  },
  {
    filter: FastFilterEnum.Returned,
    text: fastFilterNamesDict[FastFilterEnum.Returned],
  },
  {
    filter: FastFilterEnum.ReclassificationDenied,
    text: fastFilterNamesDict[FastFilterEnum.ReclassificationDenied],
  },
]
