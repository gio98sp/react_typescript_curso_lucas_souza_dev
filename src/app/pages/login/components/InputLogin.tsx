
import { forwardRef } from 'react';
interface IInputLoginProps {
  label: string;
  htmlFor: string;
  type: string;
  name: string;
  value: string;
  onChange: (newValue: string) => void;
  onPressEnter?: () => void;
}

export const InputLogin = forwardRef<HTMLInputElement, IInputLoginProps>((props, ref) => {
  return (
    <div>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" && props.onPressEnter?.())}
        ref={ref}
      />
    </div>
  )
});
