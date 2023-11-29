import { ButtonProps, Modal, ModalProps } from 'antd'
import { FC, useMemo } from 'react'

import LoadingArea from 'components/LoadingArea'
import { SpinnerProps } from 'components/Spinner'

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
  loadingTip?: SpinnerProps['tip']
  'data-testid'?: string
}

const BaseModal: FC<BaseModalProps> = ({
  width = modalWidth,
  cancelText = cancelBtnText,
  destroyOnClose = true,
  isLoading = false,
  loadingTip,
  children,
  okButtonProps,
  cancelButtonProps,
  'data-testid': testId,
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
      data-testid={testId}
    >
      <LoadingArea data-testid={`${testId}-loading`} isLoading={isLoading} tip={loadingTip}>
        {children}
      </LoadingArea>
    </Modal>
  )
}

export default BaseModal
