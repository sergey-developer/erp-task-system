import { ReclassificationReasonEnum } from 'modules/task/constants/common'

export const reclassificationReasonLabels: Record<
  ReclassificationReasonEnum,
  string
> = {
  [ReclassificationReasonEnum.WrongClassification]:
    'Требуется переклассификация (классификация неверная)',
  [ReclassificationReasonEnum.WrongSupportGroup]:
    'Требуется переклассификация (классификация верная)',
  [ReclassificationReasonEnum.DivideTask]: 'Требуется разбить обращение',
}
