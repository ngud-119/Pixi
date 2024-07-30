export const ani = {
  backgroundColor: { backgroundColor: '#4344B0' },
  colorPurple: { color: '#4344B0' },
  colorYellow: { color: '#FFEF92' },
  scaleUp: { scale: 1.04045 },
  scaleUp2: { scale: 1.1618 },
  scaleDown: { scale: 0.978 },
  fill: { fill: '#4344B0' },
  opacityOff: { opacity: 0 },
  opacityOn: { opacity: 1 },
  removeBoxShadow: { boxShadow: 'none' },
  colorDeepPurple: { backgroundColor: '#332e3c' },
  whiteBorder: { border: '1px solid white' },
}

function animationGenerator(variant) {
  return {
    variants: variant,
    initial: 'hidden',
    animate: 'enter',
    exit: 'exit',
    transition: variant.transition || 'linear',
  }
}

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 24,
      stiffness: 320,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

export const dropInAnimation = {
  variants: dropIn,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
}

export const fadeInAnimation = {
  variants: ani,
  initial: 'opacityOff',
  animate: 'opacityOn',
  exit: 'opacityOff',
  transition: { type: 'linear' },
}

export const scaleAndColor = {
  whileHover: { ...ani.colorYellow, ...ani.scaleUp },
}

export const scaleAndColorBG = {
  whileHover: { ...ani.backgroundColor, ...ani.scaleUp },
}

export const hoverAndScale = {
  whileHover: { ...ani.scaleUp },
}

export const hoverAndScale2 = {
  whileHover: { ...ani.scaleUp2 },
}

export const highlightPill = {
  whileHover: { ...ani.scaleUp },
}

const inAndOut = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}
export const inAndOutAnimation = {
  variants: inAndOut,
  initial: 'hidden',
  animate: 'enter',
  exit: 'exit',
  transition: { type: 'linear' },
}

const slideDownUp = {
  hidden: { opacity: 0.33, x: 0, y: -16 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 },
}
export const slideDownUpAnimation = {
  variants: slideDownUp,
  initial: 'hidden',
  animate: 'enter',
  exit: 'exit',
  transition: { type: 'linear' },
}

const slideLeftRight = {
  hidden: { opacity: 1, x: -2, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -2, y: -20 },
}
export const slideLeftRightAnimation = {
  variants: slideLeftRight,
  initial: 'hidden',
  animate: 'enter',
  exit: 'exit',
  transition: { type: 'linear' },
}

const leftToRight = {
  hidden: { opacity: 0, x: -300 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 300 },
}
export const leftToRightAnimation = {
  variants: leftToRight,
  initial: 'hidden',
  animate: 'enter',
  exit: 'exit',
  transition: { type: 'linear' },
}

const sideBar = {
  hidden: { opacity: 0, x: '-100%' },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '-100%' },
  transition: { type: 'spring', bounce: 0, duration: 0.3236 },
}
export const sideBarAnimation = animationGenerator(sideBar)

const sideProfileBar = {
  hidden: { opacity: 0, x: '100%' },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '100%' },
  transition: { type: 'spring', bounce: 0, duration: 0.3236 },
}
export const sideProfileBarAnimation = animationGenerator(sideProfileBar)

const mainNav = {
  hidden: { opacity: 0, y: '-100%' },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-100%' },
  transition: { type: 'spring', bounce: 0, duration: 0.6472 },
}
export const mainNavAnimation = animationGenerator(mainNav)

const dashboard = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { type: 'spring', bounce: 0, duration: 0.3264 },
}

export const dashboardAnimation = animationGenerator(dashboard)

const subnav = {
  hidden: { opacity: 0, x: '-2000px' },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 1, x: '-2000px' },
  transition: { type: 'spring', bounce: 0, duration: 0.6472 },
}

export const subnavAnimation = animationGenerator(subnav)

export const slideParentVariants = {
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

export const slideChildVariants = {
  show: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

export const CHILD_VARIANTS_SCALE = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 0.3236 },
  },
  hidden: { opacity: 0, scale: 0.8899 },
}
