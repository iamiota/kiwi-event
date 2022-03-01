### A typescript event management library

```typescript
import KiwiEvent from 'kiwi-event'

const $bus = new KiwiEvent()

// Supports multiple listeners for the same event
const event1 = $bus.on('hello', () => {
  console.log('hello world 1')
})

const event2 = $bus.on('hello', () => {
  console.log('hello world 2')
})

$bus.emit('hello') // hello world 1 hello world 2

// Support for closing a single listener
$bus.off(event1) 
$bus.emit('hello') // hello world 2
$bus.off('hello')
$bus.emit('hello') //


// Supports closing multiple events at the same time
$bus.off(['hello'])
$bus.off([event1, event2])
$bus.off(['hello', event1, event2])



```

