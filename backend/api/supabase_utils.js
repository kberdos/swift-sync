import { supabase } from "../supabaseInit.js";

export async function retrieveProducts() {
	const { data, error } = await supabase
		.from('products')
		.select()
	if (error) {
		console.log("error", error)
		return error
	}
	console.log("data", data)
	return data
}


export async function createItem() {
	const { error } = await supabase
		.from('products')
		.insert({ name: 'Apples', price: 10.01, })
	console.log("error", error)
}
