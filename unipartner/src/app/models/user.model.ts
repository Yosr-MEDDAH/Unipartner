export class User {
    id!:string;
    email!: string;
    pwd!: string;
    name!: string;
    lastname!: string;
    photo!: string;
    userRole!:string;
    gender!:string;
    skills: string[] = [];
    interests?: string[];
    redFlags?: string[] = [];
    signals?: string[] = [];
  }
  