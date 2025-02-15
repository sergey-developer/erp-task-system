import { Flex, Typography } from 'antd'
import { UserDetailDTO } from 'features/users/api/dto'
import { getFullUserName } from 'features/users/helpers'
import React, { FC, ReactNode } from 'react'

import { MaybeNull } from 'shared/types/utils'

const { Text } = Typography

const renderInfo = (label: string, value: any): ReactNode => (
  <Flex gap='small'>
    <Text underline>{label}:</Text>
    <Text>{value || 'Не определено'}</Text>
  </Flex>
)

type UserShortInfoProps = Partial<
  Pick<UserDetailDTO, 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email'> & {
    title: string
    position: MaybeNull<string>
    skip: ['fio']
    testId: string
  }
>

// todo: переименовать в UserPopoverInfo
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
    <Flex data-testid={testId || 'user-short-info'} vertical gap='small'>
      {title && <Text strong>{title}</Text>}

      <Flex vertical>
        {renderInfo('Должность', position || null)}

        {!skip?.includes('fio') &&
          renderInfo(
            'ФИО',
            firstName && lastName ? getFullUserName({ firstName, lastName, middleName }) : null,
          )}

        {renderInfo('Телефон', phone)}

        {renderInfo('Почта', email)}
      </Flex>
    </Flex>
  )
}

export default UserShortInfo
