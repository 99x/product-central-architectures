import { Module } from '@nestjs/common';
import { AwsParameterStoreService } from './aws-parameter-store.service';

@Module({
    providers: [AwsParameterStoreService],
    exports: [AwsParameterStoreService],
})
export class AwsParameterStoreModule {}
