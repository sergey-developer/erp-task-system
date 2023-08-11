import { ButtonProps, Modal, ModalProps } from 'antd'
import { FC, useMemo } from 'react'

import LoadingArea from 'components/LoadingArea'

import { modalWidth, cancelBtnText } from './constants'

const commonButtonProps: ButtonProps = {
  size: 'large',
}

const baseOkButtonProps: ButtonProps = {
  ...commonButtonProps,
  htmlType: 'submit',
}

export type BaseModalProps = ModalProps & {
  /* Determines whether spinner should be shown on whole modal */
  isLoading?: boolean
}

const BaseModal: FC<BaseModalProps> = ({
  width = modalWidth,
  cancelText = cancelBtnText,
  destroyOnClose = true,
  isLoading = false,
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
      width={width}
      cancelText={cancelText}
      destroyOnClose={destroyOnClose}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      {...props}
    >
      <LoadingArea isLoading={isLoading}>{children}</LoadingArea>
    </Modal>
  )
}

export default BaseModal
