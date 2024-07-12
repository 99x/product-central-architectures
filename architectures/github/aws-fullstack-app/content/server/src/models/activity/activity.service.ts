import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity)
        private _activityRepository: Repository<Activity>,
    ) {}

    async create(createActivityDto: ActivityDto) {
        if (!createActivityDto.ActivityDescription) {
            throw new BadRequestException('Invalid activity description.');
        } else if (!createActivityDto.ActivityTypeId) {
            throw new BadRequestException('Invalid activity type id.');
        } else if (!createActivityDto.ParticipantId) {
            throw new BadRequestException('Invalid participant id.');
        } else if (!createActivityDto.StepId) {
            throw new BadRequestException('Invalid step id.');
        }
        const activity = this._activityRepository.create({
            ActivityDescription: createActivityDto.ActivityDescription,
            ActivityTypeId: createActivityDto.ActivityTypeId,
            ParticipantId: createActivityDto.ParticipantId,
            StepId: createActivityDto.StepId,
            CreatedOn: new Date(),
            ModifiedOn: new Date(),
            IsActive: true,
        });
        await this._activityRepository.insert(activity);
        return activity._id;
    }

    async findAll(): Promise<Activity[]> {
        return await this._activityRepository.find({
            where: {
                IsActive: true,
            },
        });
    }

    async findOne(activityId: string): Promise<Activity> {
        const existingRecord = await this._activityRepository.findOne({
            where: { _id: new ObjectId(activityId), IsActive: true },
        });
        if (!existingRecord) {
            throw new NotFoundException(`Activity with ${activityId} does not exist.`);
        }
        return existingRecord;
    }

    async update(id: string, updateActivityTypeDto: ActivityDto): Promise<ObjectId> {
        const existingRecord = await this.findOne(id);
        await this._activityRepository.update(id, {
            ActivityDescription: updateActivityTypeDto.ActivityDescription ?? existingRecord.ActivityDescription,
            ActivityTypeId: updateActivityTypeDto.ActivityTypeId ?? existingRecord.ActivityTypeId,
            ParticipantId: updateActivityTypeDto.ParticipantId ?? existingRecord.ParticipantId,
            StepId: updateActivityTypeDto.StepId ?? existingRecord.StepId,
            ModifiedOn: new Date(),
        });
        return new ObjectId(id);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this._activityRepository.update(id, {
            ModifiedOn: new Date(),
            IsActive: false,
        });
        return id;
    }
}
