import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {GraphQLModule} from '@nestjs/graphql'
import {MongooseModule} from '@nestjs/mongoose'
import {InitModule} from 'init/init.module'
import {AuthModule} from './auth/auth.module'
import {BlogModule} from './blog/blog.module'
import {CommonModule} from './common/common.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    InitModule.register(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    BlogModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'gqls/blog.gql',
      include: [BlogModule],
      path: 'blog',
      introspection: true,
      playground: {
        title: 'Dot Blog Service',
      },
      context: ({req}) => ({req}),
    }),
    AuthModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
