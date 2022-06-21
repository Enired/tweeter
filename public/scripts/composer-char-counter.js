$(()=>{
  //Code goes here
  const $userInput = $('#tweet-text');
  
  $userInput.on('keydown', (event) =>{
    const keyPressVal = event.originalEvent.key
    if(keyPressVal === 'Backspace'){
      console.log('yo');
    }
    else{
      console.log(keyPressVal) 
    }
    })
  
})