import { Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

import { UserModel } from 'modules/user/models'
import { getFullUserName } from 'modules/user/utils'

import Space from 'components/Space'

import { MaybeNull } from 'shared/types/utils'

const { Text } = Typography

const renderInfo = (label: string, value: any): ReactNode => (
  <Space>
    <Text underline>{label}:</Text>
    <Text>{value || 'Не определено'}</Text>
  </Space>
)

type UserShortInfoProps = Partial<
  Pick<UserModel, 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email'> & {
    title: string
    position: MaybeNull<string>
    skip: ['fio']
    testId: string
  }
>

const UserShortInfo: FC<UserShortInfoProps> = ({
  firstName,
  lastName,
  middleName,
  phone,
  email,
  position,

  title,
  skip,

  testId,
}) => {
  return (
    <Space data-testid={testId || 'user-short-info'} direction='vertical'>
      {title && <Text strong>{title}</Text>}

      <Space direction='vertical'>
        {renderInfo('Должность', position || null)}

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
