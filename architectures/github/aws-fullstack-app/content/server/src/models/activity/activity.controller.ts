import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

import { ActivityService } from './activity.service';
import { ActivityDto } from './dto/activity.dto';
import { Activity } from './entities/activity.entity';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
    private _logger = new Logger('ActivityController');
    constructor(private readonly activityService: ActivityService) {}

    @Post()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    async create(@Body() createActivityDto: ActivityDto): Promise<ObjectId> {
        return this.activityService.create(createActivityDto);
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'The records have been successfully retrieved.',
    })
    findAll(): Promise<Activity[]> {
        return this.activityService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully retrieved.',
    })
    async findOne(@Param('id') id: string): Promise<Activity> {
        return await this.activityService.findOne(id);
    }

    @Patch(':id')
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
    })
    async update(@Param('id') id: string, @Body() updateActivityDto: ActivityDto) {
        return await this.activityService.update(id, updateActivityDto);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully deleted.',
    })
    async remove(@Param('id') id: string) {
        return await this.activityService.remove(id);
    }
}
