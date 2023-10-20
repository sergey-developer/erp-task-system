import { Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

import { userRoleDict } from 'modules/user/constants'
import { UserModel } from 'modules/user/models'
import { getFullUserName } from 'modules/user/utils'

import Space from 'components/Space'

const { Text } = Typography

const renderInfo = (label: string, value: any): ReactNode => (
  <Space>
    <Text underline>{label}:</Text>
    <Text>{value || 'Не определено'}</Text>
  </Space>
)

type UserShortInfoProps = Partial<
  Pick<UserModel, 'firstName' | 'lastName' | 'middleName' | 'role' | 'phone' | 'email'> & {
    title: string
    skip: ['fio']
  }
>

const UserShortInfo: FC<UserShortInfoProps> = ({
  firstName,
  lastName,
  middleName,
  phone,
  email,
  role,

  title,
  skip,
}) => {
  return (
    <Space direction='vertical'>
      {title && <Text strong>{title}</Text>}

      <Space direction='vertical'>
        {renderInfo('Должность', role ? userRoleDict[role] : null)}

        {!skip?.includes('fio') &&
          renderInfo(
            'ФИО',
            firstName && lastName ? getFullUserName({ firstName, lastName, middleName }) : null,
          )}

        {renderInfo('Телефон', phone)}

        {renderInfo('Почта', email)}
      </Space>
    </Space>
  )
}

export default UserShortInfo
