import { retrieveProducts, createItem } from "../api/supabase_utils.js";

export async function handleGetTestSupbase() {
	await createItem();
	await retrieveProducts();
}

