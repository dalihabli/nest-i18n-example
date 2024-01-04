import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './mongo/mongo.module';
import { AcceptLanguageResolver, HeaderResolver ,I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    I18nModule.forRoot({
    fallbackLanguage: 'en',
    loaderOptions: {
    path: path.join(__dirname,'/i18n/'),
    watch: true,
    },
    resolvers:[
      { use: QueryResolver, options: ['lang'] },
      AcceptLanguageResolver,
      new HeaderResolver(["x-lang"]),
    ],
  }) ,
  UsersModule, 
  MongoModule
  ],
  providers: [],
})
export class AppModule {}
