import type {ToggleRadioInputProps} from "./typeToggleRadioInput.types.ts";

export const ToggleRadioInput = (
    {
        firstHtmlFor,
        secondHtmlFor,
        firstLabel,
        secondLabel,
        firstValue,
        secondValue,
        checkedValue,
        handleCheckedValue,
        register,
        registerOptions,
        classNameBox = '',
        classNameLabel = '',
        classNameInput = '',
        classNameText = '',
    }: ToggleRadioInputProps
) => {
    return (
        <div
            className={
            `
                border border-gray-20
                p-1.5 mt-5
                rounded-2xl
                max-w-[500px]
                flex justify-between gap-2
                ${classNameBox}   
            `
            }
        >
            <label
                htmlFor={firstHtmlFor}
                className={
                    `
                        ${classNameLabel}
                        w-full py-1.5
                        flex items-center justify-center
                        rounded-xl
                        cursor-pointer
                        transition-colors duration-200 ease-in-out
                        ${checkedValue === 'student' ? 'bg-purple-20 text-white-10' : ''}
                        `
                }
                onClick={() => handleCheckedValue('student')}
            >
                <input
                    id="student"
                    type="radio"
                    value={firstValue}
                    className={`hidden ${classNameInput}`}
                    {...register?.('role', registerOptions)}
                />
                <span className={`font-bold text-xl ${classNameText}`}>{firstLabel}</span>
            </label>

            <label
                htmlFor={secondHtmlFor}
                className={
                    `
                        ${classNameLabel}
                        w-full py-1.5
                        flex items-center justify-center
                        rounded-lg
                        cursor-pointer
                        transition-colors duration-200 ease-in-out
                        ${checkedValue === 'employer' ? 'bg-purple-20 text-white-10' : ''}
                        `
                }
                onClick={() => handleCheckedValue('employer')}
            >
                <input
                    id="employer"
                    type="radio"
                    value={secondValue}
                    className={`hidden ${classNameInput}`}
                    {...register?.('role', registerOptions)}
                />
                <span className={`font-bold text-xl ${classNameText}`}>{secondLabel}</span>
            </label>
        </div>
    );
};