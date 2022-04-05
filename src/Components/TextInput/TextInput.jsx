import P from 'prop-types';
import './textinput.css';

export const TextInput = ({ placeholder, value, handleChange, typeInput = "text", className, disabled = false }) => {

  if (disabled)
    return (
      <label
        className={className ? className : "label-input"}
      >{value}</label>
    )
  else
    return (
      <input
        className={className ? className : "text-input"}
        onChange={(e) => handleChange(e.target.value.toUpperCase())}
        value={value}
        disabled={disabled}
        type={typeInput}
        placeholder={placeholder}
      />
    );
};

TextInput.propTypes = {
  value: P.string.isRequired,
  placeholder: P.string.isRequired,
  handleChange: P.func.isRequired,
  typeInput: P.string.isRequired,
};
