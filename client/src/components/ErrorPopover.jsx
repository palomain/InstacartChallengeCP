import React from 'react';
import '../../styles/popover.css'

const ErrorPopover = ({style, message})=> {
    return <div
        style={{
            ...style,
        }}

        className="error-popover"
    >
        <strong>{message}</strong>
    </div>;
}



export default ErrorPopover;