export const fetchWithAuth = async (url: string, options?: RequestInit): Promise<Response> => {

	const nextProxyURL = "/api/auth/fetchWithAuthProxy/"

	const proxyBody = {
		url: url,
		scopes: [],
		options: options
	}

	return fetch(nextProxyURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(proxyBody)
	})
};

