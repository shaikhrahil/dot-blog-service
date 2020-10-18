import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(bodyParser.json({limit: '5mb'}))
  app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))
  app.setGlobalPrefix(`api/${process.env.APP_VERSION}`)
  await app.listen(process.env.PORT || '9000')
  console.log(`Server started at http://localhost:${process.env.PORT || '9000'}`)
}
bootstrap()
