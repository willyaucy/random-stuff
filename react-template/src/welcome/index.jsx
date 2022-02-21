import * as React from 'react';
import styles from './style.scss';

export class Welcome extends React.Component {
  render() {
    return <h1 className={styles.welcome}>Hello, {this.props.name}</h1>;
  }
}