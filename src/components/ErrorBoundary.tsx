import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Telemetry Error caught:', error, errorInfo);
  }

  handleReset = () => {
    // @ts-ignore
    this.setState({ hasError: false, error: null });
    try {
      window.location.reload();
    } catch {
      // ignore
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-rose-900/50 bg-rose-950/40 text-rose-400">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="font-mono text-sm font-black uppercase tracking-wider text-rose-400">
              TELEMETRY BUS EXCEPTION
            </h2>
            <p className="mt-2 text-xs text-zinc-400 font-sans">
              The martial arts tactical engine encountered an unexpected render state.
            </p>
            <button
              onClick={this.handleReset}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 font-mono text-xs font-bold text-black hover:bg-white transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reinitialize Archive</span>
            </button>
          </div>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}
