import 'dotenv/config'

const prefixes = [
	"auth0|",
	"google-oauth2",
]

function startsWithAny(str, prefixes) {
	prefixes.map((prefix) => {
		if (str.startsWith(prefix)) {
			return prefix
		}
	})
	return false
}

export function getIdFromSubClaim(subclaim) {
	if (subclaim === null || subclaim === undefined) {
		return null
	}
	const prefix = startsWithAny(subclaim, prefixes)
	return prefix ? subclaim.substring(prefix.length) : subclaim
}

export function getSubClaimFromId(id, prefix) {
	if (id === null || id === undefined) {
		return null
	}
	return id.startsWith(prefix) ? id : prefix + id
}

export async function getUserManagementAccessToken() {
	const url = process.env.AUTH0_BASE_URL + "/oauth/token"
	const audience = process.env.AUTH0_BASE_URL + "/api/v2/"
	const reqBody = {
		grant_type: 'client_credentials',
		client_id: process.env.AUTH0_USR_MANAGEMENT_CLIENT_ID,
		client_secret: process.env.AUTH0_USR_MANAGEMENT_CLIENT_SECRET,
		audience: audience,
		scope: "create:users read:users update:users delete:users read:user_idp_tokens" // CRUD permissions on users + read idp tokens 
	}

	const res = await fetch(url,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reqBody),
		}
	)

	const resJSON = await res.json()
	return resJSON.access_token
}

export async function getAuth0UserBySub(sub) {
	const userManagementToken = await getUserManagementAccessToken()
	const url = `${process.env.AUTH0_BASE_URL}/api/v2/users/${sub}`
	const res = await fetch(url, {
		method: "GET",
		headers: {
			'authorization': `Bearer ${userManagementToken}`,
		}
	})
	return res
}

export async function getOAuthAccessTokenFromSub(sub) {
	const userRes = await getAuth0UserBySub(sub)
	const userResJSON = await userRes.json()
	console.log(userResJSON.identities[0])
	return userResJSON.identities[0].access_token
}
