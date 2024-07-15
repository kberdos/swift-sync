export function registerRoute(app, md, handler, middlewares = []) {
	app[md.method](md.route, ...middlewares, handler)
}

