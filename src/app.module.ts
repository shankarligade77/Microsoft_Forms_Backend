import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from './forms/forms.module';
import { ItemsModule } from './items/items.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FormEntity } from './forms/entity/forms.entity';
import { ItemEntity } from './items/entity/items.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'forms_clone_updated',
      entities:[ItemEntity,FormEntity],
      synchronize: true,
    }),
    FormsModule,
    ItemsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver :ApolloDriver,
      debug: true,
      playground:true,
      autoSchemaFile: true
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
