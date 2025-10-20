import { InputField, InputState } from '../input_field/input_field';
import { createSignal, JSX, JSXElement, splitProps, Switch, Match } from 'solid-js';
import './hidden_input_field.css';
import EyeSvg from './eye.svg';
import ClosedEyeSvg from './closed_eye.svg';

export interface HiddenInputFieldProps {
  name?: string;
  id?: string;
  placeholder?: string;
  maxlength?: number;
  state?: InputState;
  elementClass?: string;
  onInput?: JSX.EventHandler<HTMLElement, InputEvent>;
  onFocusOut?: JSX.EventHandler<HTMLElement, FocusEvent>;
  afterElements?: JSXElement;
}

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
        >
          <Switch>
            <Match when={type() !== 'password'}>
              <img alt="Иконка открытого глаза" src={EyeSvg} />
            </Match>
            <Match when={type() === 'password'}>
              <img alt="Иконка закрытого глаза" src={ClosedEyeSvg} />
            </Match>
          </Switch>
        </button>
      </>
    );
  };
  return <InputField {...restProps} afterElements={afterElements()} type={type()} />;
}
