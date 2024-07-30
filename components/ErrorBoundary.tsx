import React, { ErrorInfo, ReactNode } from 'react'
import { withRouter, NextRouter } from 'next/router'

interface ErrorBoundaryProps {
  children: ReactNode
  router: NextRouter
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    // Define a state variable to track whether there is an error or not
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log(error)
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    // exceptionEvent(`## ${error} ## \n ${errorInfo}`)
    console.error({ error, errorInfo })
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col justify-center">
          <div className="text-center text-3xl">
            <h2>Sorry, something went wrong</h2>
            <h2>Please try to refresh the page or contact us</h2>
          </div>
        </div>
      )
    }

    // Return children components in case of no error
    return this.props.children
  }
}

export default withRouter(ErrorBoundary)
