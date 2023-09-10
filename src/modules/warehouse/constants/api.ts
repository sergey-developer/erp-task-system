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
}

export enum NomenclatureApiTriggerEnum {
  GetNomenclature = 'getNomenclature',
  CreateNomenclature = 'createNomenclature',
  UpdateNomenclature = 'updateNomenclature',
  GetNomenclatureList = 'getNomenclatureList',
}

export enum NomenclatureApiTagEnum {
  NomenclatureList = 'NomenclatureList',
}

// nomenclature group
export enum NomenclatureGroupApiEnum {
  GetNomenclatureGroupList = '/nomenclature-groups/',
  CreateNomenclatureGroup = '/nomenclature-groups/',
  UpdateNomenclatureGroup = '/nomenclature-groups/:id/',
}

export enum NomenclatureGroupApiTriggerEnum {
  CreateNomenclatureGroup = 'createNomenclatureGroup',
  UpdateNomenclatureGroup = 'updateNomenclatureGroup',
  GetNomenclatureGroupList = 'getNomenclatureGroupList',
}

// equipment
export enum EquipmentApiEnum {
  GetEquipmentNomenclatureList = '/equipments/nomenclatures/reserves/',
  GetEquipmentList = '/equipments/',
  GetEquipment = '/equipments/:id/',
  GetEquipmentCategoryList = '/equipments/categories/',
}

// measurement
export enum MeasurementUnitApiEnum {
  GetMeasurementUnitList = '/measurement-units/',
}

// customer
export enum CustomerApiEnum {
  GetCustomerList = '/customers/',
}
