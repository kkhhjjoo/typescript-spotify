import { Component, type ReactNode } from 'react';
import { Alert } from '@mui/material';

interface Props { children: ReactNode }
interface State { error: Error | null }

class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          <strong>렌더링 오류:</strong> {this.state.error.message}
        </Alert>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
