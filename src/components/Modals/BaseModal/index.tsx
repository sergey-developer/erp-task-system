import { ButtonProps, Modal, ModalProps } from 'antd'
import { FC, useMemo } from 'react'

import LoadingArea from 'components/LoadingArea'
import { SpinnerProps } from 'components/Spinner'

import { CANCEL_TEXT, DEFAULT_MODAL_WIDTH } from 'shared/constants/common'
import { WithTestIdType } from 'shared/types/common'

const commonButtonProps: ButtonProps = {
  size: 'large',
}

const baseOkButtonProps: ButtonProps = {
  ...commonButtonProps,
  htmlType: 'submit',
}

export type BaseModalProps = ModalProps &
  WithTestIdType & {
    /* Determines whether spinner should be shown on whole modal */
    isLoading?: boolean
    loadingTip?: SpinnerProps['tip']
  }

const BaseModal: FC<BaseModalProps> = ({
  width = DEFAULT_MODAL_WIDTH,
  cancelText = CANCEL_TEXT,
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
