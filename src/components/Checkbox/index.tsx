import "./styles.scss";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import colors from "constants/colors";

type Props = {
  checked: boolean;
  className?: string;
  style?: Record<string, any>;
  iconSize?: number;
  valid?: boolean;
};

function Checkbox({
  checked = true,
  className,
  iconSize,
  style,
  valid = true,
}: Props): JSX.Element {
  const getBorderColor = () => {
    if (!valid) {
      return "border-danger";
    }

    if (valid && checked) {
      return "border-success";
    }

    return "border-grey";
  };

  const getClassNames = () => {
    return `flex justify-content-center align-items-center checkbox-wrapper ${className} ${getBorderColor()}`;
  };

  return (
    <div className={getClassNames()} style={style}>
      {checked && (
        <>
          {valid ? (
            <FaCheck
              size={iconSize || 9}
              color={valid ? colors.success : colors.danger}
            />
          ) : (
            <MdClose size={10} color={colors.danger} />
          )}
        </>
      )}
    </div>
  );
}

export default Checkbox;
