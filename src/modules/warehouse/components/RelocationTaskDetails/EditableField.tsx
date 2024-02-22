import { useBoolean } from 'ahooks'
import { Button } from 'antd'
import isEqual from 'lodash/isEqual'
import React, { FC, ReactElement, useState } from 'react'

import { CheckIcon, CloseIcon, EditIcon } from 'components/Icons'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import ReadonlyField, { ReadonlyFieldProps } from './ReadonlyField'

export type EditableFieldProps = ReadonlyFieldProps & {
  renderEditable: ({
    value,
  }: Pick<ReadonlyFieldProps, 'value'> & { onChange: (value: any) => void }) => ReactElement

  onSave: (value: any) => Promise<void>
  isLoading: boolean
}

const EditableField: FC<EditableFieldProps> = ({
  renderEditable,
  value,
  displayValue = value,

  onSave,
  isLoading,

  ...props
}) => {
  const [editable, { setTrue: setEditable, setFalse: setNotEditable }] = useBoolean(false)
  const [newValue, setNewValue] = useState(value)

  const onChange = async () => {
    await onSave(newValue)
    setNotEditable()
  }

  const onCancel = () => {
    setNewValue(value)
    setNotEditable()
  }

  return (
    <ReadonlyField
      {...props}
      value={value}
      displayValue={
        editable ? (
          <Space>
            {renderEditable({ value: newValue, onChange: setNewValue })}

            {isLoading ? (
              <Spinner />
            ) : (
              <Button
                type='text'
                disabled={isEqual(value, newValue)}
                icon={<CheckIcon $color='bleuDeFrance' $cursor='pointer' />}
                onClick={onChange}
              />
            )}
            <CloseIcon $color='fireOpal' onClick={onCancel} />
          </Space>
        ) : (
          <Space>
            {displayValue}
            <EditIcon $size='large' $cursor='pointer' $color='bleuDeFrance' onClick={setEditable} />
          </Space>
        )
      }
    />
  )
}

export default EditableField
