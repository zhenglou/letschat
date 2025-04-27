import React from 'react';
import clsx from 'clsx'
import { LucideProps } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
const classInput = `
    flex text-gray-500 gap-2 mt-5 mb-6 w-full h-12 items-center px-4 py-2 rounded-md
    border-[#e9ebed] border-2 
    [&>input]:outline-none 
    [&>input]:text-lg 
    [&>input]:bg-transparent
    [&>input]:flex-grow
    [&>input]:h-full
    [&>textarea]:outline-none 

`
type Props = {
    // Icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
    className?: string
    children: React.ReactNode
    // error?: FieldError
}
interface FormInputProps {
    children: React.ReactNode; // 确保 children 的类型被定义
    className?: string;
    Icon?: LucideIcon
}
const FormInput: React.FC<FormInputProps> = ({ className, children, Icon }) => {
    return (
        <div className={clsx(className, classInput)} >
            {Icon && <Icon />}
            {children}
        </div>
    )
}

export default FormInput
