export enum WarehouseApiEnum {
  GetWarehouseList = '/warehouses/',
  GetWarehouse = '/warehouses/:id/',
}

export enum LegalEntityApiEnum {
  GetLegalEntityList = '/legal-entities/',
}

export enum NomenclatureApiEnum {
  GetNomenclatureList = '/nomenclatures/',
  GetNomenclatureGroupList = '/nomenclature-groups/',
  CreateNomenclatureGroup = '/nomenclature-groups/',
}

export enum NomenclatureApiTriggerEnum {
  CreateNomenclatureGroup = 'createNomenclatureGroup',
  GetNomenclatureList = 'getNomenclatureList',
  GetNomenclatureGroupList = 'getNomenclatureGroupList',
}
