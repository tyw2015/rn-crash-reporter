/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React, { PropTypes } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import isEqual from 'lodash.isequal';

var SQLiteManager = require('./SQLiteManager').default
var CrashReporter = require('./CrashReporter').default
var Configuration = require('./Configuration')

var sqlMngrObj;
var _this;
var _lblName='';

var actionValue = '';
var superClassName = '';
var actionOn = '';

import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-96979121-1');

var RNTouchableHeighlight = React.createClass({

  componentWillMount: function ()  {
    //*> Initialize bug RNSystangoBugReporter
    new CrashReporter()
    sqlMngrObj = new SQLiteManager()
    _this = this;

  },

  propTypes: {
    textStyle: Text.propTypes.style,
    disabledStyle: Text.propTypes.style,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element
    ]),
    accessibilityLabel: PropTypes.string,
    activeOpacity: PropTypes.number,
    allowFontScaling: PropTypes.bool,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    activityIndicatorColor: PropTypes.string,
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    background: (TouchableNativeFeedback.propTypes) ? TouchableNativeFeedback.propTypes.background : PropTypes.any,
  },

  statics: {
    isAndroid: (Platform.OS === 'android'),
  },

  _renderChildren: function() {
    let childElements = [];
    React.Children.forEach(this.props.children, (item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        var element = (
          <Text
            style={[styles.textButton, this.props.textStyle]}
            allowFontScaling={this.props.allowFontScaling}
            key={item}>
            {item}
          </Text>
        );
        childElements.push(element);
      } else if (React.isValidElement(item)) {
        childElements.push(item);
      }
    });
    return (childElements);
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    if (!isEqual(nextProps, this.props)) {
      return true;
    }
    return false;
  },

  _renderInnerText: function () {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          size='small'
          style={styles.spinner}
          color={this.props.activityIndicatorColor || 'black'}
        />
      );
    }
    return this._renderChildren();
  },

  render: function () {

    if (this.props.isDisabled === true || this.props.isLoading === true) {
      return (
        <View style={[styles.button, this.props.style, (this.props.disabledStyle || styles.opacity)]}>
          {this._renderInnerText()}
        </View>
      );
    }
    // Extract Touchable props
    let touchableProps = {
      accessibilityLabel: this.props.accessibilityLabel,
      onPress: this._onPress,
      onPressIn: this._onPressIn,
      onPressOut: this._onPressOut,
      onLongPress: this._onLongPress,
      activeOpacity: this.props.activeOpacity,
      delayLongPress: this.props.delayLongPress,
      delayPressIn: this.props.delayPressIn,
      delayPressOut: this.props.delayPressOut,
    };

    // if (Button.isAndroid) {
    //   touchableProps = Object.assign(touchableProps, {
    //     background: this.props.background || TouchableNativeFeedback.SelectableBackground()
    //   });
    //
    //
    //   if (this.props.title) {
    //
    //     return (
    //       <TouchableNativeFeedback {...touchableProps}
    //         style={[styles.button, this.props.style]}>
    //         <Text
    //           style={[styles.textButton, this.props.textStyle]}
    //           allowFontScaling={this.props.allowFontScaling}
    //           key={this.props.title}>
    //           {this.props.title}
    //         </Text>
    //       </TouchableNativeFeedback>
    //     );
    //
    //
    //   } else {
    //     return (
    //       <TouchableNativeFeedback {...touchableProps}>
    //         <View style={[styles.button, this.props.style]}>
    //           {this._renderInnerText()}
    //         </View>
    //       </TouchableNativeFeedback>
    //     )
    //   }
    //
    //
    //
    // } else {

      if (this.props.title) {

        return (
          <TouchableHighlight {...touchableProps}
            style={[styles.button, this.props.style]}
            underlayColor={'transparent'}>
            <Text
              style={[styles.textButton, this.props.textStyle]}
              allowFontScaling={this.props.allowFontScaling}
              key={this.props.title}>
              {this.props.title}
            </Text>
          </TouchableHighlight>
        );


      } else {
        return (
          <TouchableHighlight {...touchableProps}
            style={[styles.button, this.props.style]}
            underlayColor={'transparent'}>
            <View>{this._renderInnerText()}</View>
          </TouchableHighlight>
        );
      }


    //}
  },

  _onPress: function() {
    if (this.props.onPress) {

      if (Configuration.getIsReportCrash()) {


          actionValue = ''
          if (this._reactInternalInstance._currentElement._owner._currentElement.type.name) {
            if (this._reactInternalInstance._currentElement._owner._currentElement.type.name == 'Constructor') {
              if (this._reactInternalInstance._currentElement._owner._currentElement.type.displayName) {
                superClassName = this._reactInternalInstance._currentElement._owner._currentElement.type.displayName;
              }
            } else if (this._reactInternalInstance._currentElement._owner._currentElement.type.name == 'e') {
              if (this._reactInternalInstance._currentElement._owner._currentElement.type.displayName) {
                superClassName = this._reactInternalInstance._currentElement._owner._currentElement.type.displayName;
              }
            } else {
              superClassName = this._reactInternalInstance._currentElement._owner._currentElement.type.name;
            }

          }

          if (this.props.actionOn) {
            actionOn = this.props.actionOn;
          }

            this.recursiveMethod(this.props.children)
          }

          this.props.onPress()
    }
  },

  recursiveMethod(items) {

    var flag = false;

    React.Children.forEach(items, (item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        if (item != ' ') {
            actionValue = item;
          }

      } else if (React.isValidElement(item)) {

        flag = true;

        var type = ''

        if (item._owner._currentElement.type.name) {
          if (item._owner._currentElement.type.name == 'Constructor') {
            if (item._owner._currentElement.type.displayName) {
              type = item._owner._currentElement.type.displayName;
            }
          } else if (item._owner._currentElement.type.name == 'e') {
            if (item._owner._currentElement.type.displayName) {
              type = item._owner._currentElement.type.displayName;
            }
          } else {
            type = item._owner._currentElement.type.name;
          }
        }

        var display = '';
        if (item.type.display) {
          display = item.type.display;
        }else if (item.type.displayName) {
          display = item.type.displayName;
        }

        if (item.ref) {
          display = item.ref
        }

        if (actionValue != '' && actionValue != 'View' && actionValue != 'RCTView' && display != '' && display != 'View' && display != 'Image' && type != '' && type != 'View' && type != 'Image'  && actionValue != type) {
          actionValue = actionValue+ ", "+ display +" + "+type;
        }else if (actionValue != '' && actionValue != 'View' && actionValue != 'RCTView' && display != '' && display != 'View' && display != 'Image' && type != '' && type != 'View' && type != 'Image'  && actionValue == type ) {
          actionValue = 'background';
        }else if (display != '' && display != 'View' && display != 'RCTView' && display != 'Image' && type != '' && type != 'View' && type != 'Image' ) {
          actionValue = display +" + "+type;
        } else if((display == 'Image' || type == 'Image') && (typeof this.props.actionOn != 'undefined') && this.props.actionOn != '') {
          actionValue = this.props.actionOn+' button'
        } else if(display != 'Image' && display != 'View' && display != 'RCTView') {
          actionValue = display;
        } else if(type != 'Image' && type != 'View' && type != 'RCTView') {
          actionValue = type;
        }

        return this.recursiveMethod(item.props.children)

      }
    })

    if (!flag) {


      if (superClassName != 'StaticRenderer') {
        tracker.trackEvent(superClassName, (JSON.stringify(actionOn) == '') ? JSON.stringify(actionValue) : JSON.stringify(actionOn));

        sqlMngrObj.addUserStep(
        {
          className: superClassName,
          methodName: actionValue,
          actionOn: ''+actionOn
        });
      }
    }


  },

  _onPressIn: function() {

    if (this.props.onPressIn) {
      this.props.onPressIn()
    }
  },

  _onPressOut: function() {

    if (this.props.onPressOut) {
      this.props.onPressOut()
    }
  },

  _onLongPress: function() {

    if (this.props.onLongPress) {
      this.props.onLongPress()
    }
  }


});

const styles = StyleSheet.create({
  button: {
  },
  textButton: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  spinner: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.5,
  },
});

module.exports = RNTouchableHeighlight;
