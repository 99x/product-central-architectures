import { Base } from '../../../common/common-entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Activities')
export class Activity extends Base {
    @Column()
    ActivityDescription: string;

    @Column()
    ActivityTypeId: string;

    @Column()
    ParticipantId: string;

    @Column()
    StepId: string;
}
