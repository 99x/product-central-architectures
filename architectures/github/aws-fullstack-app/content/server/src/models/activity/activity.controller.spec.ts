import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityDto } from './dto/activity.dto';
import { Activity } from './entities/activity.entity';
import { ObjectId } from 'mongodb';
import { NotFoundException } from '@nestjs/common';

describe('ActivityController', () => {
    let controller: ActivityController;
    let service: ActivityService;

    const mockActivityService = {
        create: jest.fn(() => {
            return new ObjectId();
        }),
        findAll: jest.fn(() => {
            const activity = new Activity();
            return [activity];
        }),
        findOne: jest.fn(() => {
            const activity = new Activity();
            return activity;
        }),
        update: jest.fn(() => {
            return new ObjectId();
        }),
        remove: jest.fn((id: string) => {
            return id;
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ActivityController],
            providers: [
                {
                    provide: ActivityService,
                    useValue: mockActivityService,
                },
            ],
        }).compile();

        controller = module.get<ActivityController>(ActivityController);
        service = module.get<ActivityService>(ActivityService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new activity', async () => {
            const dto: ActivityDto = {
                ActivityDescription: 'Test description',
                ActivityTypeId: 'Test type',
                ParticipantId: 'Test participant',
                StepId: 'Test step',
            };

            const result = await controller.create(dto);
            expect(result).toEqual(expect.any(ObjectId));
            expect(service.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('should return an array of activities', async () => {
            const result = await controller.findAll();
            expect(result).toEqual(expect.any(Array));
            expect(result).toHaveLength(1);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single activity', async () => {
            const id = 'someId';
            const result = await controller.findOne(id);
            expect(result).toEqual(expect.any(Activity));
            expect(service.findOne).toHaveBeenCalledWith(id);
        });

        it('should throw NotFoundException if activity not found', async () => {
            const id = 'nonExistentId';
            jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());

            await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update an activity', async () => {
            const id = 'someId';
            const dto: ActivityDto = {
                ActivityDescription: 'Updated description',
                ActivityTypeId: 'Updated type',
                ParticipantId: 'Updated participant',
                StepId: 'Updated step',
            };

            const result = await controller.update(id, dto);
            expect(result).toEqual(expect.any(ObjectId));
            expect(service.update).toHaveBeenCalledWith(id, dto);
        });
    });

    describe('remove', () => {
        it('should delete an activity', async () => {
            const id = 'someId';
            const result = await controller.remove(id);
            expect(result).toEqual(id);
            expect(service.remove).toHaveBeenCalledWith(id);
        });
    });
});
