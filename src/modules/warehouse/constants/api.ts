export enum WarehouseApiEnum {
  GetWarehouseList = '/warehouses/',
  GetWarehouse = '/warehouses/:id/',
}

export enum LegalEntityApiEnum {
  GetLegalEntityList = '/legal-entities/',
}

export enum NomenclatureApiEnum {
  GetNomenclatureList = '/nomenclatures/',
  CreateNomenclature = '/nomenclatures/',
  GetNomenclatureGroupList = '/nomenclature-groups/',
  CreateNomenclatureGroup = '/nomenclature-groups/',
}

export enum NomenclatureApiTriggerEnum {
  CreateNomenclature = 'createNomenclature',
  GetNomenclatureList = 'getNomenclatureList',
  CreateNomenclatureGroup = 'createNomenclatureGroup',
  GetNomenclatureGroupList = 'getNomenclatureGroupList',
}

export enum NomenclatureApiTagEnum {
  NomenclatureList = 'NomenclatureList',
}
