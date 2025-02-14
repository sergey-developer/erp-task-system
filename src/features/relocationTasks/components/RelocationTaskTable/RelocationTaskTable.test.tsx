import {
  relocationTaskStatusDict,
  relocationTaskTypeDict,
} from 'features/relocationTasks/constants'

import { formatDate } from 'shared/utils/date'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import {
  props,
  relocationTaskListItem,
} from '_tests_/features/warehouse/components/RelocationTaskTable/constants'
import { relocationTaskTableTestUtils } from '_tests_/features/warehouse/components/RelocationTaskTable/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, tableTestUtils } from '_tests_/utils'

import RelocationTaskTable from './index'

afterEach(() => {
  const onRow = props.onRow as jest.Mock
  const onChange = props.onChange as jest.Mock

  onRow.mockReset()
  onChange.mockReset()
})

describe.skip('Таблица заявок на перемещение оборудования', () => {
  test('Отображается корректно', () => {
    render(<RelocationTaskTable {...props} />)

    const table = relocationTaskTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = relocationTaskTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Пагинация работает', async () => {
    const relocationTasks = warehouseFixtures.relocationTasks(11)

    const { user } = render(<RelocationTaskTable {...props} dataSource={relocationTasks} />)

    const table = relocationTaskTableTestUtils.getContainer()
    await tableTestUtils.clickPaginationNextButtonIn(user, table)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    relocationTasks.slice(-1).forEach((item) => {
      const row = relocationTaskTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('При клике на строку обработчик вызывается корректно', async () => {
    const { user } = render(<RelocationTaskTable {...props} />)

    await relocationTaskTableTestUtils.clickRow(user, props.dataSource[0].id)

    expect(props.onRow).toBeCalled()
    expect(props.onRow).toBeCalledWith(props.dataSource[0], 0)
  })

  test.skip('Можно установить сортировку по умолчанию', () => {
    render(<RelocationTaskTable {...props} sort='-deadline_at' />)
    const headCell = relocationTaskTableTestUtils.getHeadCell('Срок выполнения')
    expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)
  })

  describe('Тип заявки', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = relocationTaskTableTestUtils.getHeadCell('Тип заявки')
      const title = relocationTaskTableTestUtils.getColTitle('Тип заявки')
      const value = relocationTaskTableTestUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskTypeDict[relocationTaskListItem.type],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Тип заявки')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Тип заявки')
      const headCell = relocationTaskTableTestUtils.getHeadCell('Тип заявки')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Тип заявки')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Тип заявки')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Срок выполнения', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = relocationTaskTableTestUtils.getHeadCell('Срок выполнения')
      const title = relocationTaskTableTestUtils.getColTitle('Срок выполнения')
      const value = relocationTaskTableTestUtils.getColValue(
        relocationTaskListItem.id,
        formatDate(relocationTaskListItem.deadlineAt),
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Срок выполнения')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Срок выполнения')
      const headCell = relocationTaskTableTestUtils.getHeadCell('Срок выполнения')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Срок выполнения')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Срок выполнения')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Объект выбытия', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = relocationTaskTableTestUtils.getHeadCell('Объект выбытия')
      const title = relocationTaskTableTestUtils.getColTitle('Объект выбытия')
      const value = relocationTaskTableTestUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.relocateFrom!.title,
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Объект выбытия')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Объект выбытия')
      const headCell = relocationTaskTableTestUtils.getHeadCell('Объект выбытия')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Объект выбытия')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Объект выбытия')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Объект прибытия', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = relocationTaskTableTestUtils.getHeadCell('Объект прибытия')
      const title = relocationTaskTableTestUtils.getColTitle('Объект прибытия')
      const value = relocationTaskTableTestUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.relocateTo!.title,
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Объект прибытия')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Объект прибытия')
      const headCell = relocationTaskTableTestUtils.getHeadCell('Объект прибытия')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Объект прибытия')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Объект прибытия')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Исполнитель', () => {
    test('Отображается тот кто завершил заявку если он есть', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = relocationTaskTableTestUtils.getHeadCell('Исполнитель')
      const title = relocationTaskTableTestUtils.getColTitle('Исполнитель')
      const value = relocationTaskTableTestUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.completedBy!.fullName,
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Отображаются исполнители если нет того кто завершил заявку', () => {
      const relocationTaskListItem = warehouseFixtures.relocationTaskListItem({ completedBy: null })

      render(<RelocationTaskTable {...props} dataSource={[relocationTaskListItem]} />)

      const headCell = relocationTaskTableTestUtils.getHeadCell('Исполнитель')
      const title = relocationTaskTableTestUtils.getColTitle('Исполнитель')

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      relocationTaskListItem.executors.forEach((e) => {
        const value = relocationTaskTableTestUtils.getColValue(
          relocationTaskListItem.id,
          e.fullName,
        )
        expect(value).toBeInTheDocument()
      })
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Исполнитель')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Исполнитель')
      const headCell = relocationTaskTableTestUtils.getHeadCell('Исполнитель')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Исполнитель')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Исполнитель')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Контролер', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = relocationTaskTableTestUtils.getHeadCell('Контролер')
      const title = relocationTaskTableTestUtils.getColTitle('Контролер')
      const value = relocationTaskTableTestUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.controller!.fullName,
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Контролер')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Контролер')
      const headCell = relocationTaskTableTestUtils.getHeadCell('Контролер')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Контролер')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Контролер')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Статус', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = relocationTaskTableTestUtils.getHeadCell('Статус')
      const title = relocationTaskTableTestUtils.getColTitle('Статус')
      const value = relocationTaskTableTestUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskStatusDict[relocationTaskListItem.status],
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Статус')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Статус')
      const headCell = relocationTaskTableTestUtils.getHeadCell('Статус')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Статус')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Статус')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Инициатор', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = relocationTaskTableTestUtils.getHeadCell('Инициатор')
      const title = relocationTaskTableTestUtils.getColTitle('Инициатор')
      const value = relocationTaskTableTestUtils.getColValue(
        relocationTaskListItem.id,
        relocationTaskListItem.createdBy!.fullName,
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Инициатор')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Инициатор')
      const headCell = relocationTaskTableTestUtils.getHeadCell('Инициатор')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Инициатор')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Инициатор')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Создано', () => {
    test('Отображается корректно', () => {
      render(<RelocationTaskTable {...props} />)

      const headCell = relocationTaskTableTestUtils.getHeadCell('Создано')
      const title = relocationTaskTableTestUtils.getColTitle('Создано')
      const value = relocationTaskTableTestUtils.getColValue(
        relocationTaskListItem.id,
        formatDate(relocationTaskListItem.createdAt),
      )

      expect(headCell).toHaveClass(columnWithSortingClass)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Создано')

      expect(props.onChange).toBeCalledTimes(1)
      expect(props.onChange).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<RelocationTaskTable {...props} />)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Создано')
      const headCell = relocationTaskTableTestUtils.getHeadCell('Создано')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Создано')
      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      await relocationTaskTableTestUtils.clickColTitle(user, 'Создано')
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })
})
