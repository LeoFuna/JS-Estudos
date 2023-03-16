import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStrategy.js"

const postgresConnectionString = "postgres://leofuna:secret@localhost:3002/heroes";
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = "mongodb://leofuna:secret@localhost:27017/heroes";
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))

await mongoDBContext.connect()

const data = [ {
  name: 'Maria',
  type: 'activityLog'
}, {
  name: 'Leonardo Funabashi',
  type: 'transaction',
}]

const contextTypes = {
  transcation: postgresContext,
  activityLog: mongoDBContext,
}

for(const { type, name } of data) {
  const context = contextTypes[type]

  await context.create({ name: name + Date.now() })

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}
