import { CheckOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import { DropdownButtonProps } from 'antd/es/dropdown'
import { MenuProps } from 'antd/es/menu'
import React, { FC } from 'react'

import { TasksUpdateVariants } from 'shared/constants/updateTasks'

type UpdateTasksButtonProps = Pick<DropdownButtonProps, 'onClick' | 'disabled'> &
  Required<Pick<MenuProps, 'selectedKeys' | 'onSelect' | 'onDeselect'>>

const UpdateTasksButton: FC<UpdateTasksButtonProps> = ({
  selectedKeys,
  onSelect,
  onDeselect,
  ...props
}) => {
  return (
    <Dropdown.Button
      {...props}
      menu={{
        items: [
          {
            key: TasksUpdateVariants.AutoUpdate1M,
            label: 'Автообновление',
            icon: selectedKeys.includes(TasksUpdateVariants.AutoUpdate1M) && <CheckOutlined />,
          },
        ],
        selectable: true,
        selectedKeys,
        onSelect,
        onDeselect,
      }}
      icon={<DownOutlined />}
      trigger={['click']}
    >
      Обновить заявки
    </Dropdown.Button>
  )
}

export default UpdateTasksButton
