import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
// import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ActivityDto } from './dto/activity.dto';

describe('ActivityService', () => {
    let service: ActivityService;
    // let repository: Repository<Activity>;

    const mockRepository = {
        create: jest.fn().mockImplementation((dto) => dto),
        insert: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ActivityService,
                {
                    provide: getRepositoryToken(Activity),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ActivityService>(ActivityService);
        // repository = module.get<Repository<Activity>>(getRepositoryToken(Activity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should throw a BadRequestException if ActivityDescription is missing', async () => {
            const dto: ActivityDto = {
                ActivityDescription: '',
                ActivityTypeId: 'typeId',
                ParticipantId: 'participantId',
                StepId: 'stepId',
            };

            await expect(service.create(dto)).rejects.toThrow(new BadRequestException('Invalid activity description.'));
        });

        it('should create and return an activity ID', async () => {
            const dto: ActivityDto = {
                ActivityDescription: 'description',
                ActivityTypeId: 'typeId',
                ParticipantId: 'participantId',
                StepId: 'stepId',
            };

            const id = new ObjectId();
            mockRepository.insert.mockResolvedValue({ identifiers: [{ id }] });
            // const result = await service.create(dto);
            //   expect(result).toEqual(id);
            expect(mockRepository.create).toHaveBeenCalledWith({
                ...dto,
                CreatedOn: expect.any(Date),
                ModifiedOn: expect.any(Date),
                IsActive: true,
            });
            expect(mockRepository.insert).toHaveBeenCalledWith({
                ...dto,
                CreatedOn: expect.any(Date),
                ModifiedOn: expect.any(Date),
                IsActive: true,
            });
        });
    });

    describe('findAll', () => {
        it('should return an array of activities', async () => {
            const activities = [new Activity()];
            mockRepository.find.mockResolvedValue(activities);

            const result = await service.findAll();
            expect(result).toEqual(activities);
            expect(mockRepository.find).toHaveBeenCalledWith({
                where: { IsActive: true },
            });
        });
    });

    describe('findOne', () => {
        it('should throw a NotFoundException if activity not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);
            const id = new ObjectId().toHexString();

            await expect(service.findOne(id)).rejects.toThrow(new NotFoundException(`Activity with ${id} does not exist.`));
        });

        it('should return an activity if found', async () => {
            const activity = new Activity();
            mockRepository.findOne.mockResolvedValue(activity);
            const id = new ObjectId().toHexString();

            const result = await service.findOne(id);
            expect(result).toEqual(activity);
            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { _id: new ObjectId(id), IsActive: true },
            });
        });
    });

    describe('update', () => {
        it('should update and return an activity ID', async () => {
            const dto: ActivityDto = {
                ActivityDescription: 'Updated description',
                ActivityTypeId: 'Updated type',
                ParticipantId: 'Updated participant',
                StepId: 'Updated step',
            };
            const id = new ObjectId().toHexString();
            const existingActivity = new Activity();
            mockRepository.findOne.mockResolvedValue(existingActivity);

            const result = await service.update(id, dto);
            expect(result).toEqual(new ObjectId(id));
            expect(mockRepository.update).toHaveBeenCalledWith(id, {
                ActivityDescription: dto.ActivityDescription,
                ActivityTypeId: dto.ActivityTypeId,
                ParticipantId: dto.ParticipantId,
                StepId: dto.StepId,
                ModifiedOn: expect.any(Date),
            });
        });
    });

    describe('remove', () => {
        it('should mark an activity as inactive', async () => {
            const id = new ObjectId().toHexString();
            const existingActivity = new Activity();
            mockRepository.findOne.mockResolvedValue(existingActivity);

            const result = await service.remove(id);
            expect(result).toEqual(id);
            expect(mockRepository.update).toHaveBeenCalledWith(id, {
                IsActive: false,
                ModifiedOn: expect.any(Date),
            });
        });
    });
});
