// configuration is located in this method
startIt();

// draw only one snapshot
draw(snapshots[0], 1);

// load according snapshot on selection
const snapshot = document.getElementById('snapshot');
snapshot.setAttribute('min', '1');
snapshot.setAttribute('max', `${snapshots.length}`);
snapshot.value = 1;
snapshot.addEventListener('input', () => {
  document.getElementById('draw_area').innerHTML = '';
  draw(snapshots[snapshot.value - 1], snapshot.value);
});

const previous = document.getElementById('previous');
previous.addEventListener('click', () => {
  snapshot.value = snapshot.value > 1 ? snapshot.value - 1 : snapshot.value;
  snapshot.dispatchEvent(new Event('input'));
});

const next = document.getElementById('next');
next.addEventListener('click', () => {
  snapshot.value = snapshot.value < snapshots.length ? parseInt(snapshot.value, 10) + 1 : snapshot.value;
  snapshot.dispatchEvent(new Event('input'));
});

