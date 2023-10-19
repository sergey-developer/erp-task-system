import { ReclassificationReasonEnum } from './enums'

export const reclassificationReasonDict: Record<ReclassificationReasonEnum, string> = {
  [ReclassificationReasonEnum.WrongClassification]:
    'Требуется переклассификация (классификация неверная)',
  [ReclassificationReasonEnum.WrongSupportGroup]:
    'Требуется переклассификация (классификация верная)',
  [ReclassificationReasonEnum.DivideTask]: 'Требуется разбить обращение',
}
