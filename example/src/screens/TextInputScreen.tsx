/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { TextView, Colors, TextInput, useTheme } from 'react-native-erxes-ui';
import styles from '../styles';

const TextInputScreen: React.FC<any> = () => {
  const theme = useTheme();
  const [searchText, setSearchText] = React.useState<string>('');
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.segment}>
        <TextView bold>{`Props + React native-ын TextInputProps`}</TextView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
        <View style={styles.segment}>
          <View style={styles.props}>
            <TextView bold>
              type<TextView color={Colors.grey600}>: string</TextView>
            </TextView>

            <View
              style={{
                backgroundColor: Colors.grey200,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <TextView small> default | outline | filled </TextView>
            </View>
          </View>

          <TextInput
            theme={theme}
            label={'Label'}
            placeholder="Default"
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
            containerStyle={{ marginVertical: 3 }}
          />
          <TextInput
            theme={theme}
            label={'Label'}
            type="text"
            helperText="helper test"
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
            containerStyle={{ marginBottom: 8 }}
          />
          <TextInput
            theme={theme}
            label={'Label'}
            placeholder="prefix"
            prefix={'$'}
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
            containerStyle={{ marginVertical: 3 }}
          />
          <TextInput
            theme={theme}
            label={'Label'}
            placeholder="Suffix"
            suffix={'$'}
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
            containerStyle={{ marginVertical: 3 }}
          />
          <TextInput
            height={100}
            theme={theme}
            label={'BIG LABEL'}
            backgroundColor={'white'}
            type="filled"
            placeholder="Filled"
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
          />
        </View>

        <View style={styles.segment}>
          <TextView bold>
            icon
            <TextView color={Colors.grey600}>{`: JSX.Element`}</TextView>
          </TextView>
          <TextInput
            theme={theme}
            leftIconName="eye"
            placeholder="Outline"
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
          />
          <TextView
            small
            color={Colors.grey600}
            style={{ paddingHorizontal: 10 }}
          >
            {`Example: <Button icon={<Icon name="cloud-check" size={15} />}`}
          </TextView>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            required
            <TextView color={Colors.grey600}>{`: boolean`}</TextView>
          </TextView>
          <TextInput
            theme={theme}
            required
            placeholder="Outline"
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
          />
        </View>

        <View style={styles.segment}>
          <TextView bold>
            value
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Бичиж байхад харуулах утга</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onChangeText
            <TextView
              color={Colors.grey600}
            >{`: (value: string) => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Бичиж байхад өөрчлөлтийг хадгалах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onSubmitEditing
            <TextView
              color={Colors.grey600}
            >{`: (value: string) => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>
              Бичиж дууссаны дараа өөрчлөлтийг хадгалах функц
            </TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            ref
            <TextView
              color={Colors.grey600}
            >{`: LegacyRef<TouchableOpacity | any>`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Reference</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            onFocus
            <TextView
              color={Colors.grey600}
            >{`: (value: string) => void`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Фокуслах үед дуудагдах функц</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            placeholder
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>Бичих утгын тайлбар</TextView>
          </View>
        </View>

        <View style={styles.segment}>
          <TextView bold>
            placeholderTextColor
            <TextView color={Colors.grey600}>{`: string`}</TextView>
          </TextView>
          <View style={{ marginVertical: 10 }}>
            <TextView small>placeholder-ын өнгө</TextView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TextInputScreen;
