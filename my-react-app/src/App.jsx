import { useState } from 'react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Badge } from './components/Badge';
import { Card } from './components/Card';
import { Avatar } from './components/Avatar';
import { StateDemo } from './components/StateDemo';
import { FormShowcase } from './components/FormShowcase';
import { TaskListManager } from './components/TaskListManager';
import { ComponentPlayground } from './components/ComponentPlayground';
import { Loader } from './components/Loader';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';
import { Modal } from './components/Modal';
import { Tabs } from './components/Tabs';
import { AccordionItem } from './components/Accordion';
import { Dropdown } from './components/Dropdown';
import { Toast } from './components/Toast';
import './App.css';

export default function App() {
  const [userName, setUserName] = useState('');
  const [tasks, ] = useState([
    { id: 1, title: 'Learn JSX and Components', priority: 'High', completed: false },
    { id: 2, title: 'Build React Application', priority: 'Medium', completed: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // New states for Advanced Components demo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Data for props demonstration in Card
  const profileObject = { role: 'Software Engineering Intern', company: 'Planet Beyond' };
  const developerSkills = ['Java', 'Spring Boot', 'React', 'MySQL'];
  const handleCardCallback = () => {
    alert('Callback executed successfully from Card component props!');
  };

  const tabData = [
    { label: 'Overview', content: <p>Welcome to your task manager overview panel.</p> },
    { label: 'Activity', content: <p>No recent activity recorded yet.</p> }
  ];

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Task Manager Dashboard</h1>

      {/* Profile Card demonstrating Props (Primitives, Objects, Arrays, Callbacks, Variants, Children) */}
      <Card 
        title="Sadiq Rehman"
        count={5}
        userObj={profileObject}
        skills={developerSkills}
        onAction={handleCardCallback}
        variant="primary"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Avatar name="Sadiq Rehman" size="lg" />
          <div>
            <h3>Sadiq Rehman</h3>
            <Badge variant="high">Admin</Badge>
          </div>
        </div>

        <Input 
          id="user-input"
          label="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name..."
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button 
            variant="primary" 
            onClick={() => alert(`Hello, ${userName || 'Guest'}!`)}
          >
            Save Profile
          </Button>
          <Dropdown 
            label="Quick Actions" 
            options={[{ label: 'Edit Profile' }, { label: 'Settings' }]} 
            onSelect={(opt) => alert(`Selected action: ${opt.label}`)}
          />
        </div>
      </Card>

      {/* Dynamic Task List Manager Section */}
      <TaskListManager />

      {/* UI Component Playground & Documentation */}
      <ComponentPlayground />

      {/* Legacy/Static Task List Section */}
      <h2>Static Tasks View</h2>
      
      {tasks.length === 0 ? (
        <EmptyState 
          title="No Tasks Found" 
          description="You have completed everything or have no tasks added." 
          actionLabel="Refresh Tasks"
          onAction={() => alert('Refreshing...')}
        />
      ) : (
        tasks.map(task => (
          <Card key={task.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </span>
              <Badge variant={task.priority}>{task.priority}</Badge>
            </div>
          </Card>
        ))
      )}

      {/* Advanced Components Demos */}
      <h2>Advanced UI Elements</h2>

      {/* Tabs Component */}
      <Card>
        <h3>Dashboard Tabs</h3>
        <Tabs tabs={tabData} />
      </Card>

      {/* Accordion Component */}
      <Card>
        <h3>FAQ & Help</h3>
        <AccordionItem title="How do I add new tasks?">
          You can use the input fields and buttons above or integrate state handlers to append items to your tasks list array.
        </AccordionItem>
        <AccordionItem title="What frameworks are used?">
          This project is built using React, Vite, and custom CSS design blocks.
        </AccordionItem>
      </Card>

      {/* Modal & Toast Triggers */}
      <Card>
        <h3>Dialogs & Notifications</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
          <Button variant="primary" onClick={() => setShowToast(true)}>
            Show Toast
          </Button>
        </div>
      </Card>

      {/* Loader & Error Demos */}
      <Card>
        <h3>System Status</h3>
        {isLoading ? (
          <Loader message="Loading data from server..." />
        ) : hasError ? (
          <ErrorState 
            title="Connection Failed" 
            message="Could not retrieve data. Please check your network." 
            onRetry={() => setHasError(false)}
          />
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="secondary" onClick={() => setIsLoading(true)}>
              Test Loader
            </Button>
            <Button variant="danger" onClick={() => setHasError(true)}>
              Test Error State
            </Button>
          </div>
        )}
      </Card>

      {/* useState Hooks Demo Component */}
      <StateDemo />

      {/* Controlled Forms Showcase (Login, Profile, Product with Validation) */}
      <FormShowcase />

      {/* Render Modal */}
      <Modal isOpen={isModalOpen} title="Dashboard Settings" onClose={() => setIsModalOpen(false)}>
        <p style={{ marginBottom: '1rem' }}>Manage your workspace preferences and configurations here.</p>
        <Button onClick={() => setIsModalOpen(false)}>Save & Close</Button>
      </Modal>

      {/* Render Toast */}
      {showToast && (
        <Toast message="Action completed successfully!" type="success" onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}