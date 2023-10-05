"use client"
import { useState, useEffect } from 'react'
import { Callout } from "@tremor/react";
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export default function CallOut({title, message, isSuccess} : {title:string; message:string; isSuccess:boolean}) {
    const [isVisible, setIsVisible] = useState(true);
    const [success, setSuccess] = useState(isSuccess);
    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 3000); // Setelah 3 detik, komponen akan dihilangkan
    
        return () => {
          clearTimeout(timer);
        };
    }, []);
    return (
        isVisible&&(
        <div className='fixed bottom-10 right-10'>
            <Callout className="mt-4" title={title} icon={isSuccess?CheckCircleIcon:ExclamationTriangleIcon} color={isSuccess?'teal':'rose'}>
            {message}
            </Callout>
        </div> 
        )
        )   
}
