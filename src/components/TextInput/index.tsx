import "./style.scss";

type Props = {
  label?: string;
  placeholder?: string;
  icon?: JSX.Element | null | undefined;
  className?: string;
  inputClassName?: string;
  style?: Record<string, any>;
  inputStyle?: Record<string, any>;
  mainWrapperStyle?: Record<string, any>;
  value?: string;
  onChange: (e: any) => void;
  onKeyDown?: (e: any) => void;
  type?: string;
  maxLength?: number;
  error?: Record<string, any>;
  ownRef?: any;
  onKeyUp: (e: any) => void;
};
function TextInput({
  icon,
  type,
  label,
  placeholder,
  className,
  inputClassName,
  style,
  onKeyUp,
  value,
  onChange,
  onKeyDown,
  maxLength,
  error,
  inputStyle,
  mainWrapperStyle,
  ownRef,
}: Props): JSX.Element {
  const getClassNames = () => {
    const errorClass = error ? "invalid-input" : "valid-input";
    return `text-input-wrapper border-line-bottom ${className} ${errorClass}`;
  };

  const getInputClassNames = () => {
    return `large-text main-input avenir flex-1 ${inputClassName}`;
  };

  const getInputStyles = () => {
    return { ...{ width: "100%" }, ...inputStyle };
  };

  return (
    <div style={mainWrapperStyle}>
      <div className={getClassNames()} style={style}>
        {label && (
          <div className="flex align-items-center">
            <span className="input-label small-text">{label}</span>
            {error && (
              <span className="x-small-text pl-2 text-danger avenir-book">
                {error}
              </span>
            )}
          </div>
        )}

        <div className="flex justify-content-space-between align-items-center">
          <input
            type={type || "text"}
            className={getInputClassNames()}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange?.(e);
            }}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
            ref={ownRef}
            onKeyUp={onKeyUp}
            style={getInputStyles()}
          />
          {icon && icon}
        </div>
      </div>
    </div>
  );
}

export default TextInput;
