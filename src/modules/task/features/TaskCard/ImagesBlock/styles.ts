import { Image } from 'antd'
import styled from 'styled-components'

export const ImageStyled = styled(Image)`
  && {
    border-radius: 4px;
    width: 58px;
  }
  ~ .ant-image-mask {
    border-radius: 4px;
  }
`
