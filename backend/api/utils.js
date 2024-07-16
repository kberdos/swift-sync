import { auth, requiredScopes } from "express-oauth2-jwt-bearer"

const checkJwt = auth({
	audience: process.env.AUTH0_AUTHORIZATION_API_IDENTIFIER,
	issuerBaseURL: process.env.AUTH0_BASE_URL,
	requiredScopes: [] // TODO: add required scopes
});

export function registerRoute(app, md, handler, middlewares = [checkJwt]) {
	app[md.method](md.route, ...middlewares, handler)
}

