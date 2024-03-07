import { Button, Flex, Table, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskCompletionDocumentRelocationTask } from 'modules/task/models'
import {
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'
import { getRelocateFromTo } from 'modules/warehouse/utils/relocationTask'

const { Title } = Typography

export type DocumentsPackageRelocationEquipmentTableProps = {
  task: TaskCompletionDocumentRelocationTask
}

const DocumentsPackageRelocationEquipmentTable: FC<
  DocumentsPackageRelocationEquipmentTableProps
> = ({ task }) => {
  return (
    <Flex vertical>
      <Title level={5}>{getRelocateFromTo(task, 'Перемещение оборудования')}</Title>

      <Table
        rowKey='id'
        dataSource={task.relocationEquipments}
        pagination={false}
        columns={[
          {
            dataIndex: 'equipment',
            title: 'Наименование',
            render: (
              value: TaskCompletionDocumentRelocationTask['relocationEquipments'][number]['equipment'],
            ) => value.title,
          },
          {
            dataIndex: 'equipment',
            title: 'Серийный номер',
            render: (
              value: TaskCompletionDocumentRelocationTask['relocationEquipments'][number]['equipment'],
            ) => value.serialNumber,
          },
          {
            dataIndex: 'condition',
            title: 'Состояние',
            render: (
              value: TaskCompletionDocumentRelocationTask['relocationEquipments'][number]['condition'],
            ) => equipmentConditionDict[value],
          },
          {
            key: 'ateData',
            dataIndex: 'condition',
            width: 150,
            render: (
              value: TaskCompletionDocumentRelocationTask['relocationEquipments'][number]['condition'],
            ) => (
              <Button
                disabled={
                  value !== EquipmentConditionEnum.Broken &&
                  value !== EquipmentConditionEnum.NonRepairable
                }
              >
                Данные АТЭ
              </Button>
            ),
          },
        ]}
      />
    </Flex>
  )
}

export default DocumentsPackageRelocationEquipmentTable
