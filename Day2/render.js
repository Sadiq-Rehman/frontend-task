import { formatDate, getStatusLabel } from './utils.js';

export const renderTaskCard = (task) => {
  const { id, title, completed, priority = 'Medium', dueDate } = task;

  const statusClass = completed ? 'completed' : '';
  const statusText = getStatusLabel(completed);
  const formattedDate = formatDate(dueDate);

  return `
    <div class="task-card ${statusClass}" data-id="${id}">
      <div class="task-header">
        <h3>${title}</h3>
        <span class="badge">${priority}</span>
      </div>
      <p class="task-date">Due: ${formattedDate}</p>
      <p class="task-status">Status: <strong>${statusText}</strong></p>
      <div class="task-actions">
        <!-- Dataset attributes for event delegation -->
        <button class="btn-sm" data-action="toggle" data-id="${id}">
          ${completed ? 'Mark Pending' : 'Complete'}
        </button>
        <button class="btn-sm" data-action="edit" data-id="${id}">Edit</button>
        <button class="btn-sm btn-danger" data-action="delete" data-id="${id}">Delete</button>
      </div>
    </div>
  `;
};

export const renderTaskList = (tasks = [], containerElement) => {
  if (!containerElement) return;

  if (tasks.length === 0) {
    containerElement.innerHTML = '<p class="text-muted">No tasks available.</p>';
    return;
  }

  containerElement.innerHTML = tasks.map(task => renderTaskCard(task)).join('');
};