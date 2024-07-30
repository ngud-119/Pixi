import { Path, useForm, UseFormRegister, SubmitHandler } from 'react-hook-form'

export type EmailInput = {
  email: string
}

type TextInputProps = {
  label: string
  id: string
  onSubmit: SubmitHandler<EmailInput>
}

export default function TextInput({ id, label, onSubmit }: TextInputProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailInput>()

  // console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      className="text-left flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <input
          type="text"
          id={id}
          className={`bg-gray-50 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder={`Enter ${label}`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Enter Valid Email format',
            },
          })}
        />
        {errors.email && (
          <span className="text-demph2 text-sm">{errors.email.message}</span>
        )}
      </div>

      <input
        className="text-sm font-extrabold rounded-lg py-2 px-6 bg-bg1 text-primary1 cursor-pointer border-gradient-br-primary1-demph2"
        type="submit"
      />
    </form>
  )
}
