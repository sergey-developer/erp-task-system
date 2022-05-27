import { Space as BaseSpace } from 'antd'

import styled from 'styled-components'

type SpaceProps = { $fullWidth?: boolean }

/**
 * Нужен для того, чтобы компонент Space из antd расширялся на ширину своего родителя
 */

const Space = styled(BaseSpace)<SpaceProps>`
  ${({ $fullWidth }) => ($fullWidth ? 'width: 100%' : '')};
`

export default Space
