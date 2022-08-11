import React, { useState } from 'react';
import eye1 from '../../assets/img/eye1.ico';
import eye2 from '../../assets/img/eye2.ico';


const InputPas = (props) => {
    const [isSeenPassword, setSeenPassword] = useState(false);


    return (
        <div className='relative w-[100%]'>
            <input onChange={(event) => props.setValue(event.target.value)}
                   value={props.value}
                   type={isSeenPassword ? 'text' : 'password'}
                   placeholder={props.placeholder}
                   className='bg-gray-100 w-[100%] p-3 my-3 rounded-lg outline-none hover:shadow'
            />

            <img
                className='cursor-pointer absolute right-4 top-5'
                src={isSeenPassword ? eye2 : eye1}
                alt='eye' width={'29px'}
                onClick={() => setSeenPassword(!isSeenPassword)}
            />
        </div>
    );
};

export default InputPas;
