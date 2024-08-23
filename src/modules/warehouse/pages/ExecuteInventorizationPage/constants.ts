export enum ExecuteInventorizationPageTabsEnum {
  Revise = 'Revise',
  Discrepancies = 'Discrepancies',
  Relocations = 'Relocations',
}

export const executeInventorizationPageTabNames: Record<
  ExecuteInventorizationPageTabsEnum,
  string
> = {
  [ExecuteInventorizationPageTabsEnum.Revise]: 'Сверка',
  [ExecuteInventorizationPageTabsEnum.Discrepancies]: 'Расхождения',
  [ExecuteInventorizationPageTabsEnum.Relocations]: 'Перемещения',
}
