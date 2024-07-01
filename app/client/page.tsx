'use client'
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, isLoading } = useUser()

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
        <a href="/api/auth/logout">Log Out</a>
        <div>{user.name}</div>
        <img src={user.picture!} alt={user.name!} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
