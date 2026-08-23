// src/pages/TasksPage.jsx
import { useReducer, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialTasks, initialUsers } from '../data/mockData';
import { EditTaskModal } from '../components/EditTaskModal';
import { Modal } from '../components/Modal';
import { useToast } from '../context/ToastContext';
import { validators } from '../utils/validators';

// Reducer definition for centralized state management
function taskReducer(state, action) {
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

// Simulated asynchronous API call with a 30% failure rate for demonstration
const simulatedApiCall = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error('API request failed'));
      } else {
        resolve();
      }
    }, 500);
  });

export function TasksPage() {
  // Persist tasks, filter, search, and viewMode using our reusable useLocalStorage hook
  const [tasks, setTasks] = useLocalStorage('app_tasks', initialTasks);
  const [filterStatus, setFilterStatus] = useLocalStorage('app_task_filter', 'All');
  const [searchQuery, setSearchQuery] = useLocalStorage('app_task_search', '');
  const [viewMode, setViewMode] = useLocalStorage('app_task_view', 'table');

  const [users] = useLocalStorage('app_users', initialUsers);
  const toast = useToast();

  // Initialize useReducer combining persistent tasks and localized states
  const [state, dispatch] = useReducer(taskReducer, {
    tasks,
    filterStatus,
    searchQuery,
  });

  // Edit modal state
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Delete confirmation modal state
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignedTo: users[0]?.id || '',
    dueDate: '',
  });

  const [error, setError] = useState('');

  // Optimistic handler wrapper for create, update, and delete actions
  const executeOptimistically = async (optimisticAction, successMessage, errorMessage) => {
    // 1. Snapshot current tasks for potential rollback
    const previousTasks = [...tasks];

    // 2. Immediately apply update to UI (Optimistic Update) via both reducer and localStorage setter
    dispatch(optimisticAction);
    if (optimisticAction.type === 'ADD_TASK') {
      setTasks((prev) => [optimisticAction.payload, ...prev]);
    } else if (optimisticAction.type === 'UPDATE_TASK') {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === optimisticAction.payload.id
            ? { ...t, ...optimisticAction.payload.updatedFields, updatedAt: new Date().toISOString() }
            : t
        )
      );
    } else if (optimisticAction.type === 'DELETE_TASK') {
      setTasks((prev) => prev.filter((t) => t.id !== optimisticAction.payload));
    }

    try {
      // 3. Trigger simulated backend API call
      await simulatedApiCall();
      toast.success(successMessage);
    } catch {
      // 4. Rollback state if the API call fails
      dispatch({ type: 'SET_TASKS', payload: previousTasks });
      setTasks(previousTasks);
      toast.error(errorMessage);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!validators.required(newTask.title) || !validators.minLength(newTask.title, 3) || !validators.maxLength(newTask.title, 200)) {
      const errMsg = 'Task title is required and must be between 3 and 200 characters.';
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    setError('');
    const now = new Date().toISOString();
    const created = {
      id: `task-${Date.now()}`,
      ...newTask,
      status: 'Todo',
      createdAt: now,
      updatedAt: now,
    };

    setNewTask({ title: '', description: '', priority: 'Medium', assignedTo: users[0]?.id || '', dueDate: '' });
    await executeOptimistically(
      { type: 'ADD_TASK', payload: created },
      'Task created successfully!',
      'Failed to create task. Rolling back changes.'
    );
  };

  const handleStatusChange = async (id, newStatus) => {
    await executeOptimistically(
      { type: 'UPDATE_TASK', payload: { id, updatedFields: { status: newStatus } } },
      `Task status updated to ${newStatus.replace('_', ' ')}`,
      'Failed to update status. Rolling back changes.'
    );
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (id, updatedFields) => {
    await executeOptimistically(
      { type: 'UPDATE_TASK', payload: { id, updatedFields } },
      'Task updated successfully!',
      'Failed to update task. Rolling back changes.'
    );
  };

  const handleOpenDelete = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      const taskIdToDelete = taskToDelete.id;
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);

      await executeOptimistically(
        { type: 'DELETE_TASK', payload: taskIdToDelete },
        'Task deleted successfully!',
        'Failed to delete task. Rolling back changes.'
      );
    }
  };

  // Filter and search tasks calculation
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = state.filterStatus === 'All' || task.status === state.filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1>Task Management</h1>
          <p style={{ color: '#64748b' }}>Switch between admin-style table view and responsive card view.</p>
        </div>

        {/* View Switcher Toggle Buttons */}
        <div style={{ background: '#e2e8f0', padding: '0.25rem', borderRadius: '6px', display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              background: viewMode === 'table' ? '#ffffff' : 'transparent',
              fontWeight: viewMode === 'table' ? '600' : '400',
              cursor: 'pointer',
              color: '#1e293b',
              boxShadow: viewMode === 'table' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            Table View
          </button>
          <button
            onClick={() => setViewMode('card')}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              background: viewMode === 'card' ? '#ffffff' : 'transparent',
              fontWeight: viewMode === 'card' ? '600' : '400',
              cursor: 'pointer',
              color: '#1e293b',
              boxShadow: viewMode === 'card' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            Card View
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={state.searchQuery}
          onChange={(e) => {
            dispatch({ type: 'SET_SEARCH', payload: e.target.value });
            setSearchQuery(e.target.value);
          }}
          style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1, fontSize: '0.9rem' }}
        />
        <select
          value={state.filterStatus}
          onChange={(e) => {
            dispatch({ type: 'SET_FILTER', payload: e.target.value });
            setFilterStatus(e.target.value);
          }}
          style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
        >
          <option value="All">All Statuses</option>
          <option value="Todo">Todo</option>
          <option value="In_Progress">In Progress</option>
          <option value="Under_Review">Under Review</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Creation Form */}
      <form onSubmit={handleCreateTask} style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Create New Task</h3>
        {error && <p style={{ color: '#dc2626', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Task Title (3-200 chars)"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.7rem 1.4rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
          Add Task
        </button>
      </form>

      {/* Conditional Rendering based on viewMode */}
      {viewMode === 'table' ? (
        /* --- ADMIN TABLE VIEW --- */
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#475569' }}>
                <th style={{ padding: '1rem' }}>Title</th>
                <th style={{ padding: '1rem' }}>Priority</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Last Updated</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No tasks found.</td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task.id} style={{ borderBottom: '1px solid #e2e8f0', fontSize: '0.9rem' }}>
                    <td style={{ padding: '1rem', fontWeight: '600', color: '#1e293b' }}>{task.title}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', background: task.priority === 'Urgent' || task.priority === 'High' ? '#fee2e2' : '#f1f5f9', color: task.priority === 'Urgent' || task.priority === 'High' ? '#991b1b' : '#334155' }}>
                        {task.priority}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                      >
                        <option value="Todo">Todo</option>
                        <option value="In_Progress">In Progress</option>
                        <option value="Under_Review">Under Review</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.8rem' }}>
                      {new Date(task.updatedAt).toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button
                          onClick={() => handleOpenEdit(task)}
                          style={{ background: '#e2e8f0', color: '#1e293b', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleOpenDelete(task)}
                          style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* --- RESPONSIVE CARD VIEW --- */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filteredTasks.length === 0 ? (
            <p style={{ color: '#64748b', gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>No tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} style={{ background: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#1e293b' }}>{task.title}</h4>
                    <span style={{ padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', background: task.priority === 'Urgent' || task.priority === 'High' ? '#fee2e2' : '#f1f5f9', color: task.priority === 'Urgent' || task.priority === 'High' ? '#991b1b' : '#334155' }}>
                      {task.priority}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                    {task.description || 'No detailed instructions provided for this task.'}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    style={{ padding: '0.35rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In_Progress">In Progress</option>
                    <option value="Under_Review">Under Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      onClick={() => handleOpenEdit(task)}
                      style={{ background: '#e2e8f0', color: '#1e293b', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenDelete(task)}
                      style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Edit Task Modal Component */}
      <EditTaskModal
        key={editingTask?.id || 'empty'}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        recordToEdit={editingTask}
        onUpdateTask={handleUpdateTask}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div>
          <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Are you sure you want to delete the task <strong style={{ color: '#1e293b' }}>"{taskToDelete?.title}"</strong>? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}