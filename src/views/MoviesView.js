import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { moviesActionsCreators } from 'actions/movies_actions';
import { actionCreators } from 'actions/core_layout';
import Modal from 'react-modal';
import PaginationComp from 'components/generic/PaginationComp';
import css from 'styles/movies/MoviesView.scss';
import { POSTER_URL } from 'utils/constants';
import UnknownPosterSvg from 'components/svg/UnknownPosterSvg';
import LogoSvg from 'components/svg/LogoSvg';
import ArrowDownSvg from 'components/svg/ArrowDownSvg';
import BurgerSvg from 'components/svg/BurgerSvg';
import CssTooltipComp from 'components/generic/CssTooltipComp';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

/**
 *  Movies View
 */

export default class MoviesView extends Component {
  static propTypes = {
    actions: React.PropTypes.object,
    movies: React.PropTypes.array,
    pageNum: React.PropTypes.number,
    totalPages: React.PropTypes.number
  }

  constructor (props) {
    super(props);
    this.state = {
      dropDownIsOpen: false
    };
  }

  componentWillMount () {
    this.props.actions.fetchMovies(this.props.pageNum);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.pageNum !== nextProps.pageNum) {
      this.props.actions.fetchMovies(nextProps.pageNum);
      window.scrollTo(0, 0);
    }
  }

  changeDropDownState = () => {
    this.setState({dropDownIsOpen: !this.state.dropDownIsOpen});
  }

  render () {
    const { movies, totalPages, actions, pageNum } = this.props;
    const { dropDownIsOpen } = this.state;

    const moviesComp = movies.map((movie, index) => {
      return (
        <CssTooltipComp key={index} className={`col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-2 movie-poster ${css['movie-poster']}`} children={
          <div className=''>

            { movie.poster_path ?
              <img
                src={`${POSTER_URL}${movie.poster_path}`}/>
             : (
                <UnknownPosterSvg
                  color='#000'/>
              )
            }
          </div>
        }
        tooltip={movie.original_title} />
      );
    });

    return (
      <div>
        <nav className={`navbar navbar-default ${css.header}`}>
          <div className='container-fluid'>
            <div className={`navbar-header`}>
              <a className={`navbar-brand ${css.brand}`}>
                <LogoSvg
                    width='33'
                    height='34'
                    color='#000'/>
                <span className={css.title}>Movies</span>
              </a>
            </div>

            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav navbar-right'>
                <li className='dropdown'>
                  <div className={`${css['my-account']} dropdown-title`} onClick={this.changeDropDownState}>
                    <span className={css['button-wrapper']}>
                      My Account
                      <ArrowDownSvg
                        color='#fff'
                        width='24px'/>
                    </span>
                  </div>
                  <div className='burger' onClick={this.changeDropDownState}>
                    <BurgerSvg
                      color={dropDownIsOpen ? '#fff' : '#000'}
                      width='30px'/>
                  </div>

                  <ul className={`dropdown-menu ${dropDownIsOpen ? 'open' : ''}`}>
                    <li><a href='#'>Example 1</a></li>
                    <li><a href='#'>Example 2</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className='container-fluid'>
          <h2>Latest Releases</h2>
          <div className={`row`}>
            {moviesComp}
          </div>

          <div className='center-table'>
            <PaginationComp
              setPageNumber={actions.setPageNum}
              totalPages={totalPages}
              current={pageNum}/>
          </div>
        </main>



      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  pageNum: state.pageNum,
  totalPages: state.totalPages
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, actionCreators, moviesActionsCreators), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesView);
