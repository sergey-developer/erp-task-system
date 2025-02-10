import { BudgetTypeEnum, InfrastructureStatusEnum } from '../api/constants'

export const infrastructureStatusDict: Record<InfrastructureStatusEnum, string> = {
  [InfrastructureStatusEnum.New]: 'Новая',
  [InfrastructureStatusEnum.OrderDrawing]: 'Составление БЗ',
  [InfrastructureStatusEnum.ToComplete]: 'В работу',
  [InfrastructureStatusEnum.Completed]: 'Выполнено',
  [InfrastructureStatusEnum.Returned]: 'Возвращено на доработку',
  [InfrastructureStatusEnum.Canceled]: 'Отменено',
  [InfrastructureStatusEnum.Suspended]: 'Приостановлено',
  [InfrastructureStatusEnum.ApproveAwaiting]: 'Ожидание согласования',
}

export const budgetTypeDict: Record<BudgetTypeEnum, string> = {
  [BudgetTypeEnum.OPEX]: 'OPEX',
  [BudgetTypeEnum.CAPEX]: 'CAPEX',
}
