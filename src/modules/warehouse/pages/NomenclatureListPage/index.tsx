import { Menu, MenuProps, Input, Button } from 'antd'
import { FC, useState } from 'react'

import NomenclatureTable from 'modules/warehouse/components/NomenclatureTable'

import { EditIcon } from 'components/Icons'
import Space from 'components/Space'

const items = [
  {
    id: 1,
    title: 'Принтеры',
  },
  {
    id: 2,
    title: 'Мониторы',
  },
  {
    id: 3,
    title: 'Мыши',
  },
  {
    id: 4,
    title: 'Клавиатуры',
  },
]

const { Search } = Input

const NomenclatureListPage: FC = () => {
  const [activeGroupKey, setActiveGroupKey] = useState<number>()

  const handleClickGroup: MenuProps['onClick'] = ({ key }) => {
    setActiveGroupKey(Number(key))
  }

  return (
    <Space $block direction='vertical'>
      <Space size='middle'>
        <Search placeholder='Поиск номенклатуры' />
        <Button>+ Добавить группу</Button>
        <Button>+ Добавить номенклатуру</Button>
      </Space>

      <Space $block size='middle'>
        <Menu
          style={{ width: 256 }}
          mode='inline'
          onClick={handleClickGroup}
          items={items.map((itm) => ({
            key: itm.id,
            label: itm.title,
            itemIcon: itm.id === activeGroupKey && <EditIcon />,
          }))}
        />

        <NomenclatureTable
          dataSource={[
            {
              id: 1,
              title: 'МФУ лазерный Huawei PixLab V81-WDM2',
              vendorCode: 2010001401,
            },
            {
              id: 2,
              title: 'МФУ лазерный Pantum M6550NW',
              vendorCode: 2010001402,
            },
          ]}
          loading={false}
        />
      </Space>
    </Space>
  )
}

export default NomenclatureListPage
