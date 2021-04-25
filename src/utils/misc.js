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

export const debounce = (callback, delay) => {
  const timerClear = () => clear = true;
  var clear = true;
  return event => {
      if (clear) {
          clear = false;
          setTimeout(timerClear, delay);
          callback(event);
      }
  }
}
