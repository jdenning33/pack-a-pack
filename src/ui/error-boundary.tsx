import React, { ReactNode } from 'react';
import { Button } from './button';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        // Define a state variable to track whether there is an error or not
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        setTimeout(() => {
            // Reset the error state after a while
            this.setState({ hasError: false });
        }, 3000);

        // You can use your own error logging service here
        console.log({ error, errorInfo });
    }

    render() {
        // Check if an error is thrown
        if (this.state.hasError) {
            // If a custom fallback is provided, render it; otherwise, render a default fallback UI
            return this.props.fallback ? (
                this.props.fallback
            ) : (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <Button
                        type='button'
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </Button>
                </div>
            );
        }

        // Return children components in case of no error
        return this.props.children;
    }
}
