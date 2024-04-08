import bus from "../utils/bus"

export default function useFlashMessage() {
    function setFlashMessage(msg, type, timeInSeconds = 5) {
        bus.emit('flash', {
            message: msg,
            type: type,
            time: timeInSeconds
        })
    }

    return { setFlashMessage }
}