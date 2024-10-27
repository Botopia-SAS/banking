'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"



import { z } from "zod"
import { Divide, Loader2 } from 'lucide-react';
import { authformSchema } from '@/lib/utils';
import Custominput from '../Custominput';
import { response } from 'express';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/actions/user.actions';
import { signUp } from '@/lib/actions/user.actions';


const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();

    const [user, setUser] = useState(null)
    const [isLoading, setisLoading] = useState(false);

    const formSchema = authformSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setisLoading(true);

        try {
            // Sign up with Appwrite & create plaid token

            if (type === 'sign-up') {
                const newUser = await signUp(data);
                console.log(newUser);
                setUser(newUser);
            }

            if (type === 'sign-in') {
                // const response = await signIn({
                //     email: data.email,
                //     password: data.password,

                // })

                // if (response) router.push('/')

            }



        } catch (error) {
            console.log(error)
        } finally {
            setisLoading(false);
        }
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="/" className='cursor-pointer flex items-center gap-1'>
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Logo"
                    />

                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? 'Link Account'
                            : type === 'sign-in'
                                ? 'Inicia sesión'
                                : 'Regístrate'
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user
                                ? '¡Crea una cuenta para empezar!'
                                : '¡Cuéntanos de ti!'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <Custominput
                                            control={form.control}
                                            name='firstName'
                                            label='Nombre'
                                            placeholder=' Dinos tu nombre'
                                        />
                                        <Custominput
                                            control={form.control}
                                            name='lastName'
                                            label='Apellido'
                                            placeholder=' Dinos tu apellido'
                                        />
                                    </div>

                                    <Custominput
                                        control={form.control}
                                        name='address1'
                                        label='Dirección'
                                        placeholder=' Ej: KR 1 # 2 - 3'
                                    />

                                    <Custominput
                                        control={form.control}
                                        name='city'
                                        label='Ciudad'
                                        placeholder=' ¿Dónde vives?'
                                    />
                                    <div className='flex gap-4'>
                                        <Custominput
                                            control={form.control}
                                            name='state'
                                            label='Departamento'
                                            placeholder=' ej: Cundinamarca'
                                        />
                                        <Custominput
                                            control={form.control}
                                            name='postalCode'
                                            label='Código postal'
                                            placeholder=' Por ejemplo: 111156'
                                        />
                                    </div>
                                    <div className='flex gap-4'>
                                        <Custominput
                                            control={form.control}
                                            name='dateOfBirth'
                                            label='Fecha de nacimiento'
                                            placeholder=' YYYY-MM-DD'
                                        />
                                        <Custominput
                                            control={form.control}
                                            name='ssn'
                                            label='Tu número de seguridad social'
                                            placeholder=' Ejemplo: 1234'
                                        />
                                    </div>
                                </>
                            )}

                            <Custominput
                                control={form.control}
                                name='email'
                                label='Email'
                                placeholder=' Ingresa tu email'
                            />

                            <Custominput
                                control={form.control}
                                name='password'
                                label='Contraseña'
                                placeholder=' Ingresa tu contraseña'
                            />

                            <div className='flex flex-col gap-4'>
                                <Button
                                    type="submit"
                                    className='form-btn'
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2
                                                size={20}
                                                className='animate-spin'
                                            />&nbsp;
                                            Cargando...
                                        </>
                                    ) : type === 'sign-in'
                                        ? 'Iniciar sesión' : 'Registrarse'}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {type === 'sign-in'
                                ? '¿No tienes una cuenta?'
                                : '¿Ya tienes una cuenta?'}
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                            {type === 'sign-in' ? 'Registrarse' : 'Iniciar sesión'}
                        </Link>
                    </footer>
                </>
            )
            }
        </section >
    )
}
export default AuthForm