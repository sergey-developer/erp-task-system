import { Divider, Space } from 'antd'
import React, { FC } from 'react'

import { UserModel } from 'modules/user/models'

import UserShortInfo from '../UserShortInfo'

type UserShortInfoListProps = {
  data: Partial<
    Pick<UserModel, 'firstName' | 'lastName' | 'middleName' | 'role' | 'phone' | 'email'>
  >[]
}

const UserShortInfoList: FC<UserShortInfoListProps> = ({ data }) => {
  return !!data.length ? (
    <Space direction='vertical'>
      {data.map((item, index, array) => (
        <>
          <UserShortInfo
            role={item.role}
            phone={item.phone}
            email={item.email}
            firstName={item.firstName}
            lastName={item.lastName}
            middleName={item.middleName}
          />

          {index !== array.length - 1 && <Divider />}
        </>
      ))}
    </Space>
  ) : null
}

export default UserShortInfoList
