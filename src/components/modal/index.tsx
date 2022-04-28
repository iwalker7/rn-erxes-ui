/* eslint-disable react-native/no-inline-styles */
import React, { SetStateAction } from 'react';
import { Pressable, TouchableWithoutFeedback } from 'react-native';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps as RNViewProps,
  ViewStyle,
} from 'react-native';
import TextView from '../Typography';
import Divider from '../Divider';
import { bgDialog, bgLight, coreGray } from '../../styles/colors';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import ScreenUtils from '../../utils/screenUtils';

export type ModalProps = RNModalProps &
  RNViewProps & {
    onHide?: () => void;
    isVisible: boolean;
    onVisible: SetStateAction<any>;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle> | any | {};
    cancelable?: boolean | true;
    bottom?: boolean;
    withHeader?: boolean;
    headerText?: string;
    withoutTouch?: boolean;
    animationType?: 'fade' | 'none' | 'slide' | undefined;
    bgColor?: string;
    shadowRadius?: string;
    modalHeader?: JSX.Element;
  };

const Modal: React.FC<ModalProps> = ({
  onHide,
  isVisible,
  onVisible,
  children,
  style,
  cancelable = true,
  animationType,
  bottom = false,
  shadowRadius,
  modalHeader,
  withHeader,
  headerText,
  withoutTouch,
  ...rest
}) => {
  const onHideComplete = () => {
    if (cancelable) {
      onHide && onHide();
      onVisible && onVisible(false);
    }
  };

  return (
    <RNModal
      visible={isVisible}
      animationType={animationType || 'fade'}
      transparent
      onRequestClose={() => {
        onHideComplete();
      }}
    >
      {withoutTouch ? (
        <View style={styles.dialogContainer}>
          <View
            style={[
              {
                flex: 1,
                width: '100%',
              },
              style,
            ]}
          >
            {children}
          </View>
        </View>
      ) : (
        <View
          style={[
            {
              flex: 1,
              width: '100%',
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            },
            style,
          ]}
        >
          <TouchableOpacity
            style={styles.dialogContainer}
            activeOpacity={1}
            onPressOut={() => {
              onHideComplete();
            }}
          >
            {bottom ? (
              <View style={[{ flex: 1, justifyContent: 'flex-end' }]}>
                <TouchableWithoutFeedback>
                  <KeyboardAvoidingView
                    style={[
                      styles.modalView,
                      {
                        marginBottom: ScreenUtils.isIphoneWithNotch() ? 30 : 10,
                        backgroundColor: rest?.bgColor ? rest?.bgColor : '#fff',
                      },
                    ]}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                  >
                    {children}
                  </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback>
                  <View
                    style={[
                      styles.modalView,
                      {
                        width: '90%',
                        shadowRadius: shadowRadius,
                        minHeight: 50,
                      },
                      style,
                    ]}
                  >
                    {withHeader && (
                      <View
                        style={{
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          backgroundColor: bgLight,
                        }}
                      >
                        <TextView style={styles.popoverHeader}>
                          {headerText}
                        </TextView>
                        <Divider />
                      </View>
                    )}
                    {cancelable && (
                      <Pressable
                        style={styles.xbutton}
                        onPress={() => onVisible(false)}
                      >
                        <TextView small color={'#616161'}>
                          Close
                        </TextView>
                      </Pressable>
                    )}
                    {modalHeader}
                    {children}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  xbutton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 20,
  },
  popoverHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: coreGray,
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: coreGray,
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '500',
    height: 50,
    backgroundColor: 'red',
  },
  dialogContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: bgDialog,
  },
});

export default Modal;
