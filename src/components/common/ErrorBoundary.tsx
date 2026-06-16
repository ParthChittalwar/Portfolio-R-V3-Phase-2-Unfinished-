import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Short label used in the fallback message, e.g. "Projects". */
  sectionName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render errors in its subtree and shows a small inline fallback
 * instead of crashing the whole page. Wrap each major section with this so
 * a bug in one section (e.g. a bad data entry) never takes down the rest
 * of the portfolio.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log for visibility in development / browser console; analytics hooks
    // (if enabled) could report this in the future.
    console.error(
      `[ErrorBoundary${this.props.sectionName ? `: ${this.props.sectionName}` : ""}]`,
      error,
      info,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-16 text-center text-muted-foreground">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          <p className="text-sm">
            {this.props.sectionName ? `The ${this.props.sectionName} section` : "This section"}{" "}
            couldn&apos;t be displayed right now.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
