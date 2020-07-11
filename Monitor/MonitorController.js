//const request = require('request');
const URLSlack = "https://hooks.slack.com/services/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"

// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const app = new App();






function stateSerivices() {
// Listen to a message containing the substring "hello"
// app.message requires your app to subscribe to the message.channels event
app.message("hello", async ({ payload, context }) => {
    try {
      // Call the chat.postMessage method using the built-in WebClient
      const result = await app.client.chat.postMessage({
   // Payload message should be posted in the channel where original message was heard
        channel: URLSlack,
        text: "world"
      });
  
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  });
  
  
}


function avisoChat () {
    

}


module.exports = {
    stateSerivices,
    avisoChat,
}