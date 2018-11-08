
function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

function getLocations(num, width, height) {
  var spaces = []
  for(var i=0 ; i< width ; i++) {
    for(var j=0 ; j < height; j++) {
      spaces.push([i, j])
    }
  }
  return getRandomSubarray(spaces, num)
}

export default {
    getLocations
}
