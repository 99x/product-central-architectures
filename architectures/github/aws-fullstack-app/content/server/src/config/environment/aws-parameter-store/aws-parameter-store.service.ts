import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsParameterStoreService {
    private readonly appName = '${{values.serverAppName}}';
    private readonly region = '${{values.awsRegion}}';
    private readonly ssmClient: AWS.SSM;
    private readonly currentEnv: string;

    constructor() {
        this.ssmClient = new AWS.SSM({
            region: this.region,
        });

        switch (process.env.NODE_ENV) {
            case 'local':
                this.currentEnv = 'local';
                break;
            case 'development':
                this.currentEnv = 'dev';
                break;
            case 'staging':
                this.currentEnv = 'demo';
                break;
            case 'production':
                this.currentEnv = 'prod';
                break;
            default:
                this.currentEnv = 'dev';
                break;
        }
    }

    async getParameter(parameterKey: string, isSecure: boolean) {
        const parameterName = `/${this.appName}/${this.currentEnv}/${parameterKey}`;

        try {
            const result = await this.ssmClient
                .getParameter({
                    Name: parameterName,
                    WithDecryption: isSecure,
                })
                .promise();
            return result.Parameter?.Value;
        } catch (error) {
            console.error(`Error fetching parameter ${parameterName}:`, error);
            throw error;
        }
    }
}
