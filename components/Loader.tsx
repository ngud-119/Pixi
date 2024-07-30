export default function Loader({
  text = 'confucious says... good things come to those who wait',
}) {
  return (
    <div className="flex flex-col text-center items-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="text-sm text-neutral">{text}</span>
    </div>
  )
}
