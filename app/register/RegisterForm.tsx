'use client';

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const RegisterForm = () => {

    const [ isLoading , setIsLoading ] = useState(false)
    const { register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: ''
        }
    })

    const onsubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        console.log(data)
    }

    return ( 
        <>
        <Heading title="Sign up"/>
        <Button 
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
        />
            <hr className="bg-slate-300 w-full h-px"/>
                <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
                <Input
                id="email"
                label="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
                <Input
                id="password"
                label="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button label={isLoading ? "Loading" : 'Sign up'} onClick={handleSubmit(onsubmit)} />
            <p className="text-sm">Already Have an Account? <Link className="underline" href='/login'>Login</Link></p>
        </>
     );
}
 
export default RegisterForm;