import { useState } from 'react';
import { useForm } from 'react-hook-form';
let renderCount = 0

export default function ReactHookFormAdvanced() {
  const {
    register,
    handleSubmit,
    formState: { touchedFields, isDirty, isValid, dirtyFields, isSubmitted, errors },
    watch
  } = useForm();

  const [data, setData] = useState('');
  const watchIsDeveloper = watch('isDeveloper');
  renderCount += 1
  return (
    <div className='w-full flex justify-center items-center p-8'>
      <div className='w-2/3 shadow-lg rounded-md bg-white p-8 flex flex-col justify-start' style={{ height: '700px' }}>
        <h2 className='text-center font-medium text-2xl mb-4'>
          React Hook Form
        </h2>
        Render Count -- {renderCount}
        <form
          onSubmit={handleSubmit(setData)}
          className='flex flex-1 flex-col justify-evenly'
        >
          <input
            className='border-2 outline-none p-2 rounded-md'
            placeholder='Name'
            {...register('name')}
          />

<input
 className="border-2 outline-none p-2 rounded-md"
 placeholder="Email"
 {...register("email", {
 pattern: {
   value: /^.*.com$/,
   message: 'Email must end with .com'
 }
 })}
 /><span className="text-sm text-red-700">
   {errors?.email?.message}
</span>

<input
  className="border-2 outline-none p-2 rounded-md"
  placeholder="Phone Number"
  {...register("phoneNumber", {
    minLength: {
      value: 10,
      message: 'Phone Number must be 10 digits'
    }
  })}
/>
<span className="text-sm text-red-700">
  {errors?.phoneNumber?.message}
</span>
          <div>
            <span className='mr-4'>
              Are you a developer?
            </span>
            <input type='checkbox' {...register('isDeveloper')} />
          </div>
          {
            watchIsDeveloper ?
              <div className='flex w-full '>
                <input
                  className='flex-1 border-2 outline-none p-2 rounded-md mr-2'
                  placeholder='Experience (Years)'
                  {...register('exp_years', {
					maxLength: {
					  value: 2,
					  message: 'Experience years must be two digits'
					}})}
				   />
                <input
                  className='flex-1 border-2 outline-none p-2 rounded-md'
                  placeholder='Experience (Months)'
                  {...register('exp_months', {
					max: {
					  value: 11,
					  message: 'Experience months must be less than 12'
					}})} />
              </div>
              : null
          }
		  <span className="text-sm text-red-700">
				   {errors?.exp_years?.message}
				 </span><span className="text-right text-sm text-red-700">
				   {errors?.exp_months?.message}
				 </span>

          <button
            className=' flex justify-center p-2 rounded-md
            w-1/2 self-center bg-gray-900  text-white hover:bg-gray-800'
            type='submit'
          >
            <span>
              Submit
            </span>
          </button>
        </form>

        <p className='w-4/5'> <strong> Data: </strong> {JSON.stringify(data)} </p>
        <p> <strong> Is Valid: </strong> {JSON.stringify(isValid)}</p>
        <p> <strong> Is Dirty : </strong> {JSON.stringify(isDirty)} </p>
        <p> <strong> Is Submited: </strong> {JSON.stringify(isSubmitted)}</p>
        <p> <strong> Errors: </strong> {JSON.stringify(errors?.email?.message)}</p>
        <p> <strong> Dirty Fields : </strong> {JSON.stringify(dirtyFields)} </p>
        <p> <strong> Touched Fields: </strong> {JSON.stringify(touchedFields)} </p>
        <p> <strong> Watching Is Developer: </strong> {JSON.stringify(watchIsDeveloper)}</p>

      </div>
    </div>
  );
}