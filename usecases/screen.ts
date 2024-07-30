import { useEffect, useState, useRef, MutableRefObject } from 'react'

function getScreenSize(): string {
  if (typeof window === 'undefined') {
    throw new Error('window is undefined')
  }
  const { innerWidth } = window
  if (innerWidth <= 400) {
    return 'super-small'
  } else if (innerWidth <= 800 && innerWidth >= 400) {
    return 'small'
  } else if (innerWidth > 800 && innerWidth <= 1000) {
    return 'medium'
  } else if (innerWidth > 1000) {
    return 'large'
  } else {
    console.error('could not get screenSize for ', innerWidth)
    return 'unknown'
  }
}

export function useScreenSize(): string | undefined {
  const [screenSize, setScreenSize] = useState<string>()

  useEffect(() => {
    setScreenSize(getScreenSize())
    const resize = () => setScreenSize(getScreenSize())
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return screenSize
}

export function useScreenHeight(): number | undefined {
  const [screenHeight, setScreenHeight] = useState<number>()

  useEffect(() => {
    setScreenHeight(window.innerHeight)
    const resize = () => setScreenHeight(window.innerHeight)
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return screenHeight
}

export function outsideTrigger(
  onClickOutside: () => void
): MutableRefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClickOutside()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return ref
}
