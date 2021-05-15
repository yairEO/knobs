export default (elm, pos) => {
  const overflowOffset = 20;

  const pageSize = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight
  }

  const elmSize = {
    w: elm.clientWidth,
    h: elm.clientHeight
  }

  const newPos = {
    left: pos.x + elmSize.w > pageSize.w // overflows right
      ? pageSize.w - elmSize.w - overflowOffset
      : pos.x - elmSize.w/2,

    top: pos.y + elmSize.h > pageSize.h // overflows bottom
      ? pageSize.h - elmSize.h - overflowOffset
      : pos.y
      // pos.y < elmSize.h // overflows top
  }

  elm.style.cssText = `left: ${newPos.left}; top: ${newPos.top}`
}
