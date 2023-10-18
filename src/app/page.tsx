'use client'

import styles from './page.module.css'
import { useEffect, useRef } from 'react'

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const rotate = useRef<number>(0)

  useEffect(() => {
    const fn = (ev: KeyboardEvent) => {
      if (!ref.current) {
        return
      }

      if (ev.key.toLowerCase() != 'x') {
        return
      }

      rotate.current += 5
      ref.current.style.transform = `rotate(${rotate.current}deg)`
    }

    window.addEventListener('keypress', fn)
  }, [])

  console.log('render..')

  return (
    <main className={styles.main} ref={ref}>
      <p className={styles.text}>
        Press <kbd>X</kbd> plz
      </p>
    </main>
  )
}
