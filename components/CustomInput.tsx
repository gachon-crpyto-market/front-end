import exp from "constants";
import React, { useState } from "react";

interface InputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    sideText?: string;
}


const CustomInput = ({ label, type, placeholder, value, sideText }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="mt-0 bg-white">
            <div className="w-full relative mt-0 mb-4 bg-transparent" >
                <input
                    type="text"
                    name={label}
                    id={value}
                    className={`
      block h-12 w-full rounded-lg border-0 p-3 pr-20 text-white bg-gray-100 text-sm
      border-[1px] border-transparent hover:border-gray-600 transition-all ease-in-out ${isFocused ? 'duration-0' : 'duration-300'}
      focus:outline-none focus:border-yellow-500 caret-yellow-500
    `}
                    onClick={() => setIsFocused(true)}
                    onMouseOver={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onMouseOut={() => setIsFocused(false)}

                />
                <p className="text-gray-300 absolute left-4 bottom-3 font-normal "> {sideText}</p>
            </div>
        </div>
    )
}

export default CustomInput;