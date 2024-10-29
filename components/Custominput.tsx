import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'

//import { Control, Field, FieldPath, Form } from 'react-hook-form'
import { Control, FieldPath } from 'react-hook-form'
import { authformSchema } from '@/lib/utils'
import { z } from 'zod'

//const formSchema = authformSchema( 'sign-up' )

// interface Custominput {
//     control : Control<z.infer<typeof formSchema>>,
//     name : FieldPath<z.infer<typeof formSchema>>,
//     label : string,
//     placeholder : string
// }

interface Custominput {
    control: Control<z.infer<ReturnType<typeof authformSchema>>>;
    name: FieldPath<z.infer<ReturnType<typeof authformSchema>>>;
    label: string;
    placeholder: string;
}

const Custominput = ({ control, name, label, placeholder } : Custominput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className=''>
                        {label}
                    </FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <input
                                placeholder={placeholder}
                                className='input-class'
                                type={ name === 'password' ? 'password' : 'text'}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default Custominput