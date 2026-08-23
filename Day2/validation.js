export function validateTaskInput(title, dueDate, priority) {
  const errors = {};

  // Title validation
  if (!title || title.trim() === '') {
    errors.title = 'Task title is required.';
  } else if (title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long.';
  }

  // Due Date validation
  if (!dueDate) {
    errors.dueDate = 'Due date is required.';
  } else {
    const selectedDate = new Date(dueDate);
    if (isNaN(selectedDate.getTime())) {
      errors.dueDate = 'Please enter a valid date.';
    }
  }

  // Priority validation
  const validPriorities = ['Low', 'Medium', 'High'];
  if (!priority || !validPriorities.includes(priority)) {
    errors.priority = 'Please select a valid priority (Low, Medium, High).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}