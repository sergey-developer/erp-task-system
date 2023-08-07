import { useBoolean } from 'ahooks'
import { Menu, Input, Button, Row, Col } from 'antd'
import { FC, useState } from 'react'

import AddOrEditGroupModal from 'modules/warehouse/components/AddOrEditGroupModal'
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

  const [
    addGroupModalOpened,
    { setTrue: openAddGroupModal, setFalse: closeAddGroupModal },
  ] = useBoolean(false)

  return (
    <>
      <Space
        data-testid='nomenclature-list-page'
        $block
        direction='vertical'
        size='large'
      >
        <Space size='middle'>
          <Search placeholder='Поиск номенклатуры' />
          <Button onClick={openAddGroupModal}>+ Добавить группу</Button>
          <Button>+ Добавить номенклатуру</Button>
        </Space>

        <Row gutter={16}>
          <Col span={5}>
            <Menu
              data-testid='group-list'
              mode='inline'
              items={items.map((itm) => ({
                key: itm.id,
                label: itm.title,
                itemIcon: itm.id === activeGroupKey && <EditIcon />,
                onMouseEnter: () => setActiveGroupKey(itm.id),
                onMouseLeave: () => setActiveGroupKey(undefined),
              }))}
            />
          </Col>

          <Col span={19}>
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
          </Col>
        </Row>
      </Space>

      {addGroupModalOpened && (
        <AddOrEditGroupModal
          title='Добавление номенклатурной группы'
          visible={addGroupModalOpened}
          okText='Добавить'
          onCancel={closeAddGroupModal}
          onSubmit={async () => {}}
        />
      )}
    </>
  )
}

export default NomenclatureListPage
