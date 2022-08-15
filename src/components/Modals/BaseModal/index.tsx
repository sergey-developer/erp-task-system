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
  okButtonProps: rawOkButtonProps,
  cancelButtonProps: rawCancelButtonProps,
  ...props
}) => {
  const okButtonProps = useMemo(
    () => ({
      ...baseOkButtonProps,
      ...(rawOkButtonProps || {}),
    }),
    [rawOkButtonProps],
  )

  const cancelButtonProps = useMemo(
    () => ({ ...commonButtonProps, ...(rawCancelButtonProps || {}) }),
    [rawCancelButtonProps],
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
