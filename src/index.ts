function KiwiEvent() {
  const eventMap = new Map()
  const keyMap = new Map()
  const handlerMap = new Map()

  return {
    on(event, handler) {
      const key = Symbol()

      eventMap.set(event, (eventMap.get(event) || []).concat([key]))
      keyMap.set(key, event)
      handlerMap.set(key, handler)

      return key
    },
    emit(event, ...args) {
      const events = eventMap.get(event) || []
      const len = events.length
      for (let i = 0; i < len; i++) {
        handlerMap.get(events[i])(...args)
      }
    },
    off(event) {
      if (event === '*') {
        eventMap.clear()
        keyMap.clear()
        handlerMap.clear()
        return
      }
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
          const eventKeys = eventMap.get(event)
          eventKeys.splice(eventKeys.findIndex((item) => item === targetEventKey), 1)
          handlerMap.delete(targetEventKey)
        }
      }
    }
  }
}

export default KiwiEvent
