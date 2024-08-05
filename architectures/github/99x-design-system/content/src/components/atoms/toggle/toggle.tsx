import { Switch as AntSwitch } from 'antd';
import { SwitchProps as AntSwitchProps } from 'antd/es/switch';

export interface ToggleProps extends AntSwitchProps {
  checked: boolean;
  className?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'default';
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  onClick?: (checked: boolean) => void;
}

export const Toggle = ({ size = 'default', ...props }: ToggleProps) => {
  return (
    <AntSwitch
      className={`bg-gray-300 ${props.className}`}
      size={size}
      {...props}
    />
  );
};
