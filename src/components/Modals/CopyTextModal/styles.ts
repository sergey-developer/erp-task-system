import BaseModal from 'components/Modals/BaseModal'
import styled from 'styled-components'

export const ModalStyled = styled(BaseModal)`
  .ant-modal-body {
    border-top: 1px solid ${({ theme }) => theme.colors.gray5};
  }
`
