// ==========================================
// 1. ID Generator Helper
// ==========================================
export const generateId = () => {
  return 'task_' + Math.random().toString(36).substring(2, 9);
};

// ==========================================
// 2. Date Formatting Helper
// ==========================================
export const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  try {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    console.error('Invalid date format:', error);
    return dateString;
  }
};

// ==========================================
// 3. Status Labels Helper
// ==========================================
export const getStatusLabel = (completed) => {
  return completed ? 'Completed' : 'Pending';
};

// ==========================================
// 4. Search Normalization Helper
// ==========================================
export const normalizeSearchQuery = (query = '') => {
  return query
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Removes accents and standardizes text for searching
};

// ==========================================
// 5. Flexible Sorting Helpers
// ==========================================
export const sortTasks = (tasks = [], sortBy = 'title', ascending = true) => {
  return [...tasks].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle string comparisons (case-insensitive)
    if (typeof valA === 'string' && typeof valB === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
      return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    // Handle number/date/boolean comparisons
    return ascending ? valA - valB : valB - valA;
  });
};

export const sortTasksByTitle = (tasks = []) => {
  return sortTasks(tasks, 'title', true);
};

// ==========================================
// 6. Array Statistics Helper (Reduce)
// ==========================================
export const getTaskStats = (tasks = []) => {
  return tasks.reduce(
    (stats, task) => {
      stats.total++;
      if (task.completed) {
        stats.completed++;
      } else {
        stats.pending++;
      }
      return stats;
    },
    { total: 0, completed: 0, pending: 0 }
  );
};