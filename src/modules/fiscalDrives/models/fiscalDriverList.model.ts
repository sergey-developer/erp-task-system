export type FiscalDriverListItemModel = {
  id: number
  blockThrough: string
  deadline: string
  recordId: string
  sapId: string
  client: string
  address: string
  fiscalDriverId: string
  totalFd: string
  mr: string
  supportGroup: string
  category: string
  createdAt: string
}

export type FiscalDriverListModel = Array<FiscalDriverListItemModel>
