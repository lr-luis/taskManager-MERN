import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signIn, errors: signInErrors = [] } = useAuth()
  const onSubmit = handleSubmit((data) => {
    signIn(data)
  })
  return (
    <div className="flex h-[calc(100vh - 100px)] items-center justify-center ">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          // signInErrors.map((error, i) => {
          <div className="bg-red-500 p-2 text-white text-center">{signInErrors}</div>
          // })
          //
          // signInErrors
        }
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="email"
          />
          {errors.email && <p className="text-red-500">email is required</p>}
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="password"
          />
          {errors.password && <p className="text-red-500">password is required</p>}
          <button type="submit"> Login </button>
        </form>
        <p className='flex gap.x.2 justify-between'>
          Don't have an account? <Link to="/register" className='text-sky-500'>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage