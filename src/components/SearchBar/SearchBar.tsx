import React, {createRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {local} from '../../Localization/local';
import {Colors} from '../../theme/Colors';
import {Fonts} from '../../theme/Fonts';
import {ClearSVG, SearchSVG} from '../../theme/svg/svg';

interface Props {
  isFocused: boolean;

  text: string;

  onChange: (text: string) => void;
  onFocus: () => void;
  onCancel: () => void;
  onClear: () => void;
}

export function SearchBar(props: Props) {
  const input = createRef<TextInput>();

  const [isClear, setIsClear] = useState<boolean>(false);

  const handleClear = () => {
    input.current?.clear();

    props.onClear();

    setIsClear(false);
  };

  const handleCancel = () => {
    setIsClear(false);

    input.current?.clear();
    input.current?.blur();

    props.onCancel();
  };

  const handleFocus = () => {
    input.current?.focus();
  };

  const handleChange = (text: string) => {
    setIsClear(text.length !== 0);

    props.onChange(text);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback style={styles.touchable} onPress={handleFocus}>
        <View style={styles.search}>
          <SearchSVG fill={Colors.Gray} />
          <TextInput
            ref={input}
            style={styles.input}
            value={props.text}
            placeholder={local.search}
            onChangeText={handleChange}
            onFocus={props.onFocus}
          />
          {isClear && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <ClearSVG fill={Colors.White} width={16} height={16} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>

      {props.isFocused && (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancel}>{local.cancel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchable: {
    flex: 1,
  },
  search: {
    flex: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: Colors.GrayBackground,
  },
  input: {
    ...Fonts.Bold(),
    color: Colors.Gray,
    paddingLeft: 8,
    flex: 1,
  },
  cancelButton: {
    marginLeft: 16,
  },
  cancel: {
    ...Fonts.SemiBold(),
    color: Colors.Gray,
  },
  clearButton: {
    backgroundColor: Colors.Gray,
    height: 16,
    width: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
