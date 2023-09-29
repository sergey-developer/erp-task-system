import { EditableProTable, ProColumns, ProForm, ProFormInstance } from '@ant-design/pro-components'
import { Button, Col, Row } from 'antd'
import { FC, Key, ReactNode, useRef, useState } from 'react'

import { equipmentConditionOptions } from 'modules/warehouse/constants/equipment'

import { MinusCircleIcon } from 'components/Icons'
import Space from 'components/Space'

import { AddEquipmentButton } from './styles'
import { RelocationEquipmentFormFields } from './types'

const RelocationEquipmentEditableTable: FC = () => {
  const formRef = useRef<ProFormInstance<any>>()
  const [editableKeys, setEditableRowKeys] = useState<Key[]>([])

  const columns: ProColumns<RelocationEquipmentFormFields>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      width: 440,
      title: 'Оборудование',
      valueType: 'select',
      formItemProps: {
        rules: [{ required: true }],
        // @ts-ignore
        'data-testid': 'equipment-form-item',
      },
      fieldProps: {
        dropdownRender: (menu: ReactNode) => (
          <Space $block direction='vertical'>
            <AddEquipmentButton type='link'>Добавить оборудование</AddEquipmentButton>

            {menu}
          </Space>
        ),
        options: [{ label: 'label', value: 321 }],
      },
    },
    {
      key: 'serialNumber',
      dataIndex: 'serialNumber',
      title: 'Серийный номер',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      key: 'purpose',
      dataIndex: 'purpose',
      title: 'Назначение',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      key: 'condition',
      dataIndex: 'condition',
      width: 190,
      title: 'Состояние',
      valueType: 'select',
      formItemProps: { rules: [{ required: true }] },
      fieldProps: { options: equipmentConditionOptions },
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'Доступно',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Стоимость',
      valueType: 'digit',
    },
    {
      key: 'currency',
      dataIndex: 'currency',
      title: 'Валюта',
      valueType: 'select',
      fieldProps: { options: [{ label: 'руб', value: 1 }] },
    },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'Количество',
      valueType: 'digit',
      formItemProps: { rules: [{ required: true }] },
      fieldProps: { min: 1 },
    },
    {
      title: '',
      valueType: 'option',
      width: 50,
      render: (_, row) => [
        <Button
          key='delete'
          type='text'
          icon={<MinusCircleIcon />}
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue(
              'equipments',
            ) as RelocationEquipmentFormFields[]

            formRef.current?.setFieldsValue({
              equipments: tableDataSource.filter((item) => item.rowId !== row?.rowId),
            })
          }}
        />,
      ],
    },
  ]

  return (
    <ProForm<{
      equipments: RelocationEquipmentFormFields[]
    }>
      formRef={formRef}
      submitter={{
        render: ({ form }) => [
          <Row justify='end' gutter={8}>
            <Col>
              <Button>Отменить</Button>
            </Col>

            <Col>
              <Button type='primary' htmlType='submit' onClick={form?.submit}>
                Создать заявку
              </Button>
            </Col>
          </Row>,
        ],
      }}
      onFinish={async (values) => {
        return true
      }}
      // initialValues={{
      //   equipments: [
      //     {
      //       rowId: 1,
      //       id: 321,
      //       serialNumber: '432-4343',
      //       purpose: 'purpose',
      //       condition: EquipmentConditionEnum.Working,
      //       amount: 5433,
      //       price: 434444,
      //       currency: 1,
      //       quantity: 432432,
      //     },
      //   ],
      // }}
    >
      <EditableProTable<RelocationEquipmentFormFields>
        data-testid='relocation-equipment-editable-table'
        rowKey='rowId'
        name='equipments'
        columns={columns}
        recordCreatorProps={{
          record: (index) => ({ rowId: index + 1 }),
          creatorButtonText: 'Добавить оборудование',
        }}
        formItemProps={{
          rules: [
            {
              validator: async (_, value) => {
                if (value.length < 1) {
                  throw new Error('Добавьте оборудование')
                }
              },
            },
          ],

          // @ts-ignore
          'data-testid': 'relocation-equipment-editable-table-form-item',
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys,
          onValuesChange: (record, recordList) => {},
          actionRender: (row) => [
            <Button
              key='delete'
              type='text'
              icon={<MinusCircleIcon />}
              onClick={() => {
                const tableDataSource = formRef.current?.getFieldValue(
                  'equipments',
                ) as RelocationEquipmentFormFields[]

                formRef.current?.setFieldsValue({
                  equipments: tableDataSource.filter((item) => item.rowId !== row?.rowId),
                })
              }}
            />,
          ],
        }}
      />
    </ProForm>
  )
}

export default RelocationEquipmentEditableTable
