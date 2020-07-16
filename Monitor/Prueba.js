// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const { App } = require('slackbots');

const app = new App({
  signingSecret: "grupo3-monitor-notifications"
});

// Listen to a message containing the substring "hello"
// app.message requires your app to subscribe to the message.channels event
app.message("hello", async ({ payload, context }) => {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await app.client.chat.postMessage({
      // The token you used to initialize your app is stored in the `context` object
      //token: context.botToken,
      // Payload message should be posted in the channel where original message was heard
      channel: "holaaaaaaaaaaaa",
      text: "world"
    });

    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();