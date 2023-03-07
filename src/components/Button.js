/*
* FILE :    Button.js
* PROJECT : Advanced Web Frameworks - Assignment #1
* PROGRAMMER : Michael Dremo
* FIRST VERSION : 2023-03-06
* DESCRIPTION : This file represetns a customizable button element

*/

import React from 'react';

const Button = ({text,onClick,colour, classN}) =>{
    return(<button color={colour} onClick={onClick} className={classN}>{text}</button>)
}

export default Button;