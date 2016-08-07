import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import { actionCreators } from 'actions/core_layout';
import { authActionsCreators } from 'actions/auth_actions';
import { getLocalStorage } from 'utils';

import classes from 'styles/core.scss';

function setNavTitleObj (newPath) {
  var navObj = newPath.split('/').filter((title) => title.length > 0);
  var navTitleObj = { main: '', sub: '' };
  navObj.pop();
  navTitleObj.main = navObj[0];
  if (navObj.length > 1) navTitleObj.sub = navObj[1];
  return navTitleObj;
}

export default class CoreLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
    actions: React.PropTypes.object,
    navTitle: React.PropTypes.object,
    menuState: React.PropTypes.string,
    toggleMenu: React.PropTypes.func,
    location: React.PropTypes.object,
    // addedMenu: React.PropTypes.array,
    menuTree: React.PropTypes.array,
    history: React.PropTypes.object,
    fetchUserAuth: React.PropTypes.object
  }

  // constructor (props) {
  //   super(props);
  // }

  eventToggleSidebar = (e) => {
    e.preventDefault();
    this.props.toggleMenu(this.props.menuState.length > 0 ? '' : ' active');
  }

  componentWillMount () {
   //const WillMountPath = setNavTitleObj(this.props.location.pathname);
    //const menu = this.props.addedMenu.length ? this.props.addedMenu : getLocalStorage('token').addedMenu;
    // const finalMenuTree = this.props.menuTree.concat(menu);
    // this.state = {
    //   menuTree: finalMenuTree
    // };
    // if (!shallowEqual(WillMountPath, this.props.navTitle)) {
    //   this.props.actions.setNavTitle(WillMountPath);
    // }
  }

  render () {
    const { menuState, actions, history, fetchUserAuth, location } = this.props;

    return (
      <div id={classes.pageContainer} className={menuState}>
          <div className={classes['view-container']}>
            {this.props.children}
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menuState: state.menuState,
  fetchUserAuth: state.fetchUserAuth,
  menuTree: state.menuTree,
  navTitle: state.navTitle,
  /*addedMenu: state.addedMenu,*/
  routerState: state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign(actionCreators, authActionsCreators), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
