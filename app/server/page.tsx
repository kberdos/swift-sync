import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const session = await getSession();

  const testFetch = async () => {
    "use server"
    const url = process.env.NEXT_PUBLIC_backendDomain + "/client/test"
    const body = {
      uid: "hello"
    }
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    const resJSON = await res.json()
    console.log("res", resJSON)
  }

  if (!session) {
    return (
      <div>
        <div>
          <a href="/api/auth/login">Log In</a>
        </div>
      </div>
    )
  }

  const { user } = session
  return (
    user && (
      <div>
        <form action={testFetch}>
          <button type='submit'>test</button>
        </form>
        <div>
          <a href="/api/auth/login">Log In</a>
        </div>
        <div>
          <a href="/api/auth/logout">Log Out</a>
        </div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
