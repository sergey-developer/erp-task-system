export enum UserRoleEnum {
  FirstLineSupport = 'FIRST_LINE_SUPPORT',
  Engineer = 'ENGINEER',
  SeniorEngineer = 'SENIOR_ENGINEER',
  HeadOfDepartment = 'HEAD_OF_DEPARTMENT',
}

export const userRoleDict: Record<UserRoleEnum, string> = {
  [UserRoleEnum.FirstLineSupport]: 'Специалист первой линии поддержки',
  [UserRoleEnum.Engineer]: 'Инженер',
  [UserRoleEnum.SeniorEngineer]: 'Старший инженер',
  [UserRoleEnum.HeadOfDepartment]: 'Начальник отдела',
}
