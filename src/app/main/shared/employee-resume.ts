export class EmployeeResume{
 id!: number | null;
 carrierObjective!: string | null | undefined;   
 skills: Array<Skill>=[];
 employeeDetail!: EmployeeDetail;
 experiences:Array<Experience>=[];
 educations:Array<Education>=[] ;
 projects:Array<Project>=[];
 languages:Array<Language>=[];
 certifications!:string|null|undefined;
 hobbies!:string|null|undefined;;
 accomplishments!:string|null|undefined;;
 socialMediaLinks!:SocialMediaLink;
 isFresher!:boolean|null |undefined;
 isWorking!:boolean|null |undefined
 currentCTC:number |null |undefined;
 expectedCTC!:number |null |undefined;
 preferedLocation!:string |null |undefined; 
 posts:Array<any> | null |undefined=[]
 resumeStatusCode!:string|null|undefined;
 resumeStatusValue!:string|null|undefined;
    constructor(){}
}

export class Post{
      id!:number;
	  departmentId!:number|null|undefined;
	  departmentName!:string|null|undefined
}
export class Skill{
    id!: number;
    skillName!: string;
    skillExp!: number;
    fkEmployeeId!: number;
    constructor(){}
}


export class Address{
   
    addressId!: number;
    addressLine!: string;
    country!: string;
    state!: string;
    city!: string;
    pincode!: string;
    fkEmployeeDetailId!: number;
    constructor(){}
    
}

export class EmployeeDetail{
    employeeDetailId!:number
    firstName!: string |null;
    lastName!: string | null;
    gender!: string | null |undefined;
    email!: string | null;
    alternateEmail!: string | null;
    phone!: string | null | undefined;
    alternatePhone!: string | null |undefined;
    dob!: Date|null
    addreses: Array<Address>=[];
    fkEmployeeId!: number |null;
    constructor(){}
}

   export class Experience{
    experienceId!: number;
    jobTitle!: string;
    organizationName!: string;
    jobDescription!: string;
    startDate!: Date |null;
    endDate!: Date |null;
    isCurrentlyWorking!:boolean
    fkEmployeeId!: number;
    constructor(){}
}

export class Education{
    educationId!: number;
    degree!: string;
    fieldOfStudy!: string;
    location!: string;
    schoolName!: string;
    passingPercentage!: number;
    completionDate!: Date | null;
    fkEmployeeId!: number;
    constructor(){}
}


export class Project{
    projectId!: number;
    projectName!: string;
    projectDescription!: string;
    fkEmployeeId!: number;
    constructor(){}
}


export class Language{
    languageId!: number;
    languageName!: string;
    proficient!: string;
    isRead!: boolean;
    isSpeak!: boolean;
    isWrite!: boolean;
    fkEmployeeId!: number;
    constructor(){}
}
export class SocialMediaLink{
    socialMediaLinkId!: number;
    gitHub!: string;
    linkedIn!: string;
    stackOverflow!: string;
    fkEmployeeId!: number;
    constructor(){}
}