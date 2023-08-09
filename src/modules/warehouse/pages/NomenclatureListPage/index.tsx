import { useBoolean } from 'ahooks'
import { Menu, Input, Button, Row, Col } from 'antd'
import { FC, useState } from 'react'

import AddOrEditNomenclatureGroupModal from 'modules/warehouse/components/AddOrEditNomenclatureGroupModal'
import { AddOrEditNomenclatureGroupModalProps } from 'modules/warehouse/components/AddOrEditNomenclatureGroupModal/types'
import AddOrEditNomenclatureItemModal from 'modules/warehouse/components/AddOrEditNomenclatureItemModal'
import NomenclatureTable from 'modules/warehouse/components/NomenclatureTable'
import { createNomenclatureGroupMessages } from 'modules/warehouse/constants'
import { useCreateNomenclatureGroupMutation } from 'modules/warehouse/services/nomenclatureApi.service'

import { EditIcon } from 'components/Icons'
import Space from 'components/Space'

import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/services/api'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

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
    addNomenclatureGroupModalOpened,
    {
      setTrue: openAddNomenclatureGroupModal,
      setFalse: closeAddNomenclatureGroupModal,
    },
  ] = useBoolean(false)

  const [
    addNomenclatureItemModalOpened,
    {
      setTrue: openAddNomenclatureItemModal,
      setFalse: closeAddNomenclatureItemModal,
    },
  ] = useBoolean(false)

  const [
    createNomenclatureGroupMutation,
    { isLoading: createNomenclatureGroupIsLoading },
  ] = useCreateNomenclatureGroupMutation()

  const handleCreateNomenclatureGroup: AddOrEditNomenclatureGroupModalProps['onSubmit'] =
    async (values, setFields) => {
      try {
        await createNomenclatureGroupMutation(values).unwrap()
        closeAddNomenclatureGroupModal()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            if (error.data.detail) {
              showErrorNotification(error.data.detail)
            }

            setFields(getFieldsErrors(error.data))
          } else if (isForbiddenError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          } else {
            showErrorNotification(createNomenclatureGroupMessages.commonError)
          }
        }
      }
    }

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

          <Button onClick={openAddNomenclatureGroupModal}>
            + Добавить группу
          </Button>

          <Button onClick={openAddNomenclatureItemModal}>
            + Добавить номенклатуру
          </Button>
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

      {addNomenclatureGroupModalOpened && (
        <AddOrEditNomenclatureGroupModal
          visible={addNomenclatureGroupModalOpened}
          title='Добавление номенклатурной группы'
          okText='Добавить'
          isLoading={createNomenclatureGroupIsLoading}
          onCancel={closeAddNomenclatureGroupModal}
          onSubmit={handleCreateNomenclatureGroup}
        />
      )}

      {addNomenclatureItemModalOpened && (
        <AddOrEditNomenclatureItemModal
          visible={addNomenclatureItemModalOpened}
          title='Добавление номенклатурной позиции'
          okText='Добавить'
          onCancel={closeAddNomenclatureItemModal}
          onSubmit={async () => {}}
        />
      )}
    </>
  )
}

export default NomenclatureListPage
