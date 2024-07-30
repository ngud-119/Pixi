import { motion, AnimatePresence } from 'framer-motion'
import {
  useRef,
  useEffect,
  ReactNode,
  MouseEvent as ReactMouseEvent,
} from 'react'
import { fadeInAnimation } from './animations'

interface PopoverAnimatedProps {
  position: string
  isOpen: boolean
  handleClose: () => void
  children: ReactNode
}

const Popover = ({
  position,
  isOpen,
  handleClose,
  children,
}: PopoverAnimatedProps) => {
  return (
    <AnimatePresence>
      <Backdrop
        isOpen={isOpen}
        position={position}
        onClick={handleClose}
        key="popoveranimated"
      >
        <motion.div
          className={`absolute ${position}`}
          onClick={(e: ReactMouseEvent) => e.stopPropagation()}
          {...fadeInAnimation}
        >
          {children}
        </motion.div>
      </Backdrop>
    </AnimatePresence>
  )
}

interface BackdropProps {
  isOpen: boolean
  position: string
  children: ReactNode
  onClick: () => void
}

const Backdrop = ({ isOpen, position, children, onClick }: BackdropProps) => {
  let ref = useRef<HTMLSpanElement>(null)

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClick()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  if (!isOpen) return null

  return (
    <motion.span
      ref={ref}
      onClick={onClick}
      className={`z-20 rounded-xl py-3 text-div-grey ${position}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.span>
  )
}

export default Popover
