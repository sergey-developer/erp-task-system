import React, { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

export type ConfirmCancelReclassificationRequestModalProps = Pick<
  BaseModalProps,
  'open' | 'confirmLoading' | 'onOk' | 'onCancel'
>

const ConfirmCancelReclassificationRequestModal: FC<
  ConfirmCancelReclassificationRequestModalProps
> = (props) => {
  return (
    <BaseModal
      {...props}
      data-testid='confirm-cancel-reclassification-request-modal'
      title='Отменить запрос на переклассификацию'
    >
      Вы уверены, что хотите отменить запрос на переклассификацию?
    </BaseModal>
  )
}

export default ConfirmCancelReclassificationRequestModal
