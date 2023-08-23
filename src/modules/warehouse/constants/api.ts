// warehouses
export enum WarehouseApiEnum {
  GetWarehouseList = '/warehouses/',
  GetWarehouse = '/warehouses/:id/',
}

// legal entity
export enum LegalEntityApiEnum {
  GetLegalEntityList = '/legal-entities/',
}

// nomenclature
export enum NomenclatureApiEnum {
  GetNomenclatureList = '/nomenclatures/',
  GetNomenclature = '/nomenclatures/:id/',
  CreateNomenclature = '/nomenclatures/',
  UpdateNomenclature = '/nomenclatures/:id/',

  // todo: выделить в отдельный enum
  GetNomenclatureGroupList = '/nomenclature-groups/',
  CreateNomenclatureGroup = '/nomenclature-groups/',
  UpdateNomenclatureGroup = '/nomenclature-groups/:id/',
}

export enum NomenclatureApiTriggerEnum {
  GetNomenclature = 'getNomenclature',
  CreateNomenclature = 'createNomenclature',
  UpdateNomenclature = 'updateNomenclature',
  GetNomenclatureList = 'getNomenclatureList',

  // todo: выделить в отдельный enum
  CreateNomenclatureGroup = 'createNomenclatureGroup',
  UpdateNomenclatureGroup = 'updateNomenclatureGroup',
  GetNomenclatureGroupList = 'getNomenclatureGroupList',
}

export enum NomenclatureApiTagEnum {
  NomenclatureList = 'NomenclatureList',
}

// equipment nomenclature
export enum EquipmentNomenclatureApiEnum {
  GetEquipmentNomenclatureList = '/equipments/nomenclatures/reserves/',
}

// measurement
export enum MeasurementUnitApiEnum {
  GetMeasurementUnitList = '/measurement-units/',
}

// country
export enum CountryApiEnum {
  GetCountryList = '/countries/',
}
