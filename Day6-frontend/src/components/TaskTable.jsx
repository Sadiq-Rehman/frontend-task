import { useState, useMemo, memo } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';
import { Table } from './ui/Table';
import { EmptyState } from './ui/EmptyState';
import { Card } from './ui/Card';

function TaskTableComponent({ tasks = [], onEdit, onDelete, onStatusChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'Urgent':
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      default: return 'neutral';
    }
  };

  // Memoized filter calculation
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, statusFilter]);

  // Memoized pagination slice
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage) || 1;
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTasks.slice(start, start + itemsPerPage);
  }, [filteredTasks, currentPage, itemsPerPage]);

  return (
    <div className="space-y-4">
      {/* Search and Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-app-text whitespace-nowrap">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter Status"
            className="rounded-lg border border-app-border bg-app-bg px-3 py-2 text-sm text-app-text focus:outline-hidden focus:ring-2 focus:ring-app-accent/20"
          >
            <option value="All">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In_Progress">In Progress</option>
            <option value="Under_Review">Under Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <Card>
          <EmptyState
            title="No tasks found"
            description="Try adjusting your search query or status filter to find what you're looking for."
          />
        </Card>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table headers={['Title', 'Priority', 'Status', 'Last Updated', 'Actions']}>
              {paginatedTasks.map((task) => (
                <tr key={task.id} className="hover:bg-app-code/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-app-heading">
                    <div className="max-w-xs truncate">{task.title}</div>
                    <div className="text-xs text-app-text truncate">{task.description || 'No description'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={task.status}
                      onChange={(e) => onStatusChange(task.id, e.target.value)}
                      aria-label="Task Status"
                      className="rounded-md border border-app-border bg-app-bg px-2 py-1 text-xs text-app-text focus:outline-hidden focus:ring-1 focus:ring-app-accent"
                    >
                      <option value="Todo">Todo</option>
                      <option value="In_Progress">In Progress</option>
                      <option value="Under_Review">Under Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-app-text">{task.updatedAt || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm" onClick={() => onEdit(task)}>Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </div>

          {/* Mobile Card Grid */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {paginatedTasks.map((task) => (
              <Card key={task.id} className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-app-heading">{task.title}</h4>
                  <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                </div>
                <p className="text-xs text-app-text line-clamp-2">{task.description || 'No description provided.'}</p>
                <div className="flex items-center justify-between pt-2 border-t border-app-border">
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    aria-label="Task Status"
                    className="rounded-md border border-app-border bg-app-bg px-2 py-1 text-xs text-app-text"
                  >
                    <option value="Todo">Todo</option>
                    <option value="In_Progress">In Progress</option>
                    <option value="Under_Review">Under Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={() => onEdit(task)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-app-text">
              Showing page <span className="font-semibold text-app-heading">{currentPage}</span> of <span className="font-semibold text-app-heading">{totalPages}</span> ({filteredTasks.length} total)
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Wrap with React.memo to prevent re-renders when parent state updates without changing task props
export const TaskTable = memo(TaskTableComponent);