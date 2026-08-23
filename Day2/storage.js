// ==========================================
// LocalStorage Persistence Module
// ==========================================
const STORAGE_KEYS = {
  TASKS: 'task_manager_tasks',
  FILTER: 'task_manager_filter',
  SEARCH: 'task_manager_search',
  THEME: 'task_manager_theme',
  USER_NAME: 'task_manager_user_name',
  SAVE_NAME_PREF: 'task_manager_save_name_pref'
};

// Tasks Persistence
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const loadTasks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

// Filter Persistence
export const saveFilter = (filter) => {
  localStorage.setItem(STORAGE_KEYS.FILTER, filter);
};

export const loadFilter = () => {
  return localStorage.getItem(STORAGE_KEYS.FILTER) ?? 'all';
};

// Search Query Persistence
export const saveSearchQuery = (query) => {
  localStorage.setItem(STORAGE_KEYS.SEARCH, query);
};

export const loadSearchQuery = () => {
  return localStorage.getItem(STORAGE_KEYS.SEARCH) ?? '';
};

// Theme Preference Persistence
export const saveThemePreference = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

export const loadThemePreference = () => {
  return localStorage.getItem(STORAGE_KEYS.THEME) ?? 'dark';
};

// User Name Persistence
export const saveUserName = (name) => {
  localStorage.setItem(STORAGE_KEYS.USER_NAME, name);
};

export const loadUserName = () => {
  return localStorage.getItem(STORAGE_KEYS.USER_NAME) ?? '';
};

// Name Checkbox Preference Persistence
export const saveNamePref = (isChecked) => {
  localStorage.setItem(STORAGE_KEYS.SAVE_NAME_PREF, JSON.stringify(isChecked));
};

export const loadNamePref = () => {
  const pref = localStorage.getItem(STORAGE_KEYS.SAVE_NAME_PREF);
  return pref ? JSON.parse(pref) : false;
};