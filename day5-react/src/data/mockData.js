// src/data/mockData.js
export const initialUsers = [
  {
    id: 'usr-1',
    name: 'Sadiq Rehman',
    email: 'sadiq@planetbeyond.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2026-07-01T08:00:00.000Z',
    updatedAt: '2026-08-01T10:30:00.000Z',
  },
  {
    id: 'usr-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2026-07-10T09:15:00.000Z',
    updatedAt: '2026-08-05T14:20:00.000Z',
  },
];

export const initialProducts = [
  {
    id: 'prod-1',
    title: 'Enterprise Spring Boot Starter Kit',
    description: 'Boilerplate architecture featuring JWT security, JPA, and PostgreSQL.',
    price: 99.99,
    stock: 45,
    status: 'Published',
    createdAt: '2026-07-05T11:00:00.000Z',
    updatedAt: '2026-08-10T16:45:00.000Z',
  },
  {
    id: 'prod-2',
    title: 'React Admin Dashboard Template',
    description: 'Fully responsive admin template with Vite, React Router, and context state.',
    price: 49.99,
    stock: 120,
    status: 'Published',
    createdAt: '2026-07-12T14:30:00.000Z',
    updatedAt: '2026-08-12T09:10:00.000Z',
  },
];

export const initialTasks = [
  {
    id: 'task-1',
    title: 'Configure Spring Batch Data Pipeline',
    description: 'Set up chunk-based reader and writer processors for bulk CSV user imports.',
    status: 'In_Progress',
    priority: 'High',
    assignedTo: 'usr-1',
    dueDate: '2026-08-25T18:00:00.000Z',
    createdAt: '2026-08-14T08:00:00.000Z',
    updatedAt: '2026-08-16T11:30:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Implement React Router Nested Layouts',
    description: 'Connect sidebar navigation and pass layout context via useOutletContext.',
    status: 'Completed',
    priority: 'Medium',
    assignedTo: 'usr-1',
    dueDate: '2026-08-15T18:00:00.000Z',
    createdAt: '2026-08-13T10:00:00.000Z',
    updatedAt: '2026-08-15T17:00:00.000Z',
  },
];