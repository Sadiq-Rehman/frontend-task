// src/components/EditTaskModal.jsx
import { useForm, Controller } from 'react-hook-form';
import { Modal } from './Modal';

export function EditTaskModal({ isOpen, onClose, recordToEdit, onUpdateTask }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: recordToEdit?.title || '',
      description: recordToEdit?.description || '',
      priority: recordToEdit?.priority || 'Medium',
      status: recordToEdit?.status || 'Todo',
    },
  });

  const onSubmit = (data) => {
    onUpdateTask(recordToEdit.id, data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task Record">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Field with Controller */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600', fontSize: '0.9rem' }}>
            Task Title *
          </label>
          <Controller
            name="title"
            control={control}
            rules={{
              required: 'Task title is required.',
              minLength: { value: 3, message: 'Title must be at least 3 characters.' },
              maxLength: { value: 200, message: 'Title cannot exceed 200 characters.' },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
              />
            )}
          />
          {errors.title && (
            <span style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Description Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600', fontSize: '0.9rem' }}>
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px', resize: 'vertical', minHeight: '80px' }}
              />
            )}
          />
        </div>

        {/* Priority Select Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600', fontSize: '0.9rem' }}>
            Priority
          </label>
          <Controller
            name="priority"
            control={control}
            rules={{ required: 'Please select a priority.' }}
            render={({ field }) => (
              <select
                {...field}
                style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            )}
          />
          {errors.priority && (
            <span style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.priority.message}
            </span>
          )}
        </div>

        {/* Status Select Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600', fontSize: '0.9rem' }}>
            Status
          </label>
          <Controller
            name="status"
            control={control}
            rules={{ required: 'Please select a status.' }}
            render={({ field }) => (
              <select
                {...field}
                style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
              >
                <option value="Todo">Todo</option>
                <option value="In_Progress">In Progress</option>
                <option value="Under_Review">Under Review</option>
                <option value="Completed">Completed</option>
              </select>
            )}
          />
        </div>

        {/* Form Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onClose}
            style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}