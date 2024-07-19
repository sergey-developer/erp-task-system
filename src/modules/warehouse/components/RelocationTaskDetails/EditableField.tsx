import { useBoolean } from 'ahooks'
import { Button } from 'antd'
import isEqual from 'lodash/isEqual'
import React, { FC, ReactElement, useState } from 'react'

import { CheckIcon, CloseIcon, EditIcon } from 'components/Icons'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import ReadonlyField, { ReadonlyFieldProps } from './ReadonlyField'

export type EditableFieldProps = ReadonlyFieldProps & {
  editButtonHidden?: boolean
  editButtonDisabled?: boolean
  renderEditable: ({
    value,
  }: Pick<ReadonlyFieldProps, 'value'> & { onChange: (value: any) => void }) => ReactElement

  onSave: (value: any) => Promise<void>
  onEdit?: () => void
  onCancel?: () => void
  isLoading: boolean
}

// todo: переиспользовать где возможно
const EditableField: FC<EditableFieldProps> = ({
  value,
  displayValue = value,

  editButtonHidden = false,
  editButtonDisabled = false,
  renderEditable,

  onSave,
  onEdit,
  onCancel,
  isLoading,

  ...props
}) => {
  const [editable, { setTrue: setEditable, setFalse: setNotEditable }] = useBoolean(false)
  const [newValue, setNewValue] = useState<any>(value)

  const onChange = async () => {
    try {
      await onSave(newValue)
      setNotEditable()
      onCancel && onCancel()
    } catch {}
  }

  const handleCancel = () => {
    setNewValue(value)
    setNotEditable()
    onCancel && onCancel()
  }

  const onClickEdit = () => {
    setEditable()
    onEdit && onEdit()
  }

  return (
    <ReadonlyField
      {...props}
      value={value}
      displayValue={
        isLoading ? (
          <Spinner centered={false} />
        ) : editable ? (
          <Space>
            {renderEditable({ value: newValue, onChange: setNewValue })}

            <Button
              type='text'
              disabled={isEqual(value, newValue)}
              icon={<CheckIcon $color='bleuDeFrance' $cursor='pointer' />}
              onClick={onChange}
            />

            <Button type='text' icon={<CloseIcon $color='fireOpal' />} onClick={handleCancel} />
          </Space>
        ) : (
          <Space>
            {displayValue}

            {!editButtonHidden && (
              <Button
                block
                type='text'
                disabled={editButtonDisabled}
                icon={<EditIcon $size='large' $cursor='pointer' $color='bleuDeFrance' />}
                onClick={onClickEdit}
              />
            )}
          </Space>
        )
      }
    />
  )
}

export default EditableField
