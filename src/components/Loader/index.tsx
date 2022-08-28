/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  View,
  StyleProp,
} from 'react-native';
import { withTheme } from '../../core/theming';

export type LoaderProps = {
  backgroundColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  custom?: JSX.Element;
  theme: ReactNativeErxes.Theme;
};

const Loader: React.FC<LoaderProps> = ({
  backgroundColor,
  style,
  color,
  custom,
  theme,
}) => {
  const { colors } = theme;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor || 'transparent',
          },
          style,
        ]}
      >
        {custom ? (
          custom
        ) : (
          <ActivityIndicator
            size="small"
            color={color || colors.surfaceHighlight}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
});

export default withTheme(Loader);
