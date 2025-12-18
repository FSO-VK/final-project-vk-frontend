import { InputField, type InputFieldProps } from '../input_field/input_field';
import { createSignal, splitProps, Switch, Match } from 'solid-js';
import './hidden_input_field.css';
import EyeSvg from './eye.svg';
import ClosedEyeSvg from './closed_eye.svg';

export type HiddenInputFieldProps = InputFieldProps;

export function HiddenInputField(props: HiddenInputFieldProps) {
  const [type, setType] = createSignal('password');
  const [oldAfterElements, restProps] = splitProps(props, ['afterElements']);
  const afterElements = () => {
    return (
      <>
        {oldAfterElements.afterElements}
        <button
          class="hidden-input-field__show-button"
          type="button"
          onClick={() => setType(type() === 'password' ? 'text' : 'password')}
          aria-label="Показать пароль"
        >
          <Switch>
            <Match when={type() !== 'password'}>
              <img
                class="hidden-input-field__eye"
                alt="Иконка открытого глаза"
                src={EyeSvg}
                aria-hidden
              />
            </Match>
            <Match when={type() === 'password'}>
              <img
                class="hidden-input-field__eye"
                alt="Иконка закрытого глаза"
                src={ClosedEyeSvg}
                aria-hidden
              />
            </Match>
          </Switch>
        </button>
      </>
    );
  };
  return <InputField {...restProps} afterElements={afterElements()} type={type()} />;
}
