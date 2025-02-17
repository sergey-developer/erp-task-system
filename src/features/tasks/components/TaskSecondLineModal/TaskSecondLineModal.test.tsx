import { waitFor } from '@testing-library/react'
import { UserPermissionsEnum } from 'features/users/api/constants'

import { validationMessages } from 'shared/constants/validation'
import { WorkGroupTypeEnum } from 'shared/workGroups/api/constants'

import { props } from '_tests_/features/tasks/components/TaskSecondLineModal/constants'
import { taskSecondLineModalTestUtils } from '_tests_/features/tasks/components/TaskSecondLineModal/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import { fakeWord, render, selectTestUtils, setupApiTests } from '_tests_/helpers'
import { mockGetWorkGroupsSuccess, mockGetWorkTypesSuccess } from '_tests_/mocks/api'

import TaskSecondLineModal from './index'

setupApiTests()

describe('Модалка перевода заявки на 2-ю линию', () => {
  test('Заголовок и текст отображается корректно', () => {
    mockGetWorkGroupsSuccess()

    render(<TaskSecondLineModal {...props} />)

    expect(taskSecondLineModalTestUtils.getChildByText(String(props.recordId))).toBeInTheDocument()
    expect(taskSecondLineModalTestUtils.getChildByText(/перевод заявки/i)).toBeInTheDocument()
    expect(taskSecondLineModalTestUtils.getChildByText(/на II линию/i)).toBeInTheDocument()

    expect(
      taskSecondLineModalTestUtils.getChildByText(
        'Выберите рабочую группу II линии, в которую хотите направить заявку для дальнейшей работы. Нажмите кнопку «Перевести заявку».',
      ),
    ).toBeInTheDocument()

    expect(
      taskSecondLineModalTestUtils.getChildByText(
        'Заявка исчезнет из вашей очереди заявок. Просмотр заявки и работа с ней будут недоступны.',
      ),
    ).toBeInTheDocument()
  })

  describe('Поле выбора рабочей группы', () => {
    test('Поле отображается корректно', async () => {
      mockGetWorkGroupsSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()

      const title = taskSecondLineModalTestUtils.getChildByText('Рабочая группа')
      const placeholder = taskSecondLineModalTestUtils.getChildByText('Выберите рабочую группу')
      const input = taskSecondLineModalTestUtils.getWorkGroupField()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(title).toBeInTheDocument()
      expect(placeholder).toBeInTheDocument()
    })

    describe('Имеет верное значение по умолчанию', () => {
      test(`Если есть группа с типом ${WorkGroupTypeEnum.AssociatedWithSapId}`, async () => {
        const workGroups = [
          workGroupFixtures.workGroupListItem({
            priority: workGroupFixtures.workGroupPriority({
              type: WorkGroupTypeEnum.AssociatedWithSapId,
            }),
          }),
          workGroupFixtures.workGroupListItem({
            priority: workGroupFixtures.workGroupPriority({
              type: WorkGroupTypeEnum.NoType,
            }),
          }),
        ]

        mockGetWorkGroupsSuccess({ body: workGroups })

        render(<TaskSecondLineModal {...props} />)

        await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()

        await waitFor(() => {
          expect(taskSecondLineModalTestUtils.getSelectedWorkGroup()).toBeInTheDocument()
        })

        expect(
          taskSecondLineModalTestUtils.getSelectedWorkGroupText(
            taskSecondLineModalTestUtils.getSelectedWorkGroup()!,
            workGroups[0].name,
          ),
        ).toBeInTheDocument()
      })

      test(`Если есть группа с типом ${WorkGroupTypeEnum.DefaultForSupportGroup}`, async () => {
        const workGroups = [
          workGroupFixtures.workGroupListItem({
            priority: workGroupFixtures.workGroupPriority({
              type: WorkGroupTypeEnum.DefaultForSupportGroup,
            }),
          }),
          workGroupFixtures.workGroupListItem({
            priority: workGroupFixtures.workGroupPriority({
              type: WorkGroupTypeEnum.NoType,
            }),
          }),
        ]

        mockGetWorkGroupsSuccess({ body: workGroups })

        render(<TaskSecondLineModal {...props} />)

        await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()

        await waitFor(() => {
          expect(taskSecondLineModalTestUtils.getSelectedWorkGroup()).toBeInTheDocument()
        })

        expect(
          taskSecondLineModalTestUtils.getSelectedWorkGroupText(
            taskSecondLineModalTestUtils.getSelectedWorkGroup()!,
            workGroups[0].name,
          ),
        ).toBeInTheDocument()
      })
    })

    describe('Не имеет значения по умолчанию', () => {
      test(`Если нет группы с типом ${WorkGroupTypeEnum.AssociatedWithSapId} или ${WorkGroupTypeEnum.DefaultForSupportGroup}`, async () => {
        const workGroups = workGroupFixtures.workGroups(2)
        mockGetWorkGroupsSuccess({ body: workGroups })

        render(<TaskSecondLineModal {...props} />)

        await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
        expect(taskSecondLineModalTestUtils.getSelectedWorkGroup()).not.toBeInTheDocument()
      })
    })

    test('Отображает верное количество вариантов', async () => {
      const workGroups = workGroupFixtures.workGroups()
      mockGetWorkGroupsSuccess({ body: workGroups })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      await taskSecondLineModalTestUtils.openWorkGroupField(user)

      expect(
        workGroups.map((workGroup) =>
          taskSecondLineModalTestUtils.getWorkGroupOption(workGroup.id),
        ),
      ).toHaveLength(workGroups.length)
    })

    test('Корректно отображает варианты', async () => {
      const workGroups = workGroupFixtures.workGroups()
      mockGetWorkGroupsSuccess({ body: workGroups })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      await taskSecondLineModalTestUtils.openWorkGroupField(user)

      workGroups.forEach((workGroup) => {
        const option = taskSecondLineModalTestUtils.getWorkGroupOption(workGroup.id)
        const optionText = taskSecondLineModalTestUtils.getWorkGroupOptionText(
          option,
          workGroup.name,
        )

        expect(option.title).toBe(workGroup.priority!.description)
        expect(optionText).toBeInTheDocument()
      })
    })

    test('Корректно отображает варианты с приоритетом >= 4', async () => {
      const workGroups = [
        workGroupFixtures.workGroupListItem({
          priority: workGroupFixtures.workGroupPriority({ value: 4 }),
        }),
      ]
      mockGetWorkGroupsSuccess({ body: workGroups })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      await taskSecondLineModalTestUtils.openWorkGroupField(user)

      workGroups.forEach((workGroup) => {
        const option = taskSecondLineModalTestUtils.getWorkGroupOption(workGroup.id)
        const optionText = taskSecondLineModalTestUtils.getWorkGroupOptionText(
          option,
          workGroup.name,
        )

        expect(optionText).not.toHaveStyle('font-weight: bold')
      })
    })

    test('Корректно отображает варианты с приоритетом < 4', async () => {
      const workGroups = [
        workGroupFixtures.workGroupListItem({
          priority: workGroupFixtures.workGroupPriority({ value: 3 }),
        }),
      ]
      mockGetWorkGroupsSuccess({ body: workGroups })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      await taskSecondLineModalTestUtils.openWorkGroupField(user)

      workGroups.forEach((workGroup) => {
        const option = taskSecondLineModalTestUtils.getWorkGroupOption(workGroup.id)
        const optionText = taskSecondLineModalTestUtils.getWorkGroupOptionText(
          option,
          workGroup.name,
        )
        expect(optionText).toHaveStyle('font-weight: bold')
      })
    })

    test('Можно выбрать рабочую группу', async () => {
      const workGroups = workGroupFixtures.workGroups()
      mockGetWorkGroupsSuccess({ body: workGroups })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      await taskSecondLineModalTestUtils.openWorkGroupField(user)
      await taskSecondLineModalTestUtils.selectWorkGroup(user, workGroups[0].name)

      expect(taskSecondLineModalTestUtils.getSelectedWorkGroup()).toBeInTheDocument()
    })

    test('Отображает ошибку если не выбрать группу и нажать кнопку отправки', async () => {
      const workGroups = workGroupFixtures.workGroups()
      mockGetWorkGroupsSuccess({ body: workGroups })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      await taskSecondLineModalTestUtils.clickSubmitButton(user)

      expect(
        await taskSecondLineModalTestUtils.findWorkGroupError(validationMessages.required),
      ).toBeInTheDocument()
    })
  })

  describe('Поле комментария', () => {
    test('Отображается корректно', async () => {
      mockGetWorkGroupsSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      const label = taskSecondLineModalTestUtils.getCommentFieldLabel()
      const field = taskSecondLineModalTestUtils.getCommentField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      mockGetWorkGroupsSuccess({ body: [] })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()

      const value = fakeWord()
      const field = await taskSecondLineModalTestUtils.setComment(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Поле для пометки рабочей группы по умолчанию', () => {
    test('Отображается корректно', async () => {
      mockGetWorkGroupsSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      const field = taskSecondLineModalTestUtils.getMarkDefaultGroupField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toBeChecked()
    })

    test('Можно установить значение', async () => {
      mockGetWorkGroupsSuccess({ body: [] })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      const field = await taskSecondLineModalTestUtils.setMarkDefaultGroup(user)

      expect(field).toBeChecked()
    })
  })

  describe('Тип работ', () => {
    test('Отображается', async () => {
      mockGetWorkGroupsSuccess({ body: [] })

      const workTypeCatalogItem = catalogsFixtures.workTypeCatalogItem()
      const workTypes = [workTypeCatalogItem]
      mockGetWorkTypesSuccess({ body: workTypes })

      const { user } = render(
        <TaskSecondLineModal {...props} permissions={{ classificationOfWorkTypes: true }} />,
      )

      await taskSecondLineModalTestUtils.expectWorkTypeLoadingFinished()
      const input = taskSecondLineModalTestUtils.getWorkTypeSelectInput()
      await taskSecondLineModalTestUtils.openWorkTypeSelect(user)
      const selectedWorkType = taskSecondLineModalTestUtils.querySelectedWorkType(
        workTypeCatalogItem.title,
      )

      expect(input).toBeInTheDocument()
      expect(selectedWorkType).not.toBeInTheDocument()
      workTypes.forEach((wt) => {
        const option = selectTestUtils.getSelectOption(wt.title)
        expect(option).toBeInTheDocument()
      })
    })

    test(`Активно если есть права ${UserPermissionsEnum.ClassificationOfWorkTypes}`, async () => {
      mockGetWorkGroupsSuccess({ body: [] })
      mockGetWorkTypesSuccess()

      render(<TaskSecondLineModal {...props} permissions={{ classificationOfWorkTypes: true }} />)

      await taskSecondLineModalTestUtils.expectWorkTypeLoadingFinished()
      const input = taskSecondLineModalTestUtils.getWorkTypeSelectInput()
      expect(input).toBeEnabled()
    })

    test(`Не активно если нет права ${UserPermissionsEnum.ClassificationOfWorkTypes}`, async () => {
      mockGetWorkGroupsSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} permissions={{ classificationOfWorkTypes: false }} />)

      await taskSecondLineModalTestUtils.expectWorkTypeLoadingFinished()
      const input = taskSecondLineModalTestUtils.getWorkTypeSelectInput()
      expect(input).toBeDisabled()
    })

    test('Можно выбрать значение', async () => {
      mockGetWorkGroupsSuccess({ body: [] })

      const workTypeCatalogItem = catalogsFixtures.workTypeCatalogItem()
      mockGetWorkTypesSuccess({ body: [workTypeCatalogItem] })

      const { user } = render(
        <TaskSecondLineModal {...props} permissions={{ classificationOfWorkTypes: true }} />,
      )

      await taskSecondLineModalTestUtils.expectWorkTypeLoadingFinished()
      await taskSecondLineModalTestUtils.openWorkTypeSelect(user)
      await taskSecondLineModalTestUtils.setWorkType(user, workTypeCatalogItem.title)
      const selectedWorkType = taskSecondLineModalTestUtils.getSelectedWorkType(
        workTypeCatalogItem.title,
      )

      expect(selectedWorkType).toBeInTheDocument()
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      mockGetWorkGroupsSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />)

      const button = taskSecondLineModalTestUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состоянии загрузки', async () => {
      mockGetWorkGroupsSuccess({ body: [] })
      render(<TaskSecondLineModal {...props} isLoading />)
      await taskSecondLineModalTestUtils.expectLoadingStarted()
    })

    describe('Обработчик вызывается корректно', () => {
      test('Если заполнить обязательные поля', async () => {
        const workGroups = workGroupFixtures.workGroups()
        mockGetWorkGroupsSuccess({ body: workGroups })

        const { user } = render(<TaskSecondLineModal {...props} />)

        await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
        await taskSecondLineModalTestUtils.openWorkGroupField(user)
        await taskSecondLineModalTestUtils.selectWorkGroup(user, workGroups[0].name)
        await taskSecondLineModalTestUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
      })

      test('Если не заполнить обязательные поля', async () => {
        const workGroups = workGroupFixtures.workGroups()
        mockGetWorkGroupsSuccess({ body: workGroups })

        const { user } = render(<TaskSecondLineModal {...props} />)

        await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
        await taskSecondLineModalTestUtils.clickSubmitButton(user)

        expect(props.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      mockGetWorkGroupsSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />)

      const button = taskSecondLineModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      mockGetWorkGroupsSuccess({ body: [] })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      mockGetWorkGroupsSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />)

      const button = taskSecondLineModalTestUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      mockGetWorkGroupsSuccess({ body: [] })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await taskSecondLineModalTestUtils.clickCloseButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
