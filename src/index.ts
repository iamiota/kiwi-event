export type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<
  infer K,
  unknown
>
  ? K
  : never

export type Event = string | symbol

export type Handler = Function

export type Key = symbol

export type EventMap = Map<Event, Key[]>

export type KeyMap = Map<Key, Event>

export type HandlerMap = Map<Key, Handler>

function KiwiEvent() {
  const eventMap: EventMap = new Map()
  const keyMap: KeyMap = new Map()
  const handlerMap: HandlerMap = new Map()

  return {
    on<T extends Event>(event: T, handler: Handler): Key {
      const key = Symbol()

      eventMap.set(event, (eventMap.get(event) || []).concat([key]))
      keyMap.set(key, event)
      handlerMap.set(key, handler)

      return key
    },

    emit<T extends KeyOfMap<EventMap>>(event: T, ...args): void {
      const events = eventMap.get(event) || []
      const len = events.length
      for (let i = 0; i < len; i++) {
        const handler = handlerMap.get(events[i])
        if (typeof handler === 'function') handler(...args)
      }
    },

    off<
      T extends
        | KeyOfMap<EventMap>
        | KeyOfMap<KeyMap>
        | Array<KeyOfMap<EventMap> | KeyOfMap<KeyMap>>
    >(event: T): void {
      const events = Array.isArray(event) ? event : [event]
      const len = events.length
      for (let i = 0; i < len; i++) {
        const targetEventKey = events[i]
        if (eventMap.has(targetEventKey)) {
          const eventKeys = eventMap.get(targetEventKey)
          const eventKeysLen = eventKeys.length
          for (let i = 0; i < eventKeysLen; i++) {
            handlerMap.delete(eventKeys[i])
            keyMap.delete(eventKeys[i])
          }
          eventMap.delete(targetEventKey)
        } else {
          const event = keyMap.get(targetEventKey)
          if (!event) return
          const eventKeys = eventMap.get(event)
          eventKeys.splice(
            eventKeys.findIndex((item) => item === targetEventKey),
            1
          )
          handlerMap.delete(targetEventKey)
        }
      }
    },

    clear(): void {
      eventMap.clear()
      keyMap.clear()
      handlerMap.clear()
    },
  }
}

export default KiwiEvent
