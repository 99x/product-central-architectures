import AntInput from 'antd/es/input';

export interface InputProps {
  id?: string;
  defaultValue?: string;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  maxLength?: number;
  showCount?: boolean;
  value?: string;
  placeholder?: string;
  label?: string;
  classNames?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: () => void;
}

export const Input = (props: InputProps) => {
  return (
    <>
      {props.label && (
        <label
          htmlFor={props.id}
          className="text-sm block font-semibold mb-4 text-gray-600"
        >
          {props.label}
        </label>
      )}
      <AntInput
        className={`${props.classNames}`}
        size={props.size}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        allowClear={props.allowClear}
        id={props.id}
        maxLength={props.maxLength}
        prefix={props.prefix}
        suffix={props.suffix}
        showCount={props.showCount}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onPressEnter={props.onPressEnter}
      />
    </>
  );
};
