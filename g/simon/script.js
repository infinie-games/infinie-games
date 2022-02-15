var colors = ["red", "green", "yellow", "blue"]
var color_goodones = { "red": "#FF0040", "green": "#5AC54F", "yellow": "#FFEB57", "blue": "#0098DC" }

var order = []

var user_order = []

var sounds = {
  'red': new Audio('pad1.mp3'),
  'green': new Audio('pad2.mp3'),
  'yellow': new Audio('pad3.mp3'),
  'blue': new Audio('pad4.mp3')
}

// Warn if overriding existing method
if (Array.prototype.equals)
  console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
    return false;

  // compare lengths - can save a lot of time 
  if (this.length != array.length)
    return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i]))
        return false;
    }
    else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

function pick_order() {
  order.push(colors[Math.floor(Math.random() * colors.length)]);

  order.forEach(function (i, ind) {
    setTimeout(function () {
      sounds[i].play()
      document.querySelector('.thing.' + i).style.filter = "brightness(0.5)"
      setTimeout(function () {
        document.querySelector('.thing.' + i).style.filter = ""
      }, 500)
    }, ind * 1000)
  })

  setTimeout(function () {
    document.querySelector('.yourturn').innerHTML = "Click the order of colors"
  }, ((order.length) * 1000) - 400)
}

document.querySelector('.start').addEventListener('click', function () {
  pick_order()
  this.remove()
})

buttons = document.querySelectorAll('.thing')
buttons.forEach(function (i) {
  i.addEventListener('click', function () {
    sounds[this.classList[1]].pause();
    sounds[this.classList[1]].currentTime = 0;
    sounds[this.classList[1]].play()
    user_order.push(this.classList[1])


    if (user_order.length == order.length && user_order.equals(order)) {

      document.querySelector('.score-text').innerHTML = order.length

      user_order = []
      setTimeout(pick_order, 1000)
    }
    // console.log(user_order[user_order.length - 1])
    // if (user_order[user_order.length - 1] != order[user_order.length - 1]){
    // 	alert('u ded')
    // }

  })
})