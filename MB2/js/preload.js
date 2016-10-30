var loading = true
var countdown = 0;
var timerId = 0;
// preload()

timerId = setInterval(function(){

      console.log(loading)
      console.log('1 sec'+ countdown)
      document.getElementById('loader').innerHTML = 'LOADING TIME: ' + countdown+ ' /23ish';
    countdown++
  }, 1000)



// function preload(){
//
// }
