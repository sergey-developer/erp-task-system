export enum WarehouseApiEnum {
  GetWarehouseList = '/warehouses/',
  GetWarehouse = '/warehouses/:id/',
}

export enum LegalEntityApiEnum {
  GetLegalEntityList = '/legal-entities/',
}

export enum NomenclatureApiEnum {
  GetNomenclatureGroupList = '/nomenclature-groups/',
  CreateNomenclatureGroup = '/nomenclature-groups/',
}

export enum NomenclatureApiTriggerEnum {
  CreateNomenclatureGroup = 'createNomenclatureGroup',
  GetNomenclatureGroupList = 'getNomenclatureGroupList',
}
