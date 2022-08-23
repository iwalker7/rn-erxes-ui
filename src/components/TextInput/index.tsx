/* eslint-disable react-native/no-inline-styles */
import React, { LegacyRef } from 'react';
import { ActivityIndicator, Animated, ColorValue, View } from 'react-native';
import { StyleSheet } from 'react-native';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNProps,
  TextInputSubmitEditingEventData,
  TextStyle,
} from 'react-native';
import TextView from '../Typography';
import Icon from '../Icon';
import type { ViewStyle } from 'react-native';
import { withTheme } from '../../core/theming';
import Touchable from '../Touchable';
import { grey100, grey200, red300 } from '../../styles/colors';
import { rgba } from '../../utils/colorUtils';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import _ from 'lodash';
import { deepPurple400 } from '../../styles/colors';

export type TextInputProps = RNProps & {
  type?: 'default' | 'outline' | 'filled' | 'text';
  placeholder?: string;
  floating?: boolean;
  required?: boolean;
  password?: boolean;
  disabled?: boolean;
  value?: string;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (
    value: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  inputRef?: LegacyRef<RNTextInput>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  labelContainerStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: string;
  label?: string | React.ReactElement;
  labelColor?: string;
  labelIcon?: JSX.Element;
  labelIconName?: string;
  labelIconSize?: number;
  labelIconColor?: ColorValue | string | undefined;
  maxLength?: number;
  onFocus?: (args: any) => void;
  rightIcon?: JSX.Element;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColor?: ColorValue | string | undefined;
  rightIconOnPress?: () => void;
  rightIconStyle?: StyleProp<ViewStyle>;
  leftIcon?: JSX.Element;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: ColorValue | string | undefined;
  leftIconOnPress?: () => void;
  leftIconStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  theme: ReactNativeErxes.Theme;
  height?: number;
  backgroundColor?: string;
  helperText?: string;
  prefix?: string;
  suffix?: string;
  keyboardType?: string;
};
const TextInput: React.ForwardRefRenderFunction<unknown, TextInputProps> = ({
  style,
  value,
  theme,
  containerStyle,
  type = 'default',
  onChangeText,
  onSubmitEditing,
  placeholder,
  placeholderTextColor = theme.colors.textSecondary,
  inputRef,
  required = false,
  password = false,
  disabled = false,
  maxLength = 30,
  label,
  labelColor = theme.colors.textPrimary,
  labelIcon,
  labelIconName,
  labelIconColor = theme.colors.textSecondary,
  labelIconSize = 10,
  labelContainerStyle,
  rightIcon,
  rightIconName,
  rightIconSize = 16,
  rightIconColor = theme.colors.textPrimary,
  rightIconStyle,
  leftIcon,
  leftIconName,
  leftIconSize = 16,
  leftIconColor = theme.colors.textPrimary,
  leftIconStyle,
  isLoading = false,
  labelStyle,
  rightIconOnPress,
  leftIconOnPress,
  height = 52,
  backgroundColor = 'transparent',
  helperText,
  prefix,
  suffix,
  keyboardType,
  ...rest
}) => {
  const { colors } = theme;

  const p = password ? '*****' : placeholder ? placeholder : '';
  const [mainColor, setMainColor] = React.useState(colors.primary);
  const [focused, setFocused] = React.useState<boolean>(false);

  const animationIndex = useRef(new Animated.Value(value ? 1 : 0)).current;

  const translateYLabel = animationIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 5],
  });

  const fontSize = animationIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 11],
  });

  const handleChangeText = (text: string) => {
    if (disabled) {
      return;
    }
    let passedText = text;
    if (keyboardType === 'numeric') {
      passedText = text.replace(/[^0-9]/g, '');
    } else {
      passedText = text;
    }

    onChangeText && onChangeText(passedText);
  };

  const handleFocus = (args: any) => {
    if (disabled) {
      return;
    }
    setFocused(true);
    rest.onFocus?.(args);
  };

  useEffect(() => {
    Animated.timing(animationIndex, {
      toValue: focused || !_.isEmpty(value) ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focused, value]);

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    onSubmitEditing && onSubmitEditing(e);
  };
  return (
    <>
      <View
        style={[
          {
            height,
            backgroundColor: backgroundColor ? backgroundColor : 'transparent',
            borderRadius: type === 'text' ? 0 : theme.roundness,
            borderColor: required
              ? red300
              : type === 'text'
              ? 'transparent'
              : focused
              ? rgba(colors.primary, 0.7)
              : grey200,
            borderBottomColor:
              type === 'text'
                ? grey200
                : required
                ? red300
                : focused
                ? rgba(colors.primary, 0.7)
                : grey200,
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: label ? 'flex-end' : 'center',
            padding: 0,
            paddingBottom: label ? 5 : 0,
            paddingHorizontal: 10,
          },
          containerStyle,
        ]}
      >
        <Animated.Text
          style={[
            {
              position: 'absolute',
              fontWeight: '500',
              left: labelIcon ? 20 : 10,
              color: deepPurple400,
              top: translateYLabel,
              fontSize: fontSize,
            },
            labelStyle,
          ]}
        >
          {label}
        </Animated.Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {leftIcon ? (
            leftIcon
          ) : leftIconName ? (
            <Touchable onPress={leftIconOnPress && leftIconOnPress}>
              <View style={[{ marginHorizontal: 5 }, leftIconStyle]}>
                <Icon
                  source={leftIconName}
                  color={leftIconColor}
                  size={leftIconSize}
                />
              </View>
            </Touchable>
          ) : null}
          {prefix && (
            <TextView
              small
              color={rgba(colors.textPrimary, 0.5)}
              style={{ marginEnd: 5 }}
            >
              {prefix}
            </TextView>
          )}
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={{
                marginHorizontal: 10,
              }}
            />
          ) : null}

          <RNTextInput
            style={[{ flex: 1, color: theme.colors.textPrimary }, style]}
            ref={inputRef}
            selectionColor={mainColor}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={password ? true : false}
            placeholder={p}
            placeholderTextColor={placeholderTextColor}
            maxFontSizeMultiplier={1}
            maxLength={maxLength}
            onFocus={handleFocus}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmit}
            value={value && value}
            underlineColorAndroid={'transparent'}
            onBlur={() => {
              //   onBlur && onBlur();
              setFocused(false);
            }}
            {...rest}
          />
        </View>
        {suffix && (
          <TextView
            small
            color={rgba(colors.textPrimary, 0.5)}
            style={{ marginStart: 5 }}
          >
            {suffix}
          </TextView>
        )}
        {rightIcon ? (
          rightIcon
        ) : rightIconName ? (
          <Touchable onPress={rightIconOnPress && rightIconOnPress}>
            <View style={[{ marginStart: 5 }, rightIconStyle]}>
              <Icon
                source={rightIconName}
                color={rightIconColor}
                size={rightIconSize}
              />
            </View>
          </Touchable>
        ) : null}
        {required && (
          <TextView
            style={{ position: 'absolute', right: 10, top: 10 }}
            required
          />
        )}
      </View>

      <TextView
        small
        style={{
          position: 'relative',
          top: 5,
          color: colors.textSecondary,
        }}
      >
        {helperText}
      </TextView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 15,
  },
  animatedStyle: {
    top: 3,
    left: 10,
    position: 'absolute',
    zIndex: 1000,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default withTheme(TextInput);
