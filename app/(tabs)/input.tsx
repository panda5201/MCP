import { StyleSheet, TextInput } from 'react-native';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
}: InputProps) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
};

export const NIMInput = ({
  value,
  onChangeText,
}: InputProps) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Enter your NIM"
      keyboardType="numeric"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});