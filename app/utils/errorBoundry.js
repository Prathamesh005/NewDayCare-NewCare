import React, { Component } from 'react';

export default class ErrorBoundary extends React.Component {
    
      state = { 
        hasError: false,
        error: null, errorInfo: null
       };
    
    
      static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }
    
      componentDidCatch(error, errorInfo) {
        this.setState({
          ...this.state,
          error: error,
        });
      }
    
      render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return<div>
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
        }
    
        return this.props.children; 
      }
  }