export class User{
 id!: number | null |undefined;
 email!: string | null | undefined;   
 password: string | null | undefined;
 confirmPassword!:string | null | undefined;
 role!:string |null|undefined;
 roleId!:number | null |undefined;
 deparmentIds:number|null|undefined;
 departments:string|null|undefined;
 firstName:string|null|undefined;
 lastName:string|null|undefined;
 active!: boolean | null | undefined;
 questionCode: string|null|undefined;
 questionAnswer: string|null|undefined;
 //departments: Array<Department> = [];
 constructor(){}
}

export class Department{
    id!: number | null |undefined;
    departmentName!: string |null|undefined;
    active!: boolean | null | undefined;
    constructor(){}
}


