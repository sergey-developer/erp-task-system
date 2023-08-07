import { AddOrEditGroupModalProps } from "./index";
import { fakeWord, render } from "_tests_/utils";

const props: AddOrEditGroupModalProps = {
  visible: true,
  title: fakeWord(),
  okText: fakeWord(),
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

export const testUtils = {}

describe('Модалка создания и редактирования номенклатурной группы', () => {

})
