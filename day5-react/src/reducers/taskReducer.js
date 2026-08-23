// src/reducers/taskReducer.js
export const initialTaskState = {
  tasks: [],
  filterStatus: 'All',
  searchQuery: '',
};

export function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };

    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updatedFields, updatedAt: new Date().toISOString() }
            : task
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case 'SET_FILTER':
      return { ...state, filterStatus: action.payload };

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
}