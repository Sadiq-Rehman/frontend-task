import { useState } from 'react';
import { Modal } from '../components/Modal';
import { FormInput } from '../components/FormInput';
import { FormSelect } from '../components/FormSelect';

export function AddTaskExample({ onAddTask }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation rule check
    let newErrors = {};
    if (!formData.title.trim() || formData.title.length < 3 || formData.title.length > 200) {
      newErrors.title = 'Title is required (3 to 200 characters).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit record
    onAddTask(formData);
    setFormData({ title: '', description: '', priority: 'Medium' });
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
      >
        + Add New Task
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Task">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task summary..."
            error={errors.title}
          />

          <FormInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter extra details (optional)..."
          />

          <FormSelect
            label="Priority Level"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={[
              { label: 'Low', value: 'Low' },
              { label: 'Medium', value: 'Medium' },
              { label: 'High', value: 'High' },
              { label: 'Urgent', value: 'Urgent' },
            ]}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              Save Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}