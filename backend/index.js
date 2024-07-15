import express from 'express'
const app = express()
import 'dotenv/config'
import { registerRoute } from './api/utils.js'
import { PostClientTest, PostClientTestUser } from './api/metadata.js'
import { handlePostTest, handlePostTestUser } from './routes/clientRoutes.js'

app.use(express.json())
import cors from 'cors'

const allowedCors = {
	origin: [
		"http://localhost:3000",
	],
	credentials: true,
	optionsSuccessStatus: 200,
}
app.use(cors(allowedCors))
const port = process.env.PORT

registerRoute(app, PostClientTest, async (req, res) => {
	const { uid } = req.body
	console.log(uid)
	const responseBody = await handlePostTest({ uid })
	res.send({ code: 1, body: responseBody })
})

registerRoute(app, PostClientTestUser, async (req, res) => {
	const { subclaim } = req.body
	const responseBody = await handlePostTestUser({ subclaim })
	res.send({ code: 1, body: responseBody })
})

app.listen(port, () => {
	console.log("listening on port", port)
})

