import P from 'prop-types'; 
import './label.css';

export const Label = ({ text, classname }) => (
    <label className={classname ? classname : 'label-Label'}  >
        {text}
    </label>
);


Label.propTypes = {
    text: P.string.isRequired 
};
