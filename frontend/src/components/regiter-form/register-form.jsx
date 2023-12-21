import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { createRequestConfig, registerUser } from '../utils.js';

export const RegisterForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    const requestConfig = createRequestConfig(data);

    try {
      await registerUser(requestConfig);
      enqueueSnackbar('User registered successfully', { variant: 'success' });
      reset();
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <div className='container flex justify-center align-middle flex-col w-1/2 pl-10 pt-10 pr-10 pb-10 border-solid border-2 border-gray-500 rounded-3xl'>
      <h1 className='text-[24px] font-bold'>Registration</h1>
      <form className='flex justify-center align-middle flex-col' onSubmit={handleSubmit(onSubmit)}>
        <input className='border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' {...register("name", { required: true })} placeholder="Name" />
        {errors.name && <span className='text-red-600'>This field is required</span>}

        <input className='border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' {...register("email", { required: true })} type="email" placeholder="Email" />
        {errors.email && <span className='text-red-600'>This field is required</span>}

        <input className='border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' {...register("password", { required: true })} type="password" placeholder="Password" />
        {errors.password && <span className='text-red-600'>This field is required</span>}

        <input className='border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' {...register("birthdate", { required: true })} type="date" placeholder="Birth date" />
        {errors.birthdate && <span className='text-red-600'>This field is required</span>}

        <select className='border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' {...register("gender", { required: true })}>
          <option value="">Select gender</option>
          <option value="F">Female</option>
          <option value="M">Male</option>
        </select>
        {errors.gender && <span className='text-red-600'>This field is required</span>}

        {/*// TODO: file upload part is not finished, after implementing uncomment following input to see it */}
        {/*<input className='border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' type="file" {...register("file", { required: true })} />*/}
        {/*{errors.profilePicture && <span className='text-red-600'>This field is required</span>}<br/>*/}
        {/**/}
        <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' type="submit" />
      </form>
    </div>
  );
}
