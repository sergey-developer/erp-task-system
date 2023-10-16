import { ReclassificationReasonEnum } from 'modules/task/constants/taskReclassificationRequest'

export const reclassificationReasonLabels: Record<ReclassificationReasonEnum, string> = {
  [ReclassificationReasonEnum.WrongClassification]:
    'Классификация не соответствует содержанию обращения',
  [ReclassificationReasonEnum.WrongSupportGroup]:
    'Группа поддержки не соответствует классификации',
  [ReclassificationReasonEnum.DivideTask]: 'Требуется разбить обращение',
}
