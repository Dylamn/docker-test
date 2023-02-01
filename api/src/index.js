const express = require("express")
const MongoClient = require("mongodb").MongoClient

let dbClient
let count

const MONGO_URL =
  process.env.NODE_ENV === "production"
    ? `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PWD}@db`
    : `mongodb://db`

MongoClient.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error(err)
  } else {
    dbClient = client
    console.log("DB connection: done.")
    count = client.db("test").collection("count")
  }
})

const app = express()

app.get("/api/count", (req, res) => {
  count.findOneAndUpdate({}, { $inc: { count: 1 } }, { returnNewDocument: true }).then((doc) => {
    const count = doc.value
    const visitNum = count.count === 1 ? "first" : count.count
    const plural = count.count > 1 ? "s" : ""

    res.status(200).json(`Hello 世界。It is the ${visitNum} time${plural} that you visit this page.`)
  })
})

app.all("*", (req, res) => {
  res.end()
})

const server = app.listen(80)

process.addListener("SIGINT", () => {
  console.log("Gracelly stopping...")

  server.close((err) => {
    if (err) {
      process.exit(1)
    } else if (dbClient) {
      dbClient.close((err) => process.exit(err ? 1 : 0))
    } else {
      process.exit(0)
    }
  })
})
