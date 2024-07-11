import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsParameterStoreService } from '../../environment/aws-parameter-store/aws-parameter-store.service';
import { AwsParameterStoreModule } from '../../environment/aws-parameter-store/aws-parameter-store.module';
import { join } from 'path';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [AwsParameterStoreModule],
            useFactory: async (awsParameterStoreService: AwsParameterStoreService) => {
                const mongoUrl = await awsParameterStoreService.getParameter('mongoUrl', true);
                return {
                    type: 'mongodb',
                    url: mongoUrl,
                    useNewUrlParser: true,
                    autoLoadEntities: true,
                    useUnifiedTopology: true,
                    entities: [join(__dirname, '**/**.entity{.ts,.js}')],
                    writeConcern: { w: 'majority' },
                };
            },
            inject: [AwsParameterStoreService],
        }),
    ],
    providers: [AwsParameterStoreService],
    exports: [AwsParameterStoreService],
})
export class MongoDBConfigurationModule {}
