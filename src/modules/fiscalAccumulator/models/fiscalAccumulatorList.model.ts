import { FiscalAccumulatorModel } from './fiscalAccumulator.model'

export type FiscalAccumulatorListItemModel = Pick<
  FiscalAccumulatorModel,
  | 'blockingIn'
  | 'olaNextBreachTime'
  | 'recordId'
  | 'sapId'
  | 'name'
  | 'address'
  | 'fiscalAccumulator'
  | 'deadlineOrTotalFiscalDocs'
  | 'supportGroup'
  | 'title'
  | 'createdAt'
  | 'faFormat'
>

export type FiscalAccumulatorListModel = FiscalAccumulatorListItemModel[]
