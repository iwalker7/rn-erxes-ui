/* eslint-disable react-native/no-inline-styles */
import React, { SetStateAction } from 'react';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ScreenUtils from '../../utils/screenUtils';
import { withTheme } from '../../core/theming';
import Surface from '../Surface';

export type ModalProps = RNModalProps & {
  onHide?: () => void;
  isVisible: boolean;
  onVisible: SetStateAction<any>;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle> | {};
  modalContainerStyle?: StyleProp<ViewStyle> | {};
  cancelable?: boolean;
  bottom?: boolean;
  withoutTouch?: boolean;
  bgColor?: string;
  headerComponent?: JSX.Element;
  iconClose?: JSX.Element;
  closeText?: string;
  transparent?: boolean;
  presentationStyle?:
    | 'fullScreen'
    | 'pageSheet'
    | 'formSheet'
    | 'overFullScreen';
  theme: ReactNativeErxes.Theme;
};

const Modal: React.FC<ModalProps> = ({
  theme,
  onHide,
  isVisible,
  onVisible,
  children,
  style,
  cancelable = true,
  bottom = false,
  headerComponent,
  withoutTouch,
  transparent = true,
  presentationStyle,
  modalContainerStyle,
  ...rest
}) => {
  const { colors } = theme;

  const onHideComplete = () => {
    if (cancelable) {
      onHide && onHide();
      onVisible && onVisible(false);
    }
  };

  //   const defaultHeader = () => {
  //       return <View
  //       style={{
  //         borderTopLeftRadius: 20,
  //         borderTopRightRadius: 20,
  //         backgroundColor: grey100,
  //       }}
  //     >
  //       {cancelable && (
  //         <Pressable
  //           style={styles.xbutton}
  //           onPress={() => onVisible(false)}
  //         >
  //           {iconClose ? (
  //             iconClose
  //           ) : (
  //             <TextView small color={'#616161'}>
  //               {closeText ? closeText : 'Close'}
  //             </TextView>
  //           )}
  //         </Pressable>
  //       )}
  //       <TextView style={styles.popoverHeader}>
  //         {headerTitle}
  //       </TextView>
  //       <Divider />
  //     </View>
  //   }

  return (
    <RNModal
      visible={isVisible}
      transparent={
        presentationStyle === 'pageSheet' || presentationStyle === 'formSheet'
          ? false
          : transparent
      }
      animationType={
        presentationStyle
          ? 'slide'
          : rest.animationType
          ? rest.animationType
          : 'fade'
      }
      onRequestClose={() => {
        onHideComplete();
      }}
      presentationStyle={ScreenUtils.isIOS ? presentationStyle : undefined}
    >
      {withoutTouch ? (
        <View
          style={[
            {
              backgroundColor:
                (presentationStyle === 'pageSheet' ||
                  presentationStyle === 'formSheet') &&
                ScreenUtils.isIOS
                  ? 'transparent'
                  : colors.backdrop,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          {children}
        </View>
      ) : (presentationStyle === 'pageSheet' ||
          presentationStyle === 'formSheet') &&
        ScreenUtils.isIOS ? (
        <Surface
          style={{
            flexDirection: 'column',
            justifyContent: bottom ? 'flex-end' : 'center',
          }}
        >
          {children}
        </Surface>
      ) : (
        <View
          style={[
            {
              flex: 1,
              width: '100%',
              justifyContent: bottom ? 'flex-end' : 'center',
              alignItems: 'center',
            },
            modalContainerStyle,
          ]}
        >
          <TouchableOpacity
            style={[
              {
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                backgroundColor:
                  (presentationStyle === 'pageSheet' ||
                    presentationStyle === 'formSheet') &&
                  ScreenUtils.isIOS
                    ? 'transparent'
                    : colors.backdrop,
              },
            ]}
            onPress={() => {
              onHideComplete();
            }}
          />
          <Surface
            style={[
              {
                backgroundColor: theme.colors.surfaceHighlight,
                borderRadius: theme.roundness,
              },
              style,
            ]}
          >
            {headerComponent ? headerComponent : null}
            {children}
          </Surface>
        </View>
      )}
    </RNModal>
  );
};

export default withTheme(Modal);
