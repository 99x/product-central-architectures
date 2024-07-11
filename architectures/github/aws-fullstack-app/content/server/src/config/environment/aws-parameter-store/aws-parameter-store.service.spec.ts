import { Test, TestingModule } from '@nestjs/testing';
import { AwsParameterStoreService } from './aws-parameter-store.service';
import * as AWS from 'aws-sdk';

jest.mock('aws-sdk', () => {
    const SSM = {
        getParameter: jest.fn(),
    };
    return { SSM: jest.fn(() => SSM) };
});

describe('AwsParameterStoreService', () => {
    let service: AwsParameterStoreService;
    let ssmMock;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AwsParameterStoreService],
        }).compile();

        service = module.get<AwsParameterStoreService>(AwsParameterStoreService);
        ssmMock = new AWS.SSM();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getParameter', () => {
        it('should fetch parameter from SSM', async () => {
            const parameterName = '/${{values.serverAppName}}/local/mongoUrl';
            const parameterValue = 'test-value';
            ssmMock.getParameter.mockReturnValue({
                promise: jest.fn().mockResolvedValue({
                    Parameter: { Value: parameterValue },
                }),
            });

            const result = await service.getParameter('mongoUrl', true);
            expect(ssmMock.getParameter).toHaveBeenCalledWith({
                Name: parameterName,
                WithDecryption: true,
            });
            expect(result).toBe(parameterValue);
        });

        it('should throw an error if SSM call fails', async () => {
            const parameterName = '/${{values.serverAppName}}/dev/test-key';
            const error = new Error('SSM error');
            ssmMock.getParameter.mockReturnValue({
                promise: jest.fn().mockRejectedValue(error),
            });

            await expect(service.getParameter('test-key', true)).rejects.toThrow(error);
            expect(ssmMock.getParameter).toHaveBeenCalledWith({
                Name: parameterName,
                WithDecryption: true,
            });
        });
    });

    describe('environment setup', () => {
        it('should set currentEnv based on NODE_ENV', () => {
            process.env.NODE_ENV = 'staging';
            const newService = new AwsParameterStoreService();
            expect(newService['currentEnv']).toBe('demo');
        });

        it('should default to dev environment if NODE_ENV is not set', () => {
            process.env.NODE_ENV = 'undefined_env';
            const newService = new AwsParameterStoreService();
            expect(newService['currentEnv']).toBe('dev');
        });
    });
});
