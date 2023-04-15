import {TextInput, TextInputProps} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';

export type InputHandle = {
  getValue?: () => string;
  setValue?: (value: string) => void;
};

type IInputProps = {
  placeholder?: string;
} & TextInputProps;

export const Input = forwardRef<InputHandle, IInputProps>((props, ref) => {
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (newValue: string) => setValue(newValue),
  }));

  return (
    <TextInput
      {...props}
      value={value}
      placeholder={props.placeholder}
      onChangeText={setValue}
    />
  );
});
