import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.listen(process.env.PORT || '80')
  console.log(`Server started at http://localhost:${process.env.PORT}/`)
}
bootstrap()
