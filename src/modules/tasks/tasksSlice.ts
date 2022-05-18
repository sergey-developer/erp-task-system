import { createSlice } from '@reduxjs/toolkit'

import { ITasksSliceState } from './interfaces'

const initialState: ITasksSliceState = {
  selectedTask: null,
}

/** todo Заготовка для отображения карточки, если не надо - кикаем */
const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    unSetSelectedTask: () => {
      return initialState
    },
    setSelectedTask: (state, { payload }) => {
      return {
        ...state,
        selectedTask: payload,
      }
    },
  },
})

export default slice.reducer
