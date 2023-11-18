import { ButtonProps, Modal, ModalProps } from 'antd'
import { FC, useMemo } from 'react'

import LoadingArea from 'components/LoadingArea'

import { cancelBtnText, modalWidth } from './constants'

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
  okButtonProps,
  cancelButtonProps,
  ...props
}) => {
  const mergedOkButtonProps = useMemo(
    () => ({
      ...baseOkButtonProps,
      ...(okButtonProps || {}),
    }),
    [okButtonProps],
  )

  const mergedCancelButtonProps = useMemo(
    () => ({ ...commonButtonProps, ...(cancelButtonProps || {}) }),
    [cancelButtonProps],
  )

  return (
    <Modal
      {...props}
      width={width}
      cancelText={cancelText}
      destroyOnClose={destroyOnClose}
      okButtonProps={mergedOkButtonProps}
      cancelButtonProps={mergedCancelButtonProps}
    >
      <LoadingArea isLoading={isLoading}>{children}</LoadingArea>
    </Modal>
  )
}

export default BaseModal
