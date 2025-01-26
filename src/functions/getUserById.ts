import { HEntity } from "gnode-api";
import { ext } from "..";

export function getUserById(userId: number): HEntity | undefined {
    const user = ext.roomUsers.find((user) => user.id === userId);
    if (!user) return undefined;
    return user;
}   