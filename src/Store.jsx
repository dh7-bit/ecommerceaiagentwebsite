import { createSlice, configureStore } from '@reduxjs/toolkit';

// Load cart from localStorage if available
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  task: savedCart
};

const handlelocal = (cut) => {
  localStorage.setItem("cart", JSON.stringify(cut));
};

const taskReducer = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action) {
      const exist = state.task.findIndex((curr) => curr.id === action.payload.id);
      if (exist >= 0) {
        state.task[exist].quantity = action.payload.quantity;
        state.task[exist].price = action.payload.price;
      } else {
        state.task.push(action.payload);
      }
      handlelocal(state.task);
    },
    decreaseTask(state, action) {
      const exist = state.task.findIndex((curr) => curr.id === action.payload.id);
      if (exist >= 0) {
        state.task[exist].quantity = action.payload.quantity;
        state.task[exist].price = action.payload.price;
      }
      handlelocal(state.task);
    },
    deleteitem(state, action) {
      state.task = state.task.filter((curr) => curr.id !== action.payload.id);
      handlelocal(state.task);
    }
  }
});

export const store = configureStore({
  reducer: {
    task: taskReducer.reducer
  }
});

export const { addTask, decreaseTask, deleteitem } = taskReducer.actions;
