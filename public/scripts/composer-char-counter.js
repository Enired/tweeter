$(()=>{
  //Code goes here
  const $userInput = $('#tweet-text');
  let composerCharCounter = $('.counter');
  let charCount = composerCharCounter.val();
  $userInput.on('input', (event) =>{
    const inputType = event.originalEvent.inputType
    if(inputType === 'deleteContentBackward'){
      if(charCount < 140){
        charCount++;
        composerCharCounter.val(charCount)
      }
    }
    else{
      charCount--;
      composerCharCounter.val(charCount)
    }

    console.log(inputType)
    })
  
})