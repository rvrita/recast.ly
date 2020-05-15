var searchYouTube = (options, callback) => {
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data: { 
      key: options.key,
      q: options.query,
      maxResults: options.max,
      part: 'snippet',
      type: 'video',
      videoEmbeddable: true
    },
    success: function(data) {
      callback(data.items) },
    error: function(error) {
      console.error('Failed to fetch messages', error);
    }
  });
};

export default searchYouTube;

/*

readAll: function(successCB, errorCB = null) {
  $.ajax({
    url: https://www.googleapis.com/youtube/v3/search,
    type: 'GET',
    data: { order: '-createdAt' },
    contentType: 'application/json',
    success: successCB || function(){},
    error: errorCB || function(error) {
      console.error('chatterbox: Failed to fetch messages', error);
    }
  });
}

GET https://www.googleapis.com/youtube/v3/search

*/
