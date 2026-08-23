import { Component } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card className="p-8 text-center space-y-4 my-6 border-red-500/30 bg-red-500/5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-600 font-bold text-xl">
            !
          </div>
          <div>
            <h3 className="text-lg font-bold text-app-heading">Something went wrong in this module</h3>
            <p className="text-xs text-app-text max-w-md mx-auto mt-1">
              {this.state.error?.message || 'An unexpected error occurred while rendering this section.'}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={this.handleReset}>
            Try Again
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}