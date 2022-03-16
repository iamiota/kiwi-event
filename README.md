# Kiwi Event

A typescript event bus library.



## Installation

Install through npm:

```
npm install --save kiwi-event
```

Install through yarn:

```
yarn add kiwi-event
```



## Usage

```typescript
import KiwiEvent from 'kiwi-event'

const $bus = KiwiEvent()

// Register multiple listeners for an event
const listener1 = $bus.on('hello world', () => {
  console.log('hello world 1')
})
const listener2 = $bus.on('hello world', () => {
  console.log('hello world 2')
})

$bus.emit('hello world')
// hello world 1
// hello world 2

// remove a listener
$bus.off(listener1) 
$bus.emit('hello world')
// hello world 2

// remove all listener for an event
$bus.off('hello world')

// remove one or multiple events and listeners
$bus.off(listener1)
$bus.off('hello world')
$bus.off([listener1, listener2])
$bus.off(['hello world', listener1, listener2])

// clear all events and listeners
$bus.clear()

```



## methods

### on(event, handler)

- 'event': an event name.
- 'handler': a callback function.

Register for an event, the return value is a unique key, you could use the ```off``` method to cancel the listener

***

### emit(event, ...args)

- 'event': an event name.
- '...args': parameters passed to handler.

Emit an event

***

### off(event)

* 'event': an event name or the return value of the ```on``` method, or an array of them

Remove event listeners



## Contribution
Your contributions and suggestions are heartily welcome.



## License

MIT
