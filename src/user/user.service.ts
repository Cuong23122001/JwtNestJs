import { Injectable } from "@nestjs/common";

export type User = {
    id: number;
    name: string;
    username: string;
    password: string
}

@Injectable()
export class UserService {
    private readonly user: User[] = [
        {
            id: 1,
            name: "NGuyen Van A",
            username: "user1",
            password: "123"
        },
        {
            id: 2,
            name: "NGuyen Van B",
            username: "user2",
            password: "123"
        },
        {
            id: 3,
            name: "NGuyen Van C",
            username: "user3",
            password: "123"
        }
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.user.find(u => u.username === username);
    }
}