import { Path, useForm, UseFormRegister, SubmitHandler } from 'react-hook-form'

interface RadioButtonProps {
  options: string[]
  onCheck: (val: string) => void
  selectedOption: string | undefined
  id: string
}

export function RadioButton({
  onCheck,
  selectedOption,
  options,
  id,
}: RadioButtonProps) {
  const handleToggle = (newValue: any) => {
    onCheck(newValue)
  }
  return (
    <div className="mb-4">
      {options.map((option) => (
        <div
          key={`${id}${option}`}
          className="flex items-center cursor-pointer "
        >
          <input
            id={`${id}${option}`}
            type="radio"
            // name="anyformname"
            value={option}
            className="cursor-pointer w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            checked={selectedOption == option}
            onChange={() => handleToggle(option)}
          />
          <label
            htmlFor={`${id}${option}`}
            className="cursor-pointer block ml-2  font-medium text-gray-900 dark:text-gray-300"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}

interface IFormValues {
  'First Name': string
  Age: number
}
type InputProps = {
  label: Path<IFormValues>
  register: UseFormRegister<IFormValues>
  required: boolean
}

// The following component is an example of your existing Input Component
export const Input = ({ label, register, required }: InputProps) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} />
  </>
)
