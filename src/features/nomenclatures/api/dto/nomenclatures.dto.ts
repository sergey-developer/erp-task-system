import { NomenclatureDetailDTO } from './nomenclatureDetail.dto'

export type NomenclatureDTO = Pick<NomenclatureDetailDTO, 'id' | 'title' | 'vendorCode'>
export type NomenclaturesDTO = NomenclatureDTO[]
