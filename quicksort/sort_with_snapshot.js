const startIt = () => {
  // select which type of generation do you want
  //const numbers = generator.fixed([1,2,3,4,5,6]);
  const numbers = generator.random(50);

  // the pivot position can make a difference in the number of steps required.
  // default: pivotPositionCalculator = (start, end) => Math.floor((end + start) / 2);
  //pivotPositionCalculator = (start, end) => Math.floor((end + start) / 2);

  // the unordered array
  snapshots.push({
    numbers: [...numbers],
    type: 'Initial',
    highlight: [],
    partition: {},
    pivotPosition: -1
  });

  quickSort(numbers);

  // the sorted array
  snapshots.push({
    numbers: [...numbers],
    type: 'Sorted',
    highlight: [],
    partition: {},
    pivotPosition: -1
  });
};

/**
 * Just a helper to create random numbers up to a defined value.
 *
 * @param max the highest number which will be generated.
 * @returns {number} a freshly created random number between zero and max.
 */
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

/**
 * Where each step is stored
 */
const snapshots = [];

/**
 * To easily switch between random numbers or a fixed array
 */
const generator = {
  random: count => {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(getRandomInt(count) + 1);
    }
    return numbers;
  },
  fixed: arr => arr || [-1,0,1,5,1,1,1]
};

// everything below is the actual sorting algorithm and drawing stuff

/**
 * Draws the array of numbers.
 *
 * @param {object} elements specifies custom options for the "step" drawing which draws stored snapshots.
 * @param {number?} i the current number of the snapshots which will be drawn.
 */
const draw = (elements, i) => {
  const drawArea = document.getElementById('draw_area');
  const h2 = document.createElement('h2');
  h2.innerText = (i ? `${i}. ` : '') + elements.type;
  drawArea.append(h2);

  const canvas = document.createElement('div');
  canvas.classList.add('container');
  drawArea.append(canvas);

  // just some drawing stuff to position the graphs right
  const zeroOffset = Math.min(...elements.numbers);
  const range = Math.max(...elements.numbers) + (zeroOffset > 0 ? 0 : Math.abs(zeroOffset));

  elements.numbers.forEach((element, i) => {
    const div = document.createElement('div');
    div.classList.add('size');
    div.innerHTML = `<span class="label">${element}</span>`;
    if (elements.highlight.indexOf(i) !== -1) {
      div.classList.add('highlight');
    }
    if (elements.partition.start <= i && elements.partition.end >= i) {
      div.classList.add('partition');
    }
    if (elements.pivotPosition === i) {
      div.classList.add('pivot');
    }
    div.style.height = `${(element + (zeroOffset < 0 ? Math.abs(zeroOffset) : 0)) * (100 / range)}%`;
    canvas.append(div);
  });
};

// the quicksort starts below
// plus snapshotting the current operation with the array
// some variables are not really necessary just for sorting. they are set for the visualisation.

/**
 * Changes the position of two elements in the array.
 *
 * @param {number[]} numbers where the change will be performed.
 * @param {number} first the position of the element in the array which will be set to the second one.
 * @param {number} second the position of the element in the array which will be set to the first one.
 */
const swap = (numbers, first, second) => {
  const temp = numbers[first];
  numbers[first] = numbers[second];
  numbers[second] = temp;
};

let pivotPositionCalculator = (start, end) => Math.floor((end + start) / 2);

/**
 * Creates the partition and changes the elements inside.
 *
 * @param {number[]} numbers the array where the operation will be performed on. Is always the same array. Start
 * and end determine the partition to perform on.
 * @param {number} start the first element which defines the current partition.
 * @param {number} end the last element which defines the current partition.
 * @returns {number} the last position of the start offset.
 */
const partition = (numbers, start, end) => {
  // just stored for the snapshots.
  const partition = {start: start, end: end};
  // could be inlined. but required for the snapshots.
  let pivotPosition = pivotPositionCalculator(start, end);

  const pivot = numbers[pivotPosition];
  snapshots.push({numbers: [...numbers], type: 'Partition', highlight: [pivotPosition], partition: partition, pivotPosition: pivotPosition});
  while (start <= end) {
    while(numbers[start] < pivot) {
      start++;
    }
    while(numbers[end] > pivot) {
      end--;
    }
    if (start <= end) {
      snapshots.push({numbers: [...numbers], type: 'Swap', highlight: [start, end], partition: partition, pivotPosition: pivotPosition});
      swap(numbers, start, end);
      if (end === pivotPosition) {
        pivotPosition = start;
      } else if (start === pivotPosition) {
        pivotPosition = end;
      }
      start++;
      end--;
    }
  }
  return start;
};

/**
 * Does the partitioning which triggers the swapping and calls itself recursively.
 *
 * @param {number[]} numbers where to perform the quicksort on.
 * @param {number?} start the first element in the array to be part of the current partition (optional for the initial call).
 * @param {number?} end the last element in the array to be part of the current partition (optional for the initial call).
 */
const quickSort = (numbers, start, end) => {
  if (numbers.length <= 1) {
    return;
  }
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = numbers.length - 1;
  }
  const index = partition(numbers, start, end);
  if (start < index - 1) {
    quickSort(numbers, start, index - 1);
  }
  if (index < end) {
    quickSort(numbers, index, end);
  }
};
