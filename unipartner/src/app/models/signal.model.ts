import { User } from "./user.model";

export class Signal {
    id !: string;
    typeSignal!: string;
    reportedAt:Date= new Date();
    reportedBy!:User;
}
