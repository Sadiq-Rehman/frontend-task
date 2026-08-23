export async function fetchExternalTasks() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Fallback due date (today's date in YYYY-MM-DD format)
    const today = new Date().toISOString().split('T')[0];

    return data.map(todo => ({
      id: 'api_' + todo.id,
      title: todo.title,
      completed: todo.completed,
      priority: 'Medium',
      dueDate: today
    }));
  } catch (error) {
    console.error('Failed to fetch external tasks:', error);
    return [];
  }
}