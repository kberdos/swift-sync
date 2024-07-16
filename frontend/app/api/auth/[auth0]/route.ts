import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth(
	{
		login: handleLogin({
			// Handle auth with custom API for JWT authorization:
			authorizationParams: {
				audience: process.env.NEXT_PUBLIC_AUTH0_AUTHORIZATION_API_IDENTIFIER,
				scope: process.env.NEXT_PUBLIC_AUTHO_SCOPE,
			}
		})
	}
)
