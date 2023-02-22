import { Space as BaseSpace, SpaceProps as BaseSpaceProps } from 'antd'
import styled from 'styled-components'

/**
 * Копия компонента Space, дополнительно принимающая prop "$block" для расширения на ширину своего родителя
 */

export type SpaceProps = BaseSpaceProps & { $block?: boolean }

const Space = styled(BaseSpace)<SpaceProps>`
  ${({ $block }) => ($block ? 'width: 100%' : '')};
`

export default Space
