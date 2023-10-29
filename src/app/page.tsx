import styles from './page.module.css'
import { Provider, authorizationRedirectUrl } from '@/auth'

export default function Home() {
  return (
    <main className={styles.main}>
      <a
        href={authorizationRedirectUrl(
          Provider.Google,
          'http://localhost:3000/oauth'
        )}
      >
        Sign in with Google
      </a>
    </main>
  )
}
