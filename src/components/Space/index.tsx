import { Space as BaseSpace } from 'antd'

import styled from 'styled-components'

type SpaceProps = { $block?: boolean }

/**
 * Нужен для того, чтобы компонент Space из antd расширялся на ширину своего родителя
 */

const Space = styled(BaseSpace)<SpaceProps>`
  ${({ $block }) => ($block ? 'width: 100%' : '')};
`

export default Space
