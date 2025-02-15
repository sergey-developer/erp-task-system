import { TableProps } from 'antd'
import { EquipmentNomenclatureDTO } from 'features/warehouses/api/dto'

export type EquipmentNomenclatureTableItem = Pick<
  EquipmentNomenclatureDTO,
  'id' | 'title' | 'quantity'
>

export type EquipmentNomenclatureTableProps = Required<
  Pick<
    TableProps<EquipmentNomenclatureTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination'
  >
>
