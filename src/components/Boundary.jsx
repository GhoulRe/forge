import { Component } from 'react';

// If the rich editor cannot load or crashes, show the simple editor instead of breaking the page.
export default class Boundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(e) { console.warn('Rich editor unavailable, using the simple editor:', e); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
