import './panel.css';

export const PanelBlock = ({ children, onClick }) => (
    <div className="panel-block" onClick={onClick}  >
        {children}
    </div>
);

 