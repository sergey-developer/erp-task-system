import { UserRoleEnum } from 'modules/user/constants/roles'

import { StringMap } from 'shared/interfaces/utils'

export enum FastFilterEnum {
  All = 'ALL',
  Free = 'FREE',
  Mine = 'MINE',
  Overdue = 'OVERDUE',
  FirstLine = 'FirstLine',
  SecondLine = 'SecondLine',
  LessOneHour = 'LessOneHour',
  LessThreeHour = 'LessThreeHour',
}

export const fastFilterNamesDict: StringMap<FastFilterEnum> = {
  [FastFilterEnum.All]: 'Все',
  [FastFilterEnum.Mine]: 'Мои',
  [FastFilterEnum.Overdue]: 'Просроченные',
  [FastFilterEnum.Free]: 'Свободные',
  [FastFilterEnum.FirstLine]: 'Первая линия',
  [FastFilterEnum.SecondLine]: 'Вторая линия',
  [FastFilterEnum.LessOneHour]: 'Менее 1 часа',
  [FastFilterEnum.LessThreeHour]: 'Менее 3-х часов',
}

export type FastFilterType = {
  filter: FastFilterEnum
  text: string
  roles: Array<UserRoleEnum>
}

/* sequence make sense */
export const fastFilters: Array<FastFilterType> = [
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
    filter: FastFilterEnum.LessThreeHour,
    roles: [
      UserRoleEnum.FirstLineSupport,
      UserRoleEnum.Engineer,
      UserRoleEnum.SeniorEngineer,
      UserRoleEnum.HeadOfDepartment,
    ],
    text: fastFilterNamesDict[FastFilterEnum.LessThreeHour],
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
]
