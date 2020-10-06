import devConfig from "./env/dev"
import prodConfig from "./env/prod"

const env = process.env.NODE_ENV || "development"

const baseConfig = {
  env,
  isDev: env === "development",
  isTest: env === "testing",
  apiUri: "/api/v1",
  uuidNamespace: "c2ad9957-094d-4768-8ba5-4d99ed5bc743",
  ...(env === "development" ? devConfig : prodConfig),
}

export default baseConfig
