import { getAuth0UserBySub, getIdFromSubClaim } from "../api/auth0_utils.js"
import { getAllEvents } from "../api/calendar_utils.js"

export async function handlePostTest(body) {
	const { uid } = body
	return { uid: uid + "test" }
}

export async function handlePostTestUser(body) {
	const { subclaim } = body
	await getAllEvents(subclaim)
}
