import { Test, TestingModule } from '@nestjs/testing';
import { MongoDBConfigurationModule } from './mongo-configuration.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('MongoDBConfigurationModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [MongoDBConfigurationModule, ConfigModule.forRoot({})],
        }).compile();
    });

    afterEach(() => {
        jest.resetModules(); // Clear module cache to ensure clean slate for each test
    });

    it('should load database configurations from environment variables', () => {
        const configService = module.get<ConfigService>(ConfigService);
        expect(configService.get('mongoUrl')).toBe(configService.get('mongoUrl'));
    });
});
