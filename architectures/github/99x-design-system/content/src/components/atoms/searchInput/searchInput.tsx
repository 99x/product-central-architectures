import AntInput from 'antd/es/input';
import { InputProps } from '../input/input';

export interface SearchInputProps extends InputProps {
  enterButton?: false | React.ReactNode;
  loading?: boolean;
  onSearch?: () => void;
}

export const SearchInput = ({
  size = 'middle',
  ...props
}: SearchInputProps) => {
  return (
    <AntInput.Search
      className={`${props.classNames}`}
      size={size}
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
      enterButton={props.enterButton}
      loading={props.loading}
      onSearch={props.onSearch}
    />
  );
};
