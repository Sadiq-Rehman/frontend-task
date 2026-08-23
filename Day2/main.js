import { generateId, sortTasksByTitle, normalizeSearchQuery } from './utils.js';
import { 
  saveTasks, loadTasks, 
  saveFilter, loadFilter, 
  saveSearchQuery, loadSearchQuery, 
  saveUserName, loadUserName, 
  saveNamePref, loadNamePref 
} from './storage.js';
import { fetchExternalTasks } from './api.js';
import { validateTaskInput } from './validation.js';
import { renderTaskList } from './render.js';

let tasks = loadTasks();
let currentFilter = loadFilter();
let currentSearch = loadSearchQuery();

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('task-container');
  const taskForm = document.getElementById('task-form');
  const searchInput = document.getElementById('search-input');
  const filterSelect = document.getElementById('filter-select');
  const fetchApiBtn = document.getElementById('fetch-api-btn');

  // Restore Search & Filter UI
  if (searchInput) searchInput.value = currentSearch;
  if (filterSelect) filterSelect.value = currentFilter;

  // Restore User Profile State
  const nameForm = document.getElementById('name-form');
  const nameInput = document.getElementById('user-name-input');
  const saveCheckbox = document.getElementById('save-name-checkbox');
  const greetingEl = document.getElementById('welcome-greeting');

  const isSaveChecked = loadNamePref();
  if (saveCheckbox) saveCheckbox.checked = isSaveChecked;
  if (isSaveChecked) {
    const savedName = loadUserName();
    if (nameInput) nameInput.value = savedName;
    if (savedName && greetingEl) greetingEl.textContent = `Welcome back, ${savedName}!`;
  }

  // Filter & Search computation
  const getFilteredAndSortedTasks = () => {
    let result = [...tasks];

    if (currentSearch) {
      const q = normalizeSearchQuery(currentSearch);
      result = result.filter(task => normalizeSearchQuery(task.title).includes(q));
    }

    if (currentFilter === 'completed') {
      result = result.filter(task => task.completed);
    } else if (currentFilter === 'pending') {
      result = result.filter(task => !task.completed);
    }

    return sortTasksByTitle(result);
  };

  renderTaskList(getFilteredAndSortedTasks(), container);

  // Search Event Listener
  searchInput?.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    saveSearchQuery(currentSearch);
    renderTaskList(getFilteredAndSortedTasks(), container);
  });

  // Filter Event Listener
  filterSelect?.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    saveFilter(currentFilter);
    renderTaskList(getFilteredAndSortedTasks(), container);
  });

  // Add Task Form Submission
  taskForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('task-title-input');
    const dateInput = document.getElementById('task-date-input');
    const priorityInput = document.getElementById('task-priority-input');

    const titleError = document.getElementById('title-error');
    const dateError = document.getElementById('date-error');

    [titleInput, dateInput].forEach(inp => inp?.removeAttribute('aria-invalid'));
    [titleError, dateError].forEach(el => { if (el) el.textContent = ''; });

    const title = titleInput?.value ?? '';
    const dueDate = dateInput?.value ?? '';
    const priority = priorityInput?.value ?? 'Medium';

    const validation = validateTaskInput(title, dueDate, priority);
    if (!validation.isValid) {
      if (validation.errors.title && titleInput && titleError) {
        titleInput.setAttribute('aria-invalid', 'true');
        titleError.textContent = validation.errors.title;
      }
      if (validation.errors.dueDate && dateInput && dateError) {
        dateInput.setAttribute('aria-invalid', 'true');
        dateError.textContent = validation.errors.dueDate;
      }
      return;
    }

    const newTask = { id: generateId(), title: title.trim(), completed: false, priority, dueDate };
    tasks.push(newTask);
    saveTasks(tasks);
    renderTaskList(getFilteredAndSortedTasks(), container);
    taskForm.reset();
  });

  // API Panel Fetch Button
  fetchApiBtn?.addEventListener('click', async () => {
    const apiTasks = await fetchExternalTasks();
    if (apiTasks.length > 0) {
      tasks = [...tasks, ...apiTasks];
      saveTasks(tasks);
      renderTaskList(getFilteredAndSortedTasks(), container);
    }
  });

  // Event Delegation for CRUD Actions (Toggle, Edit, Delete)
  container?.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('button[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const taskId = actionBtn.dataset.id;
    if (!taskId) return;

    if (action === 'toggle') {
      tasks = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    } else if (action === 'delete') {
      tasks = tasks.filter(t => t.id !== taskId);
    } else if (action === 'edit') {
      const taskToEdit = tasks.find(t => t.id === taskId);
      if (!taskToEdit) return;
      const newTitle = prompt('Edit task title:', taskToEdit.title);
      if (newTitle !== null && newTitle.trim() !== '') {
        tasks = tasks.map(t => t.id === taskId ? { ...t, title: newTitle.trim() } : t);
      }
    }

    saveTasks(tasks);
    renderTaskList(getFilteredAndSortedTasks(), container);
  });

  // Name Form Submission
  nameForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredName = nameInput?.value.trim() ?? '';
    const isChecked = saveCheckbox?.checked ?? false;

    saveNamePref(isChecked);
    if (isChecked && enteredName) {
      saveUserName(enteredName);
      if (greetingEl) greetingEl.textContent = `Welcome back, ${enteredName}!`;
    } else {
      saveUserName('');
      localStorage.removeItem('task_manager_user_name');
      if (greetingEl) greetingEl.textContent = '';
    }
  });
});