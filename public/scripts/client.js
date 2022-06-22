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
    const content = tweetObj.content.text

    //Tweet Creation
    const creationDate = tweetObj.created_at

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
        <p>${timeago.format(creationDate)}</p>
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
    const userInput = $('#compose-tweet').serialize()
    $.post('/tweets', userInput, () =>{
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