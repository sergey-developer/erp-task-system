import { ButtonProps, Modal, ModalProps } from 'antd'
import { FC, useMemo } from 'react'

import LoadingArea from 'components/LoadingArea'

import { CANCEL_TEXT, DEFAULT_MODAL_WIDTH } from 'shared/constants/common'

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
  width = DEFAULT_MODAL_WIDTH,
  cancelText = CANCEL_TEXT,
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
      width={width}
      cancelText={cancelText}
      okButtonProps={mergedOkButtonProps}
      cancelButtonProps={mergedCancelButtonProps}
      {...props}
    >
      <LoadingArea isLoading={isLoading}>{children}</LoadingArea>
    </Modal>
  )
}

export default BaseModal
