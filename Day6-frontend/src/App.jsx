import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { PageContainer } from './components/layout/PageContainer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Card } from './components/ui/Card';
import './index.css';

// Lazy-load route pages/modules
const DashboardCharts = lazy(() => import('./components/DashboardCharts').then(mod => ({ default: mod.DashboardCharts })));
const TaskTable = lazy(() => import('./components/TaskTable').then(mod => ({ default: mod.TaskTable })));
const StatCard = lazy(() => import('./components/ui/StatCard').then(mod => ({ default: mod.StatCard })));
const Button = lazy(() => import('./components/ui/Button').then(mod => ({ default: mod.Button })));

function PageLoadingFallback() {
  return (
    <Card className="flex items-center justify-center p-12 text-app-text">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-app-accent border-t-transparent" />
        <span className="text-sm font-semibold">Loading module...</span>
      </div>
    </Card>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Configure Tailwind CSS v4', description: 'Set up tokens and design system variables', priority: 'Urgent', status: 'Completed', updatedAt: '2026-08-15' },
    { id: 2, title: 'Build Responsive Sidebar & Topbar', description: 'Create layout components with mobile drawer support', priority: 'High', status: 'Completed', updatedAt: '2026-08-16' },
    { id: 3, title: 'Implement Task Table & Filters', description: 'Add search, pagination, and status dropdowns', priority: 'Medium', status: 'In_Progress', updatedAt: '2026-08-17' },
    { id: 4, title: 'Setup Dashboard Analytics', description: 'Build summary cards and visual progress charts', priority: 'Low', status: 'Todo', updatedAt: '2026-08-17' },
  ]);

  const handleStatusChange = useCallback((taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : task
      )
    );
  }, []);

  const handleEdit = useCallback((task) => {
    console.log('Edit task:', task);
  }, []);

  const handleDelete = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-app-bg text-app-text font-sans antialiased">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />

        <PageContainer>
          <ErrorBoundary>
            <Suspense fallback={<PageLoadingFallback />}>
              {/* Header Banner */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-app-border bg-app-code p-6 shadow-xs">
                <div>
                  <h2 className="text-2xl font-bold text-app-heading font-heading">
                    Welcome back, Sadiq! 👋
                  </h2>
                  <p className="mt-1 text-sm text-app-text">
                    Managing your Day6-frontend task pipeline and components.
                  </p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => setIsLoading((prev) => !prev)}>
                  {isLoading ? 'Hide Skeletons' : 'Preview Skeletons'}
                </Button>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total Tasks" value={stats.total} delta="Active pipeline" isPositive={true} icon="📋" isLoading={isLoading} />
                <StatCard label="Completed Tasks" value={stats.completed} delta="On track" isPositive={true} icon="✅" isLoading={isLoading} />
                <StatCard label="Pending Tasks" value={stats.pending} delta="Requires attention" isPositive={false} icon="⏳" isLoading={isLoading} />
              </div>

              {/* Dashboard Summary Charts */}
              <DashboardCharts tasks={tasks} />

              {/* Task Management Table with Filter & Pagination */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-app-heading">Task Management Module</h3>
                <TaskTable
                  tasks={tasks}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              </div>
            </Suspense>
          </ErrorBoundary>
        </PageContainer>
      </div>
    </div>
  );
}