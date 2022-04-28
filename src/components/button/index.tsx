/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Touchable from '../Touchable';
import TextView from '../Typography';
//import MaterialCommunityIcons from '../MaterialCommunityIcons';
import type { TextStyle } from 'react-native';
import type { ColorValue } from 'react-native';
import Icon from '../Icon';
import { ActivityIndicator } from 'react-native';

export type ButtonProps = ViewProps & {
  type?: 'default' | 'outline';
  mode?: 'active' | 'disabled' | 'verify';
  block?: boolean;
  children?: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  onLongPress?: () => void;
  rightIcon?: JSX.Element;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColor?: ColorValue | string | undefined;
  leftIcon?: JSX.Element;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: ColorValue | string | undefined;
  isLoading?: boolean;
  positionLoader?: 'left' | 'right';
  width?: number;
};

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  mode = 'active',
  block = false,
  onPress,
  onLongPress,
  containerStyle,
  textStyle,
  color,
  textColor,
  borderColor,
  children,
  width,
  rightIcon,
  leftIcon,
  leftIconName,
  rightIconName,
  isLoading,
  ...rest
}) => {
  const defaultsize = 20;
  const defaultStyle = {
    minHeight: 36,
    minWidth: 90,
    width: width ? width : block ? '100%' : undefined,
    borderWidth: 1,
    borderColor:
      borderColor || (type === 'outline' && mode === 'active')
        ? '#4F33AF'
        : type === 'outline' && mode === 'disabled'
        ? '#E0E0E0'
        : type === 'outline' && mode === 'verify'
        ? '#17CE65'
        : 'rgba(255, 255, 255, 0)',
    borderRadius: 10,
    backgroundColor: color
      ? color
      : type === 'outline'
      ? '#fff'
      : type === 'default' && mode === 'disabled'
      ? '#E0E0E0'
      : type === 'default' && mode === 'verify'
      ? '#17CE65'
      : '#4F33AF',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 10,
  };
  return (
    <Touchable
      activeOpacity={0.5}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[defaultStyle as ViewStyle, containerStyle]}
    >
      <View style={[styles.inView]}>
        {leftIconName ||
          (leftIcon && (
            <View style={{ marginHorizontal: 5 }}>
              {leftIcon ? (
                leftIcon
              ) : (
                <Icon
                  name={leftIconName || ''}
                  color={rest?.leftIconColor || '#fff'}
                  size={rest?.leftIconSize || defaultsize}
                  source={undefined}
                />
              )}
            </View>
          ))}
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={
              type === 'default'
                ? '#fff'
                : mode === 'verify'
                ? '#17CE65'
                : color
                ? color
                : '#472D9A'
            }
            style={{ marginEnd: 7, height: 16 }}
          />
        )}
        <TextView
          bold
          small
          style={[{ fontSize: leftIcon || rightIcon ? 12 : 13 }, textStyle]}
          color={
            textColor
              ? textColor
              : type === 'outline' && mode === 'active'
              ? '#472D9A'
              : type === 'outline' && mode === 'verify'
              ? '#17CE65'
              : mode === 'disabled'
              ? '#9e9e9e'
              : '#fff'
          }
        >
          {children}
        </TextView>
        {rightIconName ||
          (rightIcon && (
            <View style={{ marginHorizontal: 5 }}>
              {rightIcon ? (
                rightIcon
              ) : (
                <Icon
                  name={leftIconName || ''}
                  color={rest?.leftIconColor || '#fff'}
                  size={rest?.leftIconSize || defaultsize}
                  source={undefined}
                />
              )}
            </View>
          ))}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  inView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 22,
  },
});

export default Button;
