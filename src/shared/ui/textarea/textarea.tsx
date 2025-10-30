import { TextareaField, TextareaFieldProps } from '../textarea_field/textarea_field';
import './textarea.css';
import { FieldWrapper } from '../field_wrapper/field_wrapper';

export interface TextareaProps extends TextareaFieldProps {
  label?: string;
  isRequired?: boolean;
  feedbackMessage?: string;
}

export function Textarea(props: TextareaProps) {
  return (
    <FieldWrapper {...props} labelFor={props.name}>
      <TextareaField {...props} />
    </FieldWrapper>
  );
}
