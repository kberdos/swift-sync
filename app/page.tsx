import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const session = await getSession();

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
