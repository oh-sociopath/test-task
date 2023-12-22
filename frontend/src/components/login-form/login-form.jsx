import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/user-context.js';
import { login } from '../utils.js';

export const LoginForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const {name, password, email} = await login(data);
      setUser({name, password, email});
      navigate('/account');
      enqueueSnackbar('User logged in successfully', { variant: 'success' });
      reset();

    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    }
  };

  return (
    <div className='container flex justify-center align-middle flex-col w-1/3 pl-10 pt-10 pr-10 pb-10 border-solid border-2 border-gray-500 rounded-3xl' >
      <h1 className='text-[24px] font-bold'>Login</h1>
      <form className='flex justify-center align-middle flex-col' onSubmit={handleSubmit(onSubmit)}>
        <input className='border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' {...register("email", { required: true })} type="email" placeholder="Email" />
        {errors.email && <span className='text-red-600'>This is required field</span>}

        <input className='border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' {...register("password", { required: true })} type="password" placeholder="Пароль" />
        {errors.password && <span className='text-red-600'>This is required field</span>}

        <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' type="submit" />
      </form>
    </div>
  );
}
