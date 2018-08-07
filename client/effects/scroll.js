function getNode() {
  return document.getElementsByClassName('wrapper')[0];
}

export function scrollToTop() {
  const node = getNode();
  node.scrollTop = 0;
}

export function animatedScrollTo(targetOffset) {
  const duration = 1000;
  const stepDuration = 17;
  const stepCount = duration / stepDuration;
  const node = getNode();
  let stepIndex = 0;
  let currentOffset = node.scrollTop;
  let previousOffset;
  const interval = setInterval(() => {
    stepIndex += 1;
    previousOffset = currentOffset;
    if (stepIndex > stepCount) {
      currentOffset = targetOffset;
      clearInterval(interval);
    } else {
      currentOffset = previousOffset + (targetOffset - previousOffset) / (stepCount - stepIndex);
    }
    window.requestAnimationFrame(() => {
      node.scrollTop = currentOffset;
    });
  }, stepDuration);
}
