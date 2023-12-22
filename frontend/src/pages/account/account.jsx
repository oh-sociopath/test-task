import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user-context.js';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export const Account = () => {
  const { user } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = {
    name: user.name,
  };

  const { register, handleSubmit, reset} = useForm({
    defaultValues: currentUser
  });

  // const url = URL.createObjectURL(new Blob(JSON.parse(x)));
  const data = {email: user.email};

  useEffect(() => {
    axios
      .get('http://localhost:5555/user', {params: data})
      .then((response) => {
        console.log('response.data: ', response.data);

      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  }, [])

  const onSubmit = (data) => {
    setIsDisabled(true);

    axios
      .patch('http://localhost:5555/user', {...data, email: user.email})
      .then(response => {
        console.log('response data: ', response.data);
        enqueueSnackbar('User data updated successfully', { variant: 'success' });
      })
      .catch(error => {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
        console.log(error);
      })
    reset();
  };

  return (
    <div className='p-3'>
      <div className='flex justify-between'>
        <h1 className='text-[32px] font-bold'>Edit your personal data</h1>
        <button className='cursor-pointer mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => setIsDisabled(!isDisabled)}>Edit</button>
      </div>
      <form onSubmit= {handleSubmit(onSubmit)}>
        <label>
          Name:<br/>
          <input disabled={isDisabled} className='w-1/4 border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' {...register("name")} />
        </label>
        <br/>

        <label>
          Password:<br/>
          <input placeholder='Enter your new password' disabled={isDisabled} className=' w-1/4 border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' type="password" {...register("password" )} />
        </label>
        <br/>
        {/*<label>*/}
        {/*  Upload your new image:*/}
        {/*  <img src={url} alt="picture" />*/}
        {/*  <input className='border-solid border-2 border-gray-500 my-2 rounded-3xl pl-3 pt-1 pb-1 pr-3' type="file" disabled={isDisabled} {...register("profilePicture", { required: true })} />*/}
        {/*</label>*/}

        <br/>
        <label>
          <input className='w-1/4 cursor-pointer bg-red-500 text-white font-bold py-2 px-4 rounded-full' disabled={isDisabled} type="submit" />
        </label>

      </form><br/>
      {!isDisabled && <button className='w-1/4 cursor-pointer mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => {
        setIsDisabled(true);
        reset();
      }}>Cancel</button>}
    </div>
  );
}
