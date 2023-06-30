export type FiscalDriverListItemModel = {
  id: number
  blockingIn: number
  olaNextBreachTime: string
  recordId: string
  sapId: string
  name: string
  address: string
  fiscalAccumulator: {
    faNumber: number
  }
  deadlineOrTotalFiscalDocs: number
  supportGroup: {
    name: string
    macroregion: {
      title: string
    }
  }
  title: string
  createdAt: string
}

export type FiscalDriverListModel = Array<FiscalDriverListItemModel>
