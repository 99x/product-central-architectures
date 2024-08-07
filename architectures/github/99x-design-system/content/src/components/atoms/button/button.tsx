import AntButton from 'antd/es/button';
import classNames from 'classnames';

export interface ButtonProps {
  type?: 'block' | 'dashed' | 'link' | 'text' | 'outlined';
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'danger'
    | 'warning'
    | 'success';
  size?: 'small' | 'middle' | 'large';
  shape?: 'default' | 'circle' | 'round';
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  classNames?: string;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  href?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const getButtonClasses = (type: string, variant: string): string => {
  const baseClasses: Record<string, string> = {
    block: `theme-bg--${variant} theme-bg-hover--${variant} ${
      variant != 'neutral' ? 'theme-text--white' : 'theme-text--base'
    }`,
    dashed: `theme-border--${variant} theme-border-hover--${variant} theme-text--${variant} theme-text-hover--${variant}`,
    outlined: `theme-border--${variant} theme-border-hover--${variant} theme-text--${variant} theme-text-hover--${variant}`,
    link: `theme-text--${variant} theme-text-hover--${variant}`,
    text: `theme-text--${variant} theme-text-hover--${variant} hover:!bg-transparent`,
    default: `theme-text--${variant} theme-text-hover--${variant}`,
  };
  return baseClasses[type] || baseClasses['default'];
};

export const Button = ({
  type = 'block',
  size = 'middle',
  fullWidth = false,
  disabled = false,
  variant = 'primary',
  htmlType = 'button',
  ...props
}: ButtonProps) => {
  const buttonClasses = classNames(
    getButtonClasses(type, variant),
    'disabled:theme-bg-hover--neutral flex items-center justify-center focus-visible:!ring-0 focus-visible:!outline-none',
    props.classNames
  );

  return (
    <AntButton
      className={buttonClasses}
      type={
        type === 'block'
          ? 'primary'
          : type === 'dashed'
          ? 'dashed'
          : type === 'link'
          ? 'link'
          : type === 'text'
          ? 'text'
          : 'default'
      }
      size={size}
      block={fullWidth}
      shape={props.shape}
      disabled={disabled}
      ghost={disabled}
      href={props.href}
      loading={props.loading}
      icon={props.icon}
      iconPosition={props.iconPosition}
      onClick={props.onClick}
      htmlType={htmlType}
    >
      {props.label}
    </AntButton>
  );
};
