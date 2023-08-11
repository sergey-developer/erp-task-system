export enum WarehouseApiEnum {
  GetWarehouseList = '/warehouses/',
  GetWarehouse = '/warehouses/:id/',
}

export enum LegalEntityApiEnum {
  GetLegalEntityList = '/legal-entities/',
}

export enum NomenclatureApiEnum {
  GetNomenclatureList = '/nomenclatures/',
  GetNomenclature = '/nomenclatures/:id/',
  CreateNomenclature = '/nomenclatures/',
  UpdateNomenclature = '/nomenclatures/:id/',
  GetNomenclatureGroupList = '/nomenclature-groups/',
  CreateNomenclatureGroup = '/nomenclature-groups/',
  UpdateNomenclatureGroup = '/nomenclature-groups/:id/',
}

export enum NomenclatureApiTriggerEnum {
  GetNomenclature = 'getNomenclature',
  CreateNomenclature = 'createNomenclature',
  UpdateNomenclature = 'updateNomenclature',
  GetNomenclatureList = 'getNomenclatureList',
  CreateNomenclatureGroup = 'createNomenclatureGroup',
  UpdateNomenclatureGroup = 'updateNomenclatureGroup',
  GetNomenclatureGroupList = 'getNomenclatureGroupList',
}

export enum NomenclatureApiTagEnum {
  NomenclatureList = 'NomenclatureList',
}

export enum MeasurementUnitApiEnum {
  GetMeasurementUnitList = '/measurement-units/',
}

export enum CountryApiEnum {
  GetCountryList = '/countries/',
}
