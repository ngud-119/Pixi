import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Icon({
  label = '',
  icon,
  onClick,
  className = '',
  size = '1x',
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex flex-col ${className}`}
      {...props}
    >
      <FontAwesomeIcon icon={icon} size={size} />
      {label ? <p className="text-xs">{label}</p> : null}
    </div>
  )
}
