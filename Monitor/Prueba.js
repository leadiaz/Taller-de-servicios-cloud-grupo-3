// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const slack = require('slackbots');

console.log(slack.defaultMaxListeners)



// Listen to a message containing the substring "hello"
// app.message requires your app to subscribe to the message.channels event
slack.message("hello", async ({ payload, context }) => {
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


curl -X POST -H 'Content-type:application/json'  --data '{"channel":"grupo3-monitor-notifications","text":"hola"}'  https://hooks.slack.com/services/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