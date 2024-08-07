import { Radio as AntRadio } from "antd";
import { RadioChangeEvent } from "antd/es/radio";

export interface BaseProps {
  optionType: "button" | "default";
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (e: RadioChangeEvent) => void;
}

export interface RadioButtonProps extends BaseProps {
  optionType: "button";
  buttonStyle?: "solid" | "outline";
  size?: "small" | "middle" | "large";
}

export type RadioProps = BaseProps | RadioButtonProps;

export const Radio = ({
  optionType = "default",
  options,
  ...props
}: RadioProps) => {
  return (
    <div className="mb-4">
      <AntRadio.Group
        options={options}
        optionType={optionType}
        buttonStyle={(props as RadioButtonProps).buttonStyle}
        size={(props as RadioButtonProps).size}
        {...props}
      />
    </div>
  );
};
