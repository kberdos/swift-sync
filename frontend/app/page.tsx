'use client'
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, isLoading } = useUser()


  async function handleTestSupabase() {
    if (!user) {
      return
    }

    const res = await fetch(process.env.NEXT_PUBLIC_backendDomain + "/client/testSupabase",
      {
        method: "GET",
      })

  }

  async function handleTestUser() {
    if (!user) {
      return
    }

    const res = await fetch(process.env.NEXT_PUBLIC_backendDomain + "/client/user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subclaim: user.sub
        })
      })

  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (!user) {
    return (
      <div>
        <a href="/api/auth/login">Log In</a>
      </div>
    )
  }

  return (
    user && (
      <div>

        <div>
          <button onClick={handleTestUser}> Test User</button>
        </div>

        <div>
          <button onClick={handleTestSupabase}> Test Supabase </button>
        </div>

        <a href="/api/auth/logout">Log Out</a>
        <div>{user.name}</div>
        <img src={user.picture!} alt={user.name!} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
