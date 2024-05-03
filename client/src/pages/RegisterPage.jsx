import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signUp, isAuthenticated, errors: registerErrors  } = useAuth()
  const navigate = useNavigate()
  console.log('registerErrors-->', registerErrors)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks')
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signUp(values)  })

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {
        <div className="bg-red-500 p-2 text-white">{registerErrors}</div>
        // registerErrors.map((error, i) => {
        //   error
        // })
        // registerErrors.forEach((error, i) => {
        //   <div className='bg-red-500 p-2 text-white' key={i}>
        //     {error}
        //   </div>
        // })
      }
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register('username', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="username"
        />
        {errors.username && <p className="text-red-500">Username is required</p>}
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
        <button type="submit"> Register</button>
      </form>
      <p className="flex gap.x.2 justify-between">
        Already have an account?
        <Link to="/login" className="text-sky-500">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
