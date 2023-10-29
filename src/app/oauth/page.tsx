import { Provider, authorizationCodeToJWT } from '@/auth'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const code = searchParams?.code ?? ''
  if (!code || code instanceof Array) {
    return <div>error :(</div>
  }

  const user = await authorizationCodeToJWT(
    Provider.Google,
    code,
    'http://localhost:3000/oauth'
  )

  return (
    <div>
      <h2>{user.email}</h2>
      {user.picture ? <img src={user.picture} alt="profile" /> : null}
      <pre>{user.token}</pre>
    </div>
  )
}
