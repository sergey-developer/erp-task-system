import { Space as BaseSpace } from 'antd'

import styled from 'styled-components'

type SpaceProps = { $fullWidth?: boolean }

const Space = styled(BaseSpace)<SpaceProps>`
  ${({ $fullWidth }) => ($fullWidth ? 'width: 100%' : '')};
`

export default Space
