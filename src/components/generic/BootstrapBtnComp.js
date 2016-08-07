import React, {Component} from 'react';
import {getBootstrapBtnClass, BOOSTRAP_ROLES} from 'utils/bootstrapUtils';
import { combineCssClasses } from 'utils';

export default class BootstrapBtn extends Component {
  static propTypes = {
    type: React.PropTypes.string,
    role: React.PropTypes.oneOf(BOOSTRAP_ROLES),
    onClick: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool,
    children: React.PropTypes.node
  }
  static defaultProps = {
    type: 'button',
    role: 'default'
  }
  constructor (props) {
    super(props);
    this.className = 'btn';
  }
  render () {
    const {type, role, children, active, onClick} = this.props;

    return (
      <button onClick={onClick} type={type}
        className={combineCssClasses(active ? 'active' : '', this.className, getBootstrapBtnClass(role))}>
        {children}
      </button>
    );
  }
}
