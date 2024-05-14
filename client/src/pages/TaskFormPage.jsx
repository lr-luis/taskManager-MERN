import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useTasks } from '../context/TasksContext'
function TaskFormPage() {
  const { register, handleSubmit } = useForm()
  const { createTask } = useTasks()
  const navigate = useNavigate()

   const onSubmit = handleSubmit((data) => {
    console.log('data-->', data)
    createTask(data)
    navigate('/tasks') 
  })
  return (
    // <div>TaskFormPage</div>
    
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="title" {...register('title')} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" autoFocus />
        <textarea
          rows="3"
          placeholder="Description"
          {...register('description')}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <button>Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage