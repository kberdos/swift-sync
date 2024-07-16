import { getAllEvents } from "../api/calendar_utils.js"
import { retrieveProducts, createItem } from "../api/supabase_utils.js"

export async function handlePostTest(body) {
	const { uid } = body
	return { uid: uid + "test" }
}

export async function handlePostTestUser(body) {
	const { subclaim } = body
	await getAllEvents(subclaim)
}

export async function handleGetTestSupbase() {
	await retrieveProducts()
}
