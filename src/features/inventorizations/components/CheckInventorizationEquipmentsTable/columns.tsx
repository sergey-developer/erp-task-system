import { Popover } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { checkEquipmentCategoryIsConsumable } from 'features/equipments/helpers'
import { overlayInnerStyle } from 'features/tasks/components/CreateTaskModal/styles'

import { CheckCircleIcon, EditTwoToneIcon, ExclamationCircleIcon } from 'components/Icons'

import { isFalse } from 'shared/utils/common'

import {
  CheckInventorizationEquipmentsTableProps,
  CheckInventorizationEquipmentsTableRow,
} from './types'

type GetColumnsArgs = Pick<
  CheckInventorizationEquipmentsTableProps,
  'onClickEdit' | 'editTouchedRowsIds'
>

export const getColumns = ({
  onClickEdit,
  editTouchedRowsIds,
}: GetColumnsArgs): ColumnsType<CheckInventorizationEquipmentsTableRow> => [
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
    key: 'edit',
    render: (_, record) => <EditTwoToneIcon $size='large' onClick={() => onClickEdit(record)} />,
  },
  {
    width: 50,
    dataIndex: 'isCredited',
    render: (value: CheckInventorizationEquipmentsTableRow['isCredited'], record) =>
      isFalse(value) && (
        <Popover
          overlayInnerStyle={overlayInnerStyle}
          content='Оборудование отсутствует и будет оприходовано. Проверьте заполнение обязательных параметров, нажав на карандаш'
        >
          {editTouchedRowsIds.includes(record.rowId) ? (
            <CheckCircleIcon $size='large' $color='green' />
          ) : (
            <ExclamationCircleIcon $color='fireOpal' $size='large' $cursor='pointer' />
          )}
        </Popover>
      ),
  },
]
