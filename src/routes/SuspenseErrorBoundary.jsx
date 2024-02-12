import React from "react";

//replace it with your own custom loader
const Loader = () => {
  return <div>Loading...</div>;
};

//replace it with your own custom error page
const ErrorPage = () => {
  return <div>Ohh ! An Error Occurred !</div>;
};

export class SuspenseErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    /*
    Here you can call any third party monitor system API
    like sentry.io to log errors in third party service.
    */
    // eslint-disable-next-line
    console.error("Uncaught error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Suspense fallback={<Loader />}>
          <ErrorPage />
        </React.Suspense>
      );
    }
    // eslint-disable-next-line react/prop-types
    return <React.Suspense fallback={<Loader />}>{this.props.children}</React.Suspense>;
  }
}
