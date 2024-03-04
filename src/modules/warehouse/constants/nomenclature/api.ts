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
  Nomenclatures = 'Nomenclatures',
}
