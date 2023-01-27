export interface Base {
    Id: number;
    IsDeleted?:	boolean;
    InsertedUser?: number;
    InsertedDate?: Date;
    DeletedDate?: Date;
}