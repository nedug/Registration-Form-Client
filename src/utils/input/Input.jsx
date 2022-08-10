import React from 'react';

const Input = (props) => {
    return (
        <input onChange={(event) => props.setValue(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}
               className='bg-gray-200 w-[100%] p-3 my-3 border border-white rounded-lg outline-none hover:shadow'
        />
    );
};

export default Input;
