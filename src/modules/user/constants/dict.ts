import { UserRoleEnum } from './enums'

export const userRoleDict: Record<UserRoleEnum, string> = {
  [UserRoleEnum.FirstLineSupport]: 'Специалист первой линии поддержки',
  [UserRoleEnum.Engineer]: 'Инженер',
  [UserRoleEnum.SeniorEngineer]: 'Старший инженер',
  [UserRoleEnum.HeadOfDepartment]: 'Начальник отдела',
}
