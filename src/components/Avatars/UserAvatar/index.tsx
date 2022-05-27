import { Avatar } from 'antd'

import styled from 'styled-components'

const UserAvatar = styled(Avatar)`
  background-color: ${({ theme }) => theme.colors.blue1};
`

export default UserAvatar
