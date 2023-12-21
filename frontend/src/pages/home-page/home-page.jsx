import { RegisterForm } from '../../components/regiter-form/register-form.jsx';
import { LoginForm } from '../../components/login-form/login-form.jsx';

export const HomePage = () => {
  return (
    <div className='w-full'>
      <h1 className='text-[32px] font-bold'>Welcome to Home page</h1>
      <div className='flex align-middle justify-around w-full mt-20'>
        <RegisterForm />
        <LoginForm />
      </div>
    </div>
  )
}
