import { useState } from 'react';

export function TaskListManager() {
  // 1. Dynamic Array State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React Dynamic Arrays & Keys', priority: 'High', status: 'In Progress' },
    { id: 2, title: 'Implement Spring Boot Security', priority: 'Medium', status: 'Pending' },
    { id: 3, title: 'Configure MySQL Docker Container', priority: 'Low', status: 'Completed' }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  // Add new item to dynamic array
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(), // Unique key generation
      title: newTaskTitle,
      priority: newTaskPriority,
      status: 'Pending'
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  // Conditional Action: Toggle task status
  const handleToggleStatus = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        let nextStatus = 'Pending';
        if (task.status === 'Pending') nextStatus = 'In Progress';
        else if (task.status === 'In Progress') nextStatus = 'Completed';
        else nextStatus = 'Pending';
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  // Conditional Action: Delete record from array
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Helper for Status Badges
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Completed':
        return { background: '#d1fae5', color: '#065f46', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' };
      case 'In Progress':
        return { background: '#fee3ad', color: '#b45309', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' };
      default:
        return { background: '#e2e8f0', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' };
    }
  };

  return (
    <div style={{ background: '#ffffff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
      <h3>Dynamic Task Manager</h3>

      {/* Input Form to Add Items */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="Enter new task..." 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <select 
          value={newTaskPriority} 
          onChange={(e) => setNewTaskPriority(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
          Add Task
        </button>
      </form>

      {/* Dynamic Array Rendering with Proper Keys & Empty State */}
      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', background: '#f8fafc', borderRadius: '8px', color: '#64748b' }}>
          <h4>No Tasks Found</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>You have completed all tasks or your list is empty.</p>
          <button 
            onClick={() => setTasks([{ id: 1, title: 'Sample Initial Task', priority: 'Medium', status: 'Pending' }])}
            style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}
          >
            Reset Default Tasks
          </button>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tasks.map((task) => (
            <li 
              key={task.id} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', borderBottom: '1px solid #f1f5f9' }}
            >
              <div>
                <span style={{ fontWeight: '500', marginRight: '0.8rem', textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
                {/* Status Badge */}
                <span style={getBadgeStyle(task.status)}>{task.status}</span>
              </div>

              {/* Conditional Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleToggleStatus(task.id)}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Progress Status
                </button>
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}