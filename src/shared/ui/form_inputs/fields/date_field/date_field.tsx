import { InputField, type InputFieldProps } from '../input_field/input_field';
import { splitProps } from 'solid-js';
import './date_field.css';
import { CalendarIcon } from '@/shared/ui/icons/calendar';
import { IconStyle } from '@/shared/ui/icons/icon';

export function DateField(props: InputFieldProps) {
  const [pickedProps, restProps] = splitProps(props, ['afterElements']);
  let inputRef!: HTMLInputElement;

  const afterElements = () => {
    return (
      <>
        {pickedProps.afterElements}
        <CalendarIcon
          elementClass="date-field__icon"
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
      inputClass="date-field"
      afterElements={afterElements()}
      onClick={(e) => {
        e.currentTarget.showPicker();
      }}
      type="date"
    />
  );
}
