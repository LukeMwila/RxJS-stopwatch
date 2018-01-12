// interval oberserver
// click streams from 3 buttons

const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')
const resetButton = document.querySelector('#reset')

/**
 * Create three streams from different click events. We pass in the DOM elements using 'fromEvent' and listen for clicks
 */

const start$ = Rx.Observable.fromEvent(startButton, 'click')
const stop$ = Rx.Observable.fromEvent(stopButton, 'click')
const reset$ = Rx.Observable.fromEvent(resetButton, 'click')

/**
 * Interval observer will emit a value after each second. We want to trigger the interval observer based on the click events
 */ 

const interval$ = Rx.Observable.interval(1000)

const stopOrReset$ = Rx.Observable.merge(
    stop$,
    reset$
)

const pausible$ = interval$.takeUntil(stopOrReset$)

const init = 0
const inc = acc => acc + 1
const reset = acc => init

const incOrReset$ = Rx.Observable.merge(
    pausible$.mapTo(inc),
    reset$.mapTo(reset)
)

app$ = start$
       .switchMapTo(incOrReset$)
       .startWith(init)
       .scan((acc, currFunc) => currFunc(acc))
       .subscribe(val => console.log(val))


