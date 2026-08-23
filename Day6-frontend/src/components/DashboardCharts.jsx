import { Card } from './ui/Card';

export function DashboardCharts({ tasks = [] }) {
  // Compute total and status counts dynamically from tasks
  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In_Progress').length;
  const underReviewCount = tasks.filter((t) => t.status === 'Under_Review').length;
  const todoCount = tasks.filter((t) => t.status === 'Todo').length;

  // Calculate percentage ratios for progress bars
  const getPercentage = (count) => (totalTasks === 0 ? 0 : Math.round((count / totalTasks) * 100));

  // Compute priority breakdowns
  const urgentCount = tasks.filter((t) => t.priority === 'Urgent' || t.priority === 'High').length;
  const mediumCount = tasks.filter((t) => t.priority === 'Medium').length;
  const lowCount = tasks.filter((t) => t.priority === 'Low').length;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Chart 1: Status Breakdown & Progress Distribution */}
      <Card className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-app-heading">Task Status Distribution</h3>
          <p className="text-xs text-app-text">Breakdown of current task pipeline statuses.</p>
        </div>

        {/* Multi-segment visual progress bar */}
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-app-code border border-app-border">
          <div style={{ width: `${getPercentage(completedCount)}%` }} className="bg-emerald-500 transition-all duration-500" title="Completed" />
          <div style={{ width: `${getPercentage(inProgressCount)}%` }} className="bg-amber-500 transition-all duration-500" title="In Progress" />
          <div style={{ width: `${getPercentage(underReviewCount)}%` }} className="bg-app-accent transition-all duration-500" title="Under Review" />
          <div style={{ width: `${getPercentage(todoCount)}%` }} className="bg-app-border transition-all duration-500" title="Todo" />
        </div>

        {/* Legend / Metrics List */}
        <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
          <div className="rounded-lg border border-app-border bg-app-code p-3 text-center">
            <span className="block text-xs text-app-text font-semibold">Completed</span>
            <span className="text-lg font-bold text-emerald-600">{completedCount}</span>
            <span className="block text-[10px] text-app-text">{getPercentage(completedCount)}%</span>
          </div>
          <div className="rounded-lg border border-app-border bg-app-code p-3 text-center">
            <span className="block text-xs text-app-text font-semibold">In Progress</span>
            <span className="text-lg font-bold text-amber-600">{inProgressCount}</span>
            <span className="block text-[10px] text-app-text">{getPercentage(inProgressCount)}%</span>
          </div>
          <div className="rounded-lg border border-app-border bg-app-code p-3 text-center">
            <span className="block text-xs text-app-text font-semibold">Review</span>
            <span className="text-lg font-bold text-app-accent">{underReviewCount}</span>
            <span className="block text-[10px] text-app-text">{getPercentage(underReviewCount)}%</span>
          </div>
          <div className="rounded-lg border border-app-border bg-app-code p-3 text-center">
            <span className="block text-xs text-app-text font-semibold">Todo</span>
            <span className="text-lg font-bold text-app-heading">{todoCount}</span>
            <span className="block text-[10px] text-app-text">{getPercentage(todoCount)}%</span>
          </div>
        </div>
      </Card>

      {/* Chart 2: Priority Breakdown & Trend Summary */}
      <Card className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-app-heading">Priority Breakdown</h3>
          <p className="text-xs text-app-text">Distribution of tasks by urgency level.</p>
        </div>

        <div className="space-y-3 pt-1">
          {/* High / Urgent Priority Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-app-heading">High / Urgent</span>
              <span className="text-red-600">{urgentCount} tasks ({getPercentage(urgentCount)}%)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-app-code overflow-hidden border border-app-border">
              <div style={{ width: `${getPercentage(urgentCount)}%` }} className="h-full bg-red-600 rounded-full transition-all duration-500" />
            </div>
          </div>

          {/* Medium Priority Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-app-heading">Medium Priority</span>
              <span className="text-amber-600">{mediumCount} tasks ({getPercentage(mediumCount)}%)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-app-code overflow-hidden border border-app-border">
              <div style={{ width: `${getPercentage(mediumCount)}%` }} className="h-full bg-amber-500 rounded-full transition-all duration-500" />
            </div>
          </div>

          {/* Low Priority Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-app-heading">Low Priority</span>
              <span className="text-app-text">{lowCount} tasks ({getPercentage(lowCount)}%)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-app-code overflow-hidden border border-app-border">
              <div style={{ width: `${getPercentage(lowCount)}%` }} className="h-full bg-app-accent rounded-full transition-all duration-500" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}