import { ButtonProps, Modal, ModalProps } from 'antd'
import { FC, useMemo } from 'react'

import { DEFAULT_MODAL_WIDTH } from 'shared/constants/components'
import { BUTTON_TEXT_CANCEL } from 'shared/constants/text'

const commonButtonProps: ButtonProps = {
  size: 'large',
}

const baseOkButtonProps: ButtonProps = {
  ...commonButtonProps,
  htmlType: 'submit',
}

type BaseModalProps = ModalProps

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
  width: DEFAULT_MODAL_WIDTH,
  cancelText: BUTTON_TEXT_CANCEL,
}

export default BaseModal
