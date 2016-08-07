import React, {Component} from 'react';
import {getBootstrapPanelClass, BOOSTRAP_ROLES} from 'utils/bootstrapUtils';
import { combineCssClasses } from 'utils';

export default class BootstrapPanel extends Component {
  static propTypes = {
    panelType: React.PropTypes.oneOf(BOOSTRAP_ROLES),
    showHeading: React.PropTypes.bool,
    showBody: React.PropTypes.bool,
    showFooting: React.PropTypes.bool,
    headingContent: React.PropTypes.node,
    bodyContent: React.PropTypes.node,
    footerContent: React.PropTypes.node,
    wrapperClassName: React.PropTypes.string,
    headingClassName: React.PropTypes.string,
    bodyClassName: React.PropTypes.string,
    footingClassName: React.PropTypes.string
  }
  static defaultProps = {
    showHeading: false,
    showBody: false,
    showFooting: false,
    panelType: 'default'
  }
  constructor (props) {
    super(props);
    this.wrapperClassName = 'panel';
    this.headingClassName = 'panel-heading';
    this.bodyClassName = 'panel-body';
    this.footingClassName = 'panel-footer';
  }
  render () {
    const {
      headingContent,
      bodyContent,
      footerContent,
      showHeading,
      showBody,
      showFooting,
      panelType,
      wrapperClassName,
      headingClassName,
      bodyClassName,
      footingClassName
    } = this.props;

    // Combine css classes and filter out undefined props
    let wrapperClasses = combineCssClasses(this.wrapperClassName, wrapperClassName, getBootstrapPanelClass(panelType));
    let headingClasses = combineCssClasses(this.headingClassName, headingClassName);
    let bodyClasses = combineCssClasses(this.bodyClassName, bodyClassName);
    let footerClasses = combineCssClasses(this.footingClassName, footingClassName);

    return (
      <div className={wrapperClasses}>
        {showHeading ? <div className={headingClasses}>{headingContent}</div> : null}
        {
          showBody ? <div className={bodyClasses}>{bodyContent}</div> : null
        }
        {showFooting ? <div className={footerClasses}>{footerContent}</div> : null}
      </div>

    );
  }
}
