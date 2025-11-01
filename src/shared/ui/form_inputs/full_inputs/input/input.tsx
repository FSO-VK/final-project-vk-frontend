import {
  LabelsWrapper,
  type LabelsWrapperProps,
} from '../../field_wrappers/labels_wrapper/labels_wrapper';
import { InputField, type InputFieldProps } from '../../fields/input_field/input_field';

export type InputProps = LabelsWrapperProps & InputFieldProps;

export function Input(props: InputProps) {
  return (
    <LabelsWrapper {...props}>
      <InputField {...props} />
    </LabelsWrapper>
  );
}
