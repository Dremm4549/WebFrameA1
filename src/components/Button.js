import React from 'react';

const Button = ({text,onClick,colour, classN}) =>{
    return(<button color={colour} onClick={onClick} className={classN}>{text}</button>)
}

export default Button;