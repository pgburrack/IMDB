import React, { Component } from 'react';
import css from 'styles/generic/Pagination.scss';

export default class PaginationComp extends Component {
  static propTypes = {
    setPageNumber: React.PropTypes.func,
    totalPages: React.PropTypes.number,
    current: React.PropTypes.number
  }

  constructor (props) {
    super(props);
  }

  goToFirstPage = () => {
    if (this.props.current !== 1) {
      this.props.setPageNumber(1);
    }
  }

  goToLastPage = () => {
    if (this.props.current !== this.props.totalPages) {
      this.props.setPageNumber(this.props.totalPages);
    }
  }

  nextPage = () => {
    if (this.props.current !== this.props.totalPages) {
      this.props.setPageNumber(this.props.current + 1);
    }
  }

  prevPage = () => {
    if (this.props.current !== 1) {
      this.props.setPageNumber(this.props.current - 1);
    }
  }

  handlePageClick = (number) => {
    if (number !== this.props.current) {
      this.props.setPageNumber(number);
    }
  }

  render () {
    const { totalPages, current } = this.props;

    if (totalPages <= 1) {
      return null;
    }

    const startNum = current < 3 ? 1 : current - 2;
    let items = [];
    for (var i = startNum; i < startNum + 3; i++) {
      items.push(
        <li key={i}>
          <a
            onClick={this.handlePageClick.bind(null, i)}
            className={current === i ? css.active : ''}>{i}</a>
        </li>
      );
    }

    return (
      <ul className={`${css.pagination} pagination`}>
        <li className={css.first}>
          <a onClick={this.goToFirstPage}>First</a>
        </li>
        <li className={current === 1 ? `disabled ${css.disabled}` : ''}>
          <a onClick={this.prevPage}>Prev</a>
        </li>
        {items}

        {
          totalPages > 3 && current !== totalPages ?
          <li className={`disabled ${css.disabled}`}>
            <a>...</a>
          </li>
          : null
        }

        <li className={current === totalPages ? `${css.disabled} disabled` : ''}>
          <a onClick={this.nextPage}>Next</a>
        </li>
         <li className={css.last}>
          <a onClick={this.goToLastPage}>Last</a>
        </li>
      </ul>
    );
  }
}
