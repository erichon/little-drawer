function stop () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    forward()
})
function backward () {
    while (pins.digitalReadPin(DigitalPin.P8) == 1) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
    }
    stop()
}
input.onButtonPressed(Button.AB, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    stop()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "forward") {
        forward()
    }
    if (receivedString == "backward") {
        backward()
    }
    if (receivedString == "stop") {
        stop()
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    backward()
})
function forward () {
    while (pins.analogReadPin(AnalogPin.P2) > 0.5) {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 1)
    }
    stop()
}
radio.setGroup(1)
stop()
