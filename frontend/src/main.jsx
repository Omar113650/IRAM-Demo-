import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', fontFamily: 'sans-serif', direction: 'ltr', background: '#FEECE5', minHeight: '100vh' }}>
          <h1 style={{ color: '#E85312', fontSize: '24px', fontWeight: 'bold' }}>IRAM - Rendering Error Caught</h1>
          <p style={{ color: '#0F172A', fontWeight: 'bold' }}>{this.state.error?.toString()}</p>
          <pre style={{ background: '#FFFFFF', padding: '15px', borderRadius: '8px', border: '1px solid #CBD5E1', overflow: 'auto', fontSize: '12px' }}>
            {this.state.info?.componentStack || this.state.error?.stack}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginTop: '15px', padding: '10px 20px', background: '#E85312', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

