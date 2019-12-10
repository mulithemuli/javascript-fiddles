(function() {
  // configuration is located in this method
  quickSort.start();

  /*
   * full configuration example with random numbers (pivotPosition is optional)
  quickSort.start({
    pivotPosition: (start, end) => end - 1,
    count: 25
  });
   */
  /*
   * full configuration example with fixed numbers (pivotPosition is optional)
  quickSort.start({
    pivotPosition: (start, end) => end - 1,
    numbers: [-2, -1, 5, 5, 5, 6, 7, 8]
  });
   */

  // draw only one snapshot
  quickSort.draw(1);

  // load according snapshot on selection
  const snapshot = document.getElementById('snapshot');
  snapshot.setAttribute('min', '1');
  snapshot.setAttribute('max', `${quickSort.steps()}`);
  snapshot.value = 1;
  snapshot.addEventListener('input', () => {
    document.getElementById('draw_area').innerHTML = '';
    quickSort.draw(snapshot.value);
  });

  const previous = document.getElementById('previous');
  previous.addEventListener('click', () => {
    snapshot.value = snapshot.value > 1 ? snapshot.value - 1 : snapshot.value;
    snapshot.dispatchEvent(new Event('input'));
  });

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    snapshot.value = snapshot.value < quickSort.steps() ? parseInt(snapshot.value, 10) + 1 : snapshot.value;
    snapshot.dispatchEvent(new Event('input'));
  });
}());
