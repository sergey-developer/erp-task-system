import { FastFilterEnum, fastFilterNamesDict } from 'modules/task/constants/task'
import { UserRoleEnum } from 'modules/user/constants'

export type FastFilterConfig = {
  filter: FastFilterEnum
  text: string
  roles: UserRoleEnum[]
}

/* Последовательность имеет значение */
export const fastFiltersConfig: FastFilterConfig[] = [
  {
    filter: FastFilterEnum.FirstLine,
    roles: [UserRoleEnum.FirstLineSupport],
    text: fastFilterNamesDict[FastFilterEnum.FirstLine],
  },
  {
    filter: FastFilterEnum.SecondLine,
    roles: [UserRoleEnum.FirstLineSupport],
    text: fastFilterNamesDict[FastFilterEnum.SecondLine],
  },
  {
    filter: FastFilterEnum.All,
    roles: [
      UserRoleEnum.FirstLineSupport,
      UserRoleEnum.Engineer,
      UserRoleEnum.SeniorEngineer,
      UserRoleEnum.HeadOfDepartment,
    ],
    text: fastFilterNamesDict[FastFilterEnum.All],
  },
  {
    filter: FastFilterEnum.Mine,
    roles: [
      UserRoleEnum.FirstLineSupport,
      UserRoleEnum.Engineer,
      UserRoleEnum.SeniorEngineer,
      UserRoleEnum.HeadOfDepartment,
    ],
    text: fastFilterNamesDict[FastFilterEnum.Mine],
  },
  {
    filter: FastFilterEnum.Free,
    roles: [
      UserRoleEnum.FirstLineSupport,
      UserRoleEnum.Engineer,
      UserRoleEnum.SeniorEngineer,
      UserRoleEnum.HeadOfDepartment,
    ],
    text: fastFilterNamesDict[FastFilterEnum.Free],
  },
  {
    filter: FastFilterEnum.LessThreeHours,
    roles: [
      UserRoleEnum.FirstLineSupport,
      UserRoleEnum.Engineer,
      UserRoleEnum.SeniorEngineer,
      UserRoleEnum.HeadOfDepartment,
    ],
    text: fastFilterNamesDict[FastFilterEnum.LessThreeHours],
  },
  {
    filter: FastFilterEnum.LessOneHour,
    roles: [
      UserRoleEnum.FirstLineSupport,
      UserRoleEnum.Engineer,
      UserRoleEnum.SeniorEngineer,
      UserRoleEnum.HeadOfDepartment,
    ],
    text: fastFilterNamesDict[FastFilterEnum.LessOneHour],
  },
  {
    filter: FastFilterEnum.Overdue,
    roles: [
      UserRoleEnum.FirstLineSupport,
      UserRoleEnum.Engineer,
      UserRoleEnum.SeniorEngineer,
      UserRoleEnum.HeadOfDepartment,
    ],
    text: fastFilterNamesDict[FastFilterEnum.Overdue],
  },
  {
    filter: FastFilterEnum.Returned,
    roles: [
      UserRoleEnum.FirstLineSupport,
      UserRoleEnum.Engineer,
      UserRoleEnum.SeniorEngineer,
      UserRoleEnum.HeadOfDepartment,
    ],
    text: fastFilterNamesDict[FastFilterEnum.Returned],
  },
  {
    filter: FastFilterEnum.ReclassificationDenied,
    roles: [
      UserRoleEnum.FirstLineSupport,
      UserRoleEnum.Engineer,
      UserRoleEnum.SeniorEngineer,
      UserRoleEnum.HeadOfDepartment,
    ],
    text: fastFilterNamesDict[FastFilterEnum.ReclassificationDenied],
  },
]
