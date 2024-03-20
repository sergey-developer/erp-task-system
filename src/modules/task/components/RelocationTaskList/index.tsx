import { Col, Divider, Row, Typography, Upload, UploadProps } from 'antd'
import React, { FC } from 'react'

import { renderUploadedReadonlyFile } from 'modules/attachment/utils'
import AttachmentList from 'modules/task/components/AttachmentList'
import TaskAssignee from 'modules/task/components/TaskAssignee'
import { makeUserByFullName } from 'modules/user/utils'
import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'
import { getRelocateFromTo } from 'modules/warehouse/utils/relocationTask'

import UploadButton from 'components/Buttons/UploadButton'
import Label from 'components/Label'
import Space from 'components/Space'

import { checkLastItem } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { RelocationTaskListProps } from './types'

const { Text } = Typography

const showUploadListConfig: UploadProps['showUploadList'] = { showRemoveIcon: false }

const RelocationTaskList: FC<RelocationTaskListProps> = ({ data, onClick, onCreateAttachment }) => {
  return (
    <Space data-testid='relocation-task-list' $block direction='vertical'>
      {data.length ? (
        data.map((item, index, array) => (
          <Space
            data-testid={`relocation-task-list-item-${item.id}`}
            $block
            direction='vertical'
            key={item.id}
            onClick={() => onClick(item.id)}
          >
            <Space $block direction='vertical'>
              <Text type='secondary'>до {formatDate(item.deadlineAt)}</Text>

              <Text strong>{getRelocateFromTo(item)}</Text>

              <Row justify='space-between'>
                <Col span={12}>
                  <Space $block direction='vertical'>
                    <Label label='Статус:' direction='horizontal'>
                      <Text>{relocationTaskStatusDict[item.status]}</Text>
                    </Label>

                    <Label label='Документы:' onClick={(event) => event.stopPropagation()}>
                      <Upload
                        multiple
                        customRequest={onCreateAttachment(item.id)}
                        showUploadList={showUploadListConfig}
                        itemRender={renderUploadedReadonlyFile}
                      >
                        <UploadButton label='Добавить вложение' />
                      </Upload>

                      {!!item.documents?.length && <AttachmentList data={item.documents} />}
                    </Label>
                  </Space>
                </Col>

                <Col span={12}>
                  <Space $block direction='vertical' align='center'>
                    <Label label='Дата создания:' direction='horizontal'>
                      {formatDate(item.createdAt)}
                    </Label>

                    <Label label='Исполнитель:'>
                      {item.executor && (
                        <TaskAssignee
                          {...makeUserByFullName(item.executor.fullName)}
                          phone={item.executor.phone}
                        />
                      )}
                    </Label>
                  </Space>
                </Col>
              </Row>
            </Space>

            {!checkLastItem(index, array) && <Divider />}
          </Space>
        ))
      ) : (
        <Text>Перемещений нет</Text>
      )}
    </Space>
  )
}

export default RelocationTaskList
