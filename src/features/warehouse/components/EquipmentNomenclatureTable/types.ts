import { TableProps } from 'antd'

import { EquipmentNomenclatureListItemModel } from 'features/warehouse/models'

export type EquipmentNomenclatureTableItem = Pick<
  EquipmentNomenclatureListItemModel,
  'id' | 'title' | 'quantity'
>

export type EquipmentNomenclatureTableProps = Required<
  Pick<
    TableProps<EquipmentNomenclatureTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination'
  >
>
