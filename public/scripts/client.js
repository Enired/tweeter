/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(()=>{
  // TEST CODE. DELETE AFTER
  const tweetData = [{
    "user": {
      "name": "Octavio Silva",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle" : "@octane"
    },
    "content": {
      "text" : "All aboard the octrain!"
    },
    "created_at" : 1461116232227
  },
  {
    "user": {
      "name": "Mary Sommers",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle" : "@horizon"
    },
    "content": {
      "text" : "Where's Newton?"
    },
    "created_at" : 1461116232227
  }

  ]

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
  
  const renderTweets = (tweets) => {
    for(const tweet of tweets){
      $tweet = createTweetElement(tweet);
      $('.container').append($tweet);
    }
  }

  renderTweets(tweetData)

  //Form Submission Event Handler
  $('#compose-tweet').submit((event) => {
    const userInput = $('#compose-tweet').serialize()
    $.post('/tweets', userInput)
    
    console.log(userInput);
    event.preventDefault();
  })











})