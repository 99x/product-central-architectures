import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Base {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    CreatedOn: Date;

    @Column()
    ModifiedOn: Date;

    @Column()
    IsActive: boolean;
}
