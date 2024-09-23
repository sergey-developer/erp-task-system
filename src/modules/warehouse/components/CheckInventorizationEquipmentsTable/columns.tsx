import { Popover } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { overlayInnerStyle } from 'modules/task/components/CreateTaskModal/styles'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import { ExclamationCircleIcon } from 'components/Icons'

import { isFalse } from 'shared/utils/common'

import { CheckInventorizationEquipmentsTableRow } from './types'

export const getColumns = (): ColumnsType<CheckInventorizationEquipmentsTableRow> => [
  {
    width: 50,
    dataIndex: 'rowId',
    title: '№',
    render: (value: CheckInventorizationEquipmentsTableRow['rowId']) => value + 1,
  },
  {
    dataIndex: 'title',
    title: 'Наименование',
  },
  {
    dataIndex: 'serialNumber',
    title: 'Серийный № / Артикул',
    render: (
      value: CheckInventorizationEquipmentsTableRow['serialNumber'],
      { category, nomenclature },
    ) => (checkEquipmentCategoryIsConsumable(category?.code) ? nomenclature?.vendorCode : value),
  },
  {
    dataIndex: 'inventoryNumber',
    title: 'Инвентарный №',
  },
  {
    dataIndex: 'quantityFact',
    title: 'Наличие',
  },
  {
    dataIndex: 'locationFact',
    title: 'Фактическое местонахождение',
    render: (value: CheckInventorizationEquipmentsTableRow['locationFact']) => value?.title,
  },
  {
    width: 50,
    dataIndex: 'isCredited',
    render: (value: CheckInventorizationEquipmentsTableRow['isCredited']) =>
      isFalse(value) ? (
        <Popover
          overlayInnerStyle={overlayInnerStyle}
          content='Оборудование отсутствует и будет оприходовано. Проверьте заполнение обязательных параметров, нажав на карандаш'
        >
          <ExclamationCircleIcon $color='fireOpal' $size='large' $cursor='pointer' />
        </Popover>
      ) : undefined,
  },
]
