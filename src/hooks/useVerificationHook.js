import { useState, useEffect } from 'react';

export default function useVerificationHook (codeLength) {
    
    let [code, setCode] = useState('');
    let inputStates = [];
    let inputClass = "circle-input";

    useEffect(() => {
        let finalCode = inputStates.map((input) => {
                            return input.digit;
                        }).join("");        
        // if (finalCode.length === codeLength) {
        //     setCode(finalCode);
        // } else setCode(null);
        setCode(finalCode);
    }, [inputStates]);

    for (let i = 0; i < codeLength; i++) {
        const [digit, setDigit] = useState("");
        inputStates.push({ digit, setDigit });
    }

    const re = /^[0-9\b]+$/;

    const handleChange = (e, index) => {
        let entry = e.target.value;

        if(entry != '' && !re.test(entry)) return;

        if(entry.length == 6 && !Number.isNaN(entry) && index == 0) {
            for(let i = 0; i < 6; i ++ ) {
                inputStates[i].setDigit(e.target.value[i]);
                let nextInput = document.querySelectorAll(`.${inputClass}`)[5];
                nextInput.focus();
            }
            let currentInput = document.querySelectorAll(`.${inputClass}`)[5];
            currentInput.focus();
        }

        if (entry.length <= 1 && !Number.isNaN(entry)) {
            inputStates[index].setDigit(e.target.value);
            if(index == 5 && e.target.value != "") {
                let currentInput = document.querySelectorAll(`.${inputClass}`)[index];
                currentInput.focus();
            }
            if (entry.length === 1) {
                if (index < codeLength - 1) {
                    let nextInput = document.querySelectorAll(`.${inputClass}`)[index + 1];
                    if (nextInput.value === "") nextInput.focus();
                }
            }
            else if (entry.length === 0 && inputStates[index].digit != "") {
                // let prevInput = document.querySelectorAll(`.${inputClass}`)[index - 1];
                // if (prevInput !== undefined) prevInput.focus();
            }
        }

    }
        

    const handleKeyDown = (e, index) => {
        ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
        if(e.keyCode  == 8 && index > 0 && inputStates[index].digit == "") {
            let currentInput = document.querySelectorAll(`.${inputClass}`)[index];
            let prevInput = document.querySelectorAll(`.${inputClass}`)[index - 1];
            if (prevInput !== undefined) prevInput.focus();
        }
        if(e.keyCode >= 48 && e.keyCode <= 57 && inputStates[index].digit != "") {
            let num = e.keyCode - 48;
            if(index < 5) {
                inputStates[index + 1].setDigit(num);
            }
            let currentInput = document.querySelectorAll(`.${inputClass}`)[index];
            let nextInput = document.querySelectorAll(`.${inputClass}`)[index + 1];
            if (nextInput !== undefined) nextInput.focus();
            // else currentInput.blur();
        }
    }

	return { code, inputStates, handleChange, handleKeyDown };
}