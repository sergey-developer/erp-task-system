import { Modal } from 'antd'

import styled from 'styled-components'

export const ModalStyled = styled(Modal)`
  .ant-modal-body {
    border-top: 1px solid ${({ theme }) => theme.colors.gray5};
  }
`
