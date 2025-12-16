import { InputField, type InputFieldProps } from '../input_field/input_field';
import { splitProps } from 'solid-js';
import './time_field.css';
import { TimeIcon } from '@/shared/ui/icons';
import { IconStyle } from '@/shared/ui/icons';

export function TimeField(props: InputFieldProps) {
  const [pickedProps, restProps] = splitProps(props, ['afterElements']);
  let inputRef!: HTMLInputElement;

  const afterElements = () => {
    return (
      <>
        {pickedProps.afterElements}
        <TimeIcon
          elementClass="time-field__icon"
          iconStyle={IconStyle.Active}
          onClick={() => {
            inputRef.showPicker();
          }}
        />
      </>
    );
  };
  return (
    <InputField
      {...restProps}
      ref={inputRef}
      inputClass="time-field"
      afterElements={afterElements()}
      onClick={(e) => {
        e.currentTarget.showPicker();
      }}
      type="time"
    />
  );
}
