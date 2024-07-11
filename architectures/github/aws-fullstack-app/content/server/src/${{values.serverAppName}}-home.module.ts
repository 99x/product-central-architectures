import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsParameterStoreModule } from './config/environment/aws-parameter-store/aws-parameter-store.module';
import { MongoDBConfigurationModule } from './config/database/mongo/mongo-configuration.module';
import { ActivityModule } from './models/activity';

@Module({
    imports: [ConfigModule.forRoot({}), AwsParameterStoreModule, MongoDBConfigurationModule, ActivityModule],
})
export class AppModule {}
