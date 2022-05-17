import { createSlice } from '@reduxjs/toolkit'

import { ITasksSliceState } from './interfaces'

const initialState: ITasksSliceState = {
  selectedTask: null,
}

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
