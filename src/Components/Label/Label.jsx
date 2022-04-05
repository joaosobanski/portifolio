import P from 'prop-types'; 
import './label.css';

export const Label = ({ text, classname, onClick }) => (
    <label className={classname ? classname : 'label-Label'} onClick={onClick} >
        {text}
    </label>
);


Label.propTypes = {
    text: P.string.isRequired 
};
