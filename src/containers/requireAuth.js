import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
  componentWillMount = () => {
    if (!this.props.authenticated) {
      this.props.history.push('/auth');
    }
  }

  componentWillUpdate = (nextProps) => {
    if (!nextProps.authenticated) {
      this.props.history.push('/auth');
    }
  }

  render() {
    return (
      <ComposedComponent {...this.props} />
    );
  }
  }

  // connects particular parts of redux state to this components props
  const mapStateToProps = (reduxState) => {
    return {
      authenticated: reduxState.auth.authenticated,
    };
  };

  return connect(mapStateToProps, null)(RequireAuth);
}
