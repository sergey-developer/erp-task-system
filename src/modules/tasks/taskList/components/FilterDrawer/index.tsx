import React, { FC, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxProps,
  DrawerProps,
  Input,
  InputProps,
  Radio,
  RadioProps,
  Space,
  TimeRangePickerProps
} from 'antd';
import { Moment } from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import { TaskStatusEnum } from 'modules/tasks/taskList/components/TaskListPage/constants';
import BidColumn from "modules/tasks/taskList/components/TaskTable/BidColumn";
import FilterBlock from "./FilterBlock";
import FilterBlockLabel from "./FilterBlockLabel";
import { taskStatusDictionary } from './constants';
import {DrawerStyled, RadioGroupStyled, RangePickerStyled, TaskStatusList} from './styles';

const searchableFields = {
  topic: 'Тема',
  object: 'Объект',
  executor: 'Исполнитель',
}

type Props = {
  onClose: () => void
  // todo: add typings
  onSubmit: (result: any) => void
}

const FilterDrawer: FC<Props> = (props) => {
  const { onClose, onSubmit } = props;

  const [isVisible, setIsVisible] = useState<boolean>(true);

  const [checkedTaskStatuses, setCheckedTaskStatuses] = useState<TaskStatusEnum[]>([]);

  const [creationRange, setCreationRange] = useState<RangeValue<Moment>>(null);

  const [keywordFieldName, setKeywordFieldName] = useState<keyof typeof searchableFields>('topic');

  const [keywordValue, setKeywordValue] = useState<string>('');

  const handleAfterVisibleChange: DrawerProps['afterVisibleChange'] = (visible) => {
    if (!visible) {
      onClose();
    }
  }

  const handleCreationRangeChange: TimeRangePickerProps['onChange'] = (range) => {
    setCreationRange(range)
  }

  const handleKeywordFieldNameChange: RadioProps['onChange'] = (evt) => {
    setKeywordFieldName(evt.target.value);
  }

  const handleKeywordValueChange: InputProps['onChange'] = (evt) => {
    setKeywordValue(evt.target.value);
  }

  const handleResetAll = () => {
    setCheckedTaskStatuses([]);
    setCreationRange(null);
    setKeywordFieldName('topic');
    setKeywordValue('');
  }

  const handleSubmit = () => {
    const result = {
      creationRange: creationRange && creationRange.map(date => date?.toDate()),
      keywordFieldName,
      keywordValue,
      taskStatuses: checkedTaskStatuses.length ? checkedTaskStatuses : null,
    }

    console.log('result', result);
    onSubmit(result);
    setIsVisible(false);
  }

  const handleTaskStatusCheck: CheckboxProps['onChange'] = (evt) => {
    if (evt.target.checked) {
      setCheckedTaskStatuses(prev => [...prev, (evt.target.name as TaskStatusEnum)]);
      return;
    }
    setCheckedTaskStatuses(prev => prev.filter(taskStatus => taskStatus !== evt.target.name));
  }

  return (
    <DrawerStyled
      afterVisibleChange={handleAfterVisibleChange}
      extra={
        <Space>
          <Button onClick={handleResetAll}>Сбросить все</Button>
          <Button type="primary" onClick={handleSubmit}>
            Применить
          </Button>
        </Space>
      }
      title="Фильтры"
      placement="left"
      width={500}
      onClose={() => setIsVisible(false)}
      visible={isVisible}
    >
      <FilterBlock withDivider>
        <FilterBlockLabel
          onReset={() => setCheckedTaskStatuses([])}
        >
          Статус
        </FilterBlockLabel>
        <TaskStatusList>
          {Object.values(TaskStatusEnum).map((taskStatus) => (
            <li key={taskStatus}>
              <Checkbox
                checked={checkedTaskStatuses.includes(taskStatus)}
                name={taskStatus}
                onChange={handleTaskStatusCheck}
              >
                <BidColumn status={taskStatus} value={taskStatusDictionary[taskStatus]}/>
              </Checkbox>
            </li>
          ))}
        </TaskStatusList>
      </FilterBlock>
      <FilterBlock withDivider>
        <FilterBlockLabel
          onReset={() => setCreationRange(null)}
        >
          Период создания
        </FilterBlockLabel>
        <RangePickerStyled allowClear={false} onChange={handleCreationRangeChange} value={creationRange} />
      </FilterBlock>
      <FilterBlock withDivider={false}>
        <FilterBlockLabel
          onReset={() => {
            setKeywordFieldName('topic');
            setKeywordValue('');
          }}
        >
          Поиск по столбцу
        </FilterBlockLabel>
        <RadioGroupStyled onChange={handleKeywordFieldNameChange} value={keywordFieldName}>
          {Object.entries(searchableFields).map(([name, label]) => (
            <Radio key={name} value={name}>{label}</Radio>
          ))}
        </RadioGroupStyled>
        <Input onChange={handleKeywordValueChange} placeholder="Ключевое слово" value={keywordValue} />
      </FilterBlock>
    </DrawerStyled>
  )
}

export default FilterDrawer
