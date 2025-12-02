type EventHandler<T = any> = (payload: T) => void

export class EventEmitter<Events extends Record<string, any>> {
  private events: { [K in keyof Events]?: EventHandler<Events[K]>[] } = {}

  // 订阅事件
  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event]!.push(handler)
  }

  // 只执行一次的订阅
  once<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
    const wrapper: EventHandler<Events[K]> = (payload) => {
      handler(payload)
      this.off(event, wrapper) // 执行一次后自动移除
    }
    this.on(event, wrapper)
  }

  // 取消订阅
  off<K extends keyof Events>(event: K, handler?: EventHandler<Events[K]>) {
    if (!this.events[event]) return
    if (!handler) {
      this.events[event] = []
    } else {
      this.events[event] = this.events[event]!.filter(h => h !== handler)
    }
  }

  // 触发事件
  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    if (!this.events[event]) return
    this.events[event]!.forEach(handler => handler(payload))
  }
	
	allOff() {
		this.events = {}
	}
}