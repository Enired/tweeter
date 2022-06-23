/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(()=>{
  //Creates an article element for a given tweet.
  const createTweetElement = (tweetObj) => {

    //Tweet User Info
    const user = tweetObj.user
    const username = user.name;
    const userAvatar = user.avatars
    const userHandle = user.handle;

    //Tweet Content
    const content = $("<p>").text(tweetObj.content.text).html()
    const creationDate = timeago.format(tweetObj.created_at)

    //Article Assembly
    let $tweet = $(`
      <article>
        <header class="article-header">
        <span>
          <img src=${userAvatar} />
          <h4>${username}</h4>
        </span>
        <h4>${userHandle}</h4>
      </header>
      <p class="article-text">${content}</p>
      <footer>
        <p>${creationDate}</p>
        <span>
          <i class="fa-solid fa-thumbs-up"></i>
          <i class="fa-regular fa-heart"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-flag"></i>
        </span>
      </footer>
      </article>
      `)

    return $tweet
  };
  
  //Put together all created tweet article elements
  const renderTweets = (tweets) => {
    for(const tweet of tweets){
      $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }
  }

  //Form Submission Event Handler
  $('#compose-tweet').submit((event) => {
    event.preventDefault();
    const userInput = $('#tweet-text') 

    //Form Validation
    if(userInput.val() === '' || userInput.val() === null){
      return alert('Please enter something');
    }

    if(userInput.val().length > 140){
      return alert('Too many characters.')
    }

    // const test = $("<div>").text(userInput)
    // const test2 =$("<div>").text(userInput.val()) 
    // const test3 = test2.serialize()
    // // console.log(test)
    // // // console.log(test2)
    // console.log(test3)
    const userInputSerialize = userInput.serialize()
    console.log(userInputSerialize)
    $.post('/tweets', userInputSerialize, () =>{
      $('.tweet-container').empty();
      loadTweets();
    })

  })

  const loadTweets = () =>{
    const tweets = $.get("/tweets", (data) => {
      renderTweets(data)
    } )
  }

  loadTweets();











})