import { ReclassificationReasonEnum } from './enums'

export const reclassificationReasonDict: Record<ReclassificationReasonEnum, string> = {
  [ReclassificationReasonEnum.WrongClassification]:
    'Классификация не соответствует содержанию обращения',
  [ReclassificationReasonEnum.WrongSupportGroup]:
    'Группа поддержки не соответствует классификации',
  [ReclassificationReasonEnum.DivideTask]: 'Требуется разбить обращение',
}
