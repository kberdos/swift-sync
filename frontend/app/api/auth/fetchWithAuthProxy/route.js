import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withApiAuthRequired(async function(req) {
	const { url, scopes, options } = await req.json();

	// If your access token is expired and you have a refresh token
	// `getAccessToken` will fetch you a new one using the `refresh_token` grant
	const { accessToken } = await getAccessToken(req, new NextResponse(), {
		scopes: scopes
		// example scopes: ['read:products']
	});

	if (!accessToken) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const response = await fetch(url, {
			...options,
			headers: {
				...options?.headers,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Fetch failed with status ${response.status}`);
		}

		const data = await response.json();
		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		return NextResponse.json({ error: `${error}` }, { status: 500 });
	}
});
