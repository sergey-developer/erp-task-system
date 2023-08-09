import { ButtonProps, Modal, ModalProps } from 'antd'
import { FC, useMemo } from 'react'

import { modalWidth, cancelBtnText } from './constants'

const commonButtonProps: ButtonProps = {
  size: 'large',
}

const baseOkButtonProps: ButtonProps = {
  ...commonButtonProps,
  htmlType: 'submit',
}

export type BaseModalProps = ModalProps

const BaseModal: FC<BaseModalProps> = ({
  children,
  okButtonProps: initialOkButtonProps,
  cancelButtonProps: initialCancelButtonProps,
  ...props
}) => {
  const okButtonProps = useMemo(
    () => ({
      ...baseOkButtonProps,
      ...(initialOkButtonProps || {}),
    }),
    [initialOkButtonProps],
  )

  const cancelButtonProps = useMemo(
    () => ({ ...commonButtonProps, ...(initialCancelButtonProps || {}) }),
    [initialCancelButtonProps],
  )

  return (
    <Modal
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      {...props}
    >
      {children}
    </Modal>
  )
}

BaseModal.defaultProps = {
  width: modalWidth,
  cancelText: cancelBtnText,
  destroyOnClose: true,
}

export default BaseModal
