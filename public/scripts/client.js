/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(()=>{
  //Creates an article element for a given tweet.
  const createTweetElement = (tweetObj) => {

    //Tweet User Info
    const user = tweetObj.user;
    const username = user.name;
    const userAvatar = user.avatars;
    const userHandle = user.handle;

    //Tweet Content
    const content = $("<p>").text(tweetObj.content.text).html();
    const creationDate = timeago.format(tweetObj.created_at);

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
          `);
          
    return $tweet;
  };
        
  //Put together all created tweet article elements
  const renderTweets = (tweets) => {
    $('.tweet-container').empty();
    for (const tweet of tweets) {
      $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }
  };

  //Form Submission Event Handler
  $('#compose-tweet').submit((event) => {
    event.preventDefault();
    const userInput = $('#tweet-text');
    $('.error-message').slideUp(0);
    
    
    //Form Validation
    if (userInput.val() === '' || userInput.val() === null) {
      $('.error-message').text('⚠ Please enter something');
      return $('.error-message').slideDown(1000);
    }
    
    if (userInput.val().length > 140) {
      $('.error-message').text('⚠ Too many characters.');
      return $('.error-message').slideDown(1000);
    }
    const userInputSerialize = userInput.serialize();
    console.log(userInputSerialize);
    $.post('/tweets', userInputSerialize, () =>{
      loadTweets();
      userInput.val('');
    });

    
  });
  
  const loadTweets = () =>{
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };

  $('#form-toggle-button').click((event) => {
    event.preventDefault();
    $('.form-container').slideToggle(913);
    $('#tweet-text').focus();
  });


  loadTweets();
  $('.error-message').hide();
  










});