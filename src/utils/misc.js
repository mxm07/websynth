export const roundToPlaces = (value, places) => (
  Math.round((value + Number.EPSILON) * Math.pow(10, places)) / Math.pow(10, places)
)

export const simulateEvent = (el, eventType) => {
  let event

  if (window.MouseEvent && typeof window.MouseEvent === 'function') {
    event = new MouseEvent(eventType)
  } else {
    event = document.createEvent('MouseEvent');
    event.initMouseEvent(eventType)
  }

  el.dispatchEvent(event)
}
