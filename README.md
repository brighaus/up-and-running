# up-and-running
- test code while I'm learning some NodeJS basics
- currently the code starts up a nodejs express server and serves up a crude twitter type service.
  - $>npm install
  - $>grunt --force (the server unit tests deliberately fails for now)
  - $>node src/js/twitter-app.js
  - enter this url into a browser: http://127.0.0.1:8000/ 

- To post a 'tweet': drag the tweetpost.html file directly into a browser (don't route through your running nodejs server), enter your text into the textarea and click submit
- to see 'tweets': http://127.0.0.1:8000/tweets in your browser with your node server running
