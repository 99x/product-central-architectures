import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/${{values.serverAppName}}-home.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let activityId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/activity (POST)', () => {
        return request(app.getHttpServer())
            .post('/activity')
            .send({
                ActivityDescription: 'Test activity',
                ActivityTypeId: '64896c0ebb2f3b50a0110728',
                ParticipantId: '64896c0ebb2f3b50a0110728',
                StepId: '64896c0ebb2f3b50a0110728',
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .then((response) => {
                activityId = response.body;
            });
    });

    it('/activity (GET)', () => {
        return request(app.getHttpServer()).get('/activity').expect(200).expect('Content-Type', /json/);
    });

    it('/activity/:id (GET)', () => {
        return request(app.getHttpServer()).get(`/activity/${activityId}`).expect(200).expect('Content-Type', /json/);
    });

    it('/activity/:id (PATCH)', () => {
        return request(app.getHttpServer())
            .patch(`/activity/${activityId}`)
            .send({
                ActivityDescription: 'Updated test activity',
                ActivityTypeId: '64896c0ebb2f3b50a0110728',
                ParticipantId: '64896c0ebb2f3b50a0110728',
                StepId: '64896c0ebb2f3b50a0110728',
            })
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('/activity/:id (DELETE)', () => {
        return request(app.getHttpServer()).delete(`/activity/${activityId}`).expect(200);
    });
});
