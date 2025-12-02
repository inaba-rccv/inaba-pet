import { EventEmitter } from "./event-emitter"

interface EventOptions {
	"LOGIN": { userId: number; username: string }
	"LOGOUT": void
	"AUTH_EXPIRED": void
}

export default new EventEmitter<EventOptions>()