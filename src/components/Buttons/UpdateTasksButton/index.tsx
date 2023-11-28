import { CheckOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import { DropdownButtonProps } from 'antd/es/dropdown'
import React, { FC, useState } from 'react'

import { TasksUpdateVariantsEnum } from 'shared/constants/tasksUpdateVariants'

export type UpdateTasksButtonProps = Required<Pick<DropdownButtonProps, 'onClick'>> &
  Pick<DropdownButtonProps, 'disabled'> & {
    onAutoUpdate: () => void
  }

const UpdateTasksButton: FC<UpdateTasksButtonProps> = ({ onAutoUpdate, ...props }) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  return (
    <Dropdown.Button
      {...props}
      menu={{
        items: [
          {
            key: TasksUpdateVariantsEnum.AutoUpdate1M,
            label: 'Автообновление',
            icon: selectedKeys.includes(TasksUpdateVariantsEnum.AutoUpdate1M) && <CheckOutlined />,
            onClick: onAutoUpdate,
          },
        ],
        selectable: true,
        selectedKeys,
        onSelect: (info) => setSelectedKeys(info.selectedKeys),
        onDeselect: (info) =>
          setSelectedKeys((prevState) => prevState.filter((key) => key !== info.key)),
      }}
      icon={<DownOutlined />}
      trigger={['click']}
    >
      Обновить заявки
    </Dropdown.Button>
  )
}

export default UpdateTasksButton
