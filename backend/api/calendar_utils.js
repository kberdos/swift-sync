import { getOAuthAccessTokenFromSub } from "./auth0_utils.js";

const GCAL_BASE_URL = "https://www.googleapis.com/calendar/v3"

export async function getAllEvents(sub) {
	const access_token = await getOAuthAccessTokenFromSub(sub)
	const url = GCAL_BASE_URL + "/calendars/primary/events"
	const params = {
		maxResults: 1
	}
	const queryString = new URLSearchParams(params).toString()
	const res = await fetch(`${url}?${queryString}`, {
		method: "GET",
		headers: { "authorization": `Bearer ${access_token}` }
	})
	const resJSON = await res.json()
	console.log(resJSON)
}
