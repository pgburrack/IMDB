import React, { Component } from 'react';
import css from 'styles/generic/Modal.scss';

export default class ModalComp extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    activeModal: React.PropTypes.bool,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }
  constructor (props) {
    super(props);
    this.state = {
      is_active: this.props.activeModal ? css['is-active'] : ''
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activeModal === this.props.activeModal) return false;
    this.setState({
      is_active: nextProps.activeModal ? css['is-active'] : ''
    });
  }

  componentDidMount () {
    window.addEventListener('keyup', this.keyupHandler);
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.keyupHandler);
  }

  keyupHandler = (event) => {
    if (this.props.activeModal && event.keyCode === 27) {
      this.props.onClick();
    }
  }

  handleClick = (event) => {
    this.props.onClick();
  }

  render () {
    const { children, onClick } = this.props;
    const { is_active } = this.state;

    return (
      <div className={`${css['modal']} ${is_active}`} onClick={this.handleClick}>
        <div className={css['modal-background']}></div>
        <div className={css['modal-container']} onClick={(event) => { event.stopPropagation(); }}>
          <div className={css['modal-content']}>
            {children}
          </div>
        </div>
        <button className={css['modal-close']} onClick={onClick}></button>
      </div>
    );
  }
}
