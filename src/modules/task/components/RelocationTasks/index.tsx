import { Col, Divider, Row, Typography, Upload, UploadProps } from 'antd'
import React, { FC } from 'react'

import Attachments from 'modules/attachment/components/Attachments'
import { renderUploadedReadonlyFile } from 'modules/attachment/utils'
import TaskAssignee from 'modules/task/components/TaskAssignee'
import { makeUserByFullName } from 'modules/user/utils'
import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'
import { getRelocateFromToTitle } from 'modules/warehouse/utils/relocationTask'

import UploadButton from 'components/Buttons/UploadButton'
import Label from 'components/Label'
import Space from 'components/Space'

import { checkLastItem } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { RelocationTasksProps } from './types'

const { Text } = Typography

const showUploadListConfig: UploadProps['showUploadList'] = { showRemoveIcon: false }

const RelocationTasks: FC<RelocationTasksProps> = ({ data, onClick, onCreateAttachment }) => {
  return (
    <Space data-testid='relocation-tasks' $block direction='vertical'>
      {data.length ? (
        data.map((item, index, array) => (
          <Space
            data-testid={`relocation-tasks-item-${item.id}`}
            $block
            direction='vertical'
            key={item.id}
            onClick={() => onClick(item.id)}
          >
            <Space $block direction='vertical'>
              <Text type='secondary'>до {formatDate(item.deadlineAt)}</Text>

              <Text strong>{getRelocateFromToTitle(item)}</Text>

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

                      {!!item.documents?.length && <Attachments data={item.documents} />}
                    </Label>
                  </Space>
                </Col>

                <Col span={12}>
                  <Space $block direction='vertical' align='center'>
                    <Label label='Дата создания:' direction='horizontal'>
                      {formatDate(item.createdAt)}
                    </Label>

                    <Label label='Исполнитель:'>
                      {item.completedBy ? (
                        <TaskAssignee
                          {...makeUserByFullName(item.completedBy.fullName)}
                          phone={item.completedBy.phone}
                        />
                      ) : (
                        <Space direction='vertical'>
                          {item.executors.map((e) => (
                            <TaskAssignee
                              key={e.id}
                              {...makeUserByFullName(e.fullName)}
                              phone={e.phone}
                            />
                          ))}
                        </Space>
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

export default RelocationTasks
