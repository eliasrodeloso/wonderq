import app from "./app"
import config from "./config/environment.config"

app.listen(config.port, () => {
  console.log(
    `app listening to https://localhost:${config.port}${config.apiUri}`
  )
})
