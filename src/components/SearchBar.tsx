import React, {createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {local} from '../Localization/local';
import {Colors} from '../theme/Colors';
import {Fonts} from '../theme/Fonts';
import {SearchSVG} from '../theme/svg/svg';

interface Props {
  isFocused: boolean;

  text: string;

  onChange: (text: string) => void;
  onFocus: () => void;
  onCancel: () => void;
}

export function SearchBar(props: Props) {
  const input = createRef<TextInput>();

  const onBlur = () => {
    input.current?.clear();

    props.onCancel();
  };

  const onFocus = () => {
    props.onFocus();
  };

  const handleCancel = () => {
    input.current?.blur();
  };

  const handleFocus = () => {
    input.current?.focus();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback style={styles.touchable} onPress={handleFocus}>
        <View style={styles.search}>
          <SearchSVG fill={Colors.GrayText} />
          <TextInput
            ref={input}
            style={styles.input}
            value={props.text}
            placeholder={local.search}
            onChangeText={props.onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
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
    ...Fonts.SemiBold(),
    color: Colors.GrayText,
    paddingLeft: 8,
    flex: 1,
  },
  cancelButton: {
    marginLeft: 16,
  },
  cancel: {
    ...Fonts.SemiBold(),
    color: Colors.GrayText,
  },
});
