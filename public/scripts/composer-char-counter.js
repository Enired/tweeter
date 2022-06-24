$(()=>{
  //Code goes here
  const $userInput = $('#tweet-text');
  let composerCharCounter = $('.counter');
  $userInput.on('input', () =>{
    // const inputType = event.originalEvent.inputType
    // if(inputType === 'deleteContentBackward'){
    //   if(charCount < 140){
    //     charCount++;
    //     composerCharCounter.val(charCount)
    //   }
    // }
    // else{
    //   charCount--;
    //   composerCharCounter.val(charCount)
    // }

    const charMax = 140;
    let charRemaining = charMax - $userInput.val().length;
    composerCharCounter.val(charRemaining);
    
    if (charRemaining < 0) {
      composerCharCounter.addClass('counter-over-limit');
    }

    if (charRemaining >= 0) {
      composerCharCounter.removeClass('counter-over-limit');
    }
    

    console.log(charRemaining);
  });
  
});