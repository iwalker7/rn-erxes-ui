/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import type { SetStateAction } from 'react';
import type { RefObject } from 'react';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme, withTheme } from '../../core/theming';
import Surface from '../Surface';
import Modal from '../Modal';
import Touchable from '../Touchable';
import TextView from '../Typography';
import ScreenUtils from '../../utils/screenUtils';
import { useEffect } from 'react';
import Divider from '../Divider';

export type PickerProps = {
  data: any[];
  value?: any[];
  onChange: (item: any) => void;
  isVisible: boolean;
  onVisible: SetStateAction<any>;
  mode?: 'SINGLE' | 'MULTI';
  rightIcon?: JSX.Element;
  from?:
    | RefObject<View>
    | ((sourceRef: RefObject<View>, openPopover: () => void) => React.ReactNode)
    | React.ReactNode;
  selectionColor?: string;
  placeholder?: string;
  saveText?: string;
  closeText?: string;
  saveTextStyle?: StyleProp<ViewStyle>;
  closeTextStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  theme: ReactNativeErxes.Theme;
};
const Picker: React.FC<PickerProps> = ({
  theme,
  selectionColor = theme.colors.surfaceHighlight,
  mode = 'SINGLE',
  value = [],
  data = [],
  onChange,
  placeholder = 'Choose',
  isVisible,
  onVisible,
  rightIcon,
  saveText = 'Save',
  closeText = 'Close',
  saveTextStyle,
  closeTextStyle,
  placeholderStyle,
  itemStyle,
  modalStyle,
}) => {
  const { colors, roundness } = useTheme(theme);
  const { screenHeight, screenWidth } = ScreenUtils;
  const [selections, setSelections] = useState<any[]>([]);

  useEffect(() => {
    if (value) {
      setSelections([value]);
    }
  }, [value]);

  const onSelect = (item: any) => {
    if (mode === 'SINGLE') {
      setSelections(selections?.includes(item) ? [] : [item]);
      return;
    }
    let temp = [...selections];
    if (selections?.length > 0 && selections.includes(item)) {
      temp = selections?.filter((el: number) => el !== item);
      setSelections(temp);
      return;
    }
    temp.push(item);
    setSelections(temp);
  };

  const onHide = () => {
    if (selections.length < 0) {
      return;
    } else {
      onChange && onChange(selections);
    }
    onVisible(false);
  };

  return (
    <>
      <Modal
        bottom
        isVisible={isVisible}
        onVisible={onVisible}
        onHide={onHide}
        style={[
          {
            width: screenWidth,
            paddingBottom: 25,
            maxHeight: screenHeight - 100,
            backgroundColor: colors.surface,
          },
          modalStyle,
        ]}
      >
        <Surface>
          <View
            style={{
              height: 50,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 15,
              marginBottom: 5,
              backgroundColor: colors.surfaceHighlight,
            }}
          >
            <Touchable
              style={{
                flexDirection: 'row',
              }}
              onPress={onHide}
            >
              <TextView bold color={colors.textPrimary} style={closeTextStyle}>
                {closeText}
              </TextView>
            </Touchable>
            <Touchable
              style={{
                flexDirection: 'row',
              }}
              onPress={onHide}
            >
              <TextView bold color={colors.success} style={saveTextStyle}>
                {saveText}
              </TextView>
            </Touchable>
          </View>

          <FlatList
            data={data}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item, index }) => (
              <Touchable
                key={index.toString()}
                onPress={() => {
                  if (mode === 'SINGLE') {
                    onVisible(false);
                    onHide();
                  }
                  onSelect(item);
                }}
              >
                <View
                  style={[
                    styles.item,
                    {
                      backgroundColor:
                        selections && selections?.includes(item)
                          ? selectionColor
                          : undefined,
                    },
                    itemStyle,
                  ]}
                >
                  <TextView>{item}</TextView>
                </View>
              </Touchable>
            )}
          />
        </Surface>
      </Modal>
      <Touchable onPress={() => onVisible(!isVisible)}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.surfaceHighlight,
              borderRadius: roundness,
              borderColor: '#C5C6CC',
              borderWidth: 1,
            },
            placeholderStyle,
          ]}
        >
          <TextView>
            {selections?.length > 0
              ? JSON.stringify(selections).replace(/[.""*+?^${}()|[\]\\]/g, '')
              : selections?.length === 1
              ? selections[0]
              : placeholder}
          </TextView>
          {rightIcon && rightIcon}
        </View>
      </Touchable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    width: '100%',
    marginBottom: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default withTheme(Picker);
