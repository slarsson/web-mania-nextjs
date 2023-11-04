import { Provider, authenticationRedirectUrl } from '@/auth/auth'

export default function Page() {
  return (
    <div>
      <a
        href={authenticationRedirectUrl(
          Provider.Google,
          'http://localhost:3000/oauth'
        )}
      >
        Sign in with Google
      </a>
    </div>
  )
}
