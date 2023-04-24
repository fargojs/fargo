import {
  createApp
} from "sauropod";

const app = createApp({
  matchers: {
    hello: (path) => true
  }
});

app.use("/hey", (ctx) => {
  ctx.json({
    message: "Hey World!"
  });
});

type ReturnData = {
  message: string
};

app.get("/hello", (ctx) => {
  ctx.json({
    message: "Hello World!"
  });
});


app.get("");

// app.get(/.*man$/, (ctx) => {

// })

// app.get("/🦕", (ctx) => {
//   ctx.json({
//     message: "🦕"
//   })
// })

app.listen(8080);
