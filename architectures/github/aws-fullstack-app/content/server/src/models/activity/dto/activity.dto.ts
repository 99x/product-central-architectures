import { ApiProperty } from '@nestjs/swagger';

export class ActivityDto {
    @ApiProperty({
        example: 'Device',
        description: 'Type of object that the user may interact with in the system',
    })
    ActivityDescription: string;

    @ApiProperty({
        example: '64896c0ebb2f3b50a0110728',
        description: 'Id of the Type of event which is occurring in this user interaction',
    })
    ActivityTypeId: string;

    @ApiProperty({
        example: '64896c0ebb2f3b50a0110728',
        description: 'Id of the participant who is currently interacting with the system',
    })
    ParticipantId: string;

    @ApiProperty({
        example: '64896c0ebb2f3b50a0110728',
        description: 'stepId of the current step where the interaction is occurring',
    })
    StepId: string;
}
