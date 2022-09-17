import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { Address, Education, EmployeeDetail, EmployeeResume, Experience, Language, Project, Skill, SocialMediaLink } from '../shared/employee-resume';
import { EmployeeResumeService } from '../shared/employee-resume.service';
import { Moment } from 'moment';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-employee-resume',
  templateUrl: './employee-resume.component.html',
  styleUrls: ['./employee-resume.component.css']
})
export class EmployeeResumeComponent implements OnInit {

  title="Applicant Form"
  hidden:boolean=false;
  hiddenCurrentCtc:boolean=true;
  hideEndDate:any;
  dataTableUrl:any="/resumeBuilder/detail";
  departments:any;
  @ViewChild('myInput') inputElement!: ElementRef;
  maxDate!: Moment;
  minDate!: Moment;
  constructor(
    private fb: FormBuilder,
    private employeeService :EmployeeResumeService,
    private snackbar:SnackbarService, 
    private datePipe: DatePipe,
  ) { 
      this.setDobCalender();
  }

  genderList=[
    {"code":"Male","value":"Male"},
    {"code":"Female","value":"Female"},
    {"code":"Other","value":"Other"}
  ]

  fluencListList=[
    {"code":"Beginner","value":"Beginner"},
    {"code":"Intermidiate","value":"Intermidiate"},
    {"code":"Fluent","value":"Fluent"}
  ]

  countrList=[
    {"code":"India","value":"India"},
    {"code":"USA","value":"USA"},
    {"code":"Japan","value":"Japan"}
  ]


  resumeForm=this.fb.group({
    id:['',[]],
    carrierObjective:['',[Validators.required,Validators.minLength(5) ,Validators.maxLength(256)]],
    firstName:['',[Validators.required,Validators.pattern('^([a-zA-Z]+ )*[a-zA-Z]+$'),Validators.minLength(4)]],
    lastName:['',[Validators.required,Validators.pattern('^([a-zA-Z]+ )*[a-zA-Z]+$'),Validators.minLength(4)]],
    email:['',[Validators.email,Validators.required]],
    alternateEmail:['',[]],
    phone:['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]],
    alternatePhone:['',[]],
    gender:['',[Validators.required]],
    dob:[null,[Validators.required]],
    fresher:[false,[]],
    working:[true,[]],
    addreses:this.fb.array([this.initialAddress()]),
    experiences:this.fb.array([this.initialExperience()],[]),
    projects:this.fb.array([this.initialProject()]),
    educations:this.fb.array([this.initialEducation()]),
    languages:this.fb.array([this.initialLanguage()]),
    currentCTC:['',[Validators.required,Validators.pattern('^[0-9]+([.][0-9]+)?$')]],
    expectedCTC:['',[Validators.required,Validators.pattern('^[0-9]+([.][0-9]+)?$')]],
    preferedLocation:['',[Validators.required,Validators.pattern('^[^\s][A-Za-z0-9\s]*[^\s]$')]],
    skills:this.fb.array([this.initialSkill()]),
    cerification:['',[]],
    socialMediaLink:this.fb.array([]),
    hobbies:[''],
    //post:[[{'id':0,"departmentName":""}],Validators.required]
    post:[,Validators.required]
  },
  
  )

  // required to perform some operation at time of loading of application
  ngOnInit(): void {
    this.getAllDepartments();
  }

  selectedPostValue(event: MatSelectChange){
     this.resumeForm.patchValue({
       'post':event.source.value
     })
  }

  setDobCalender(){
    const currentYear = moment().year();
    this.minDate = moment([currentYear - 40]);
    this.maxDate = moment([currentYear -20]);
  }

  // getting the form control elements
  get email(): AbstractControl {
    return this.resumeForm.controls['email'];
  }
  
  get alternateEmail(): AbstractControl {
    return this.resumeForm.controls['alternateEmail'];
  }


  //dynemic address field
  get address():FormArray{
    return this.resumeForm.get('addreses') as FormArray;
  }

  get individualControl(){
    return this.resumeForm.controls;
  } 

  addAddres(){
    this.address.push(this.initialAddress());
  }

  deleteAddress(index:number){
    this.address.removeAt(index);
  }

  initialAddress(){
   return this.fb.group({
     addressLine:['',[Validators.required]],
     country:['',[Validators.required]],
     state:['',[Validators.required]],
     city:['',[Validators.required]],
     pincode:['',[Validators.required]]
   })
  }

  // performing hiding and showing of experience and project
  onSelectExperienceCheck(event:any){
    this.hidden=event.checked;
    //console.log(this.hidden)
    if(event.checked && this.resumeForm.value.working===true){
      this.resumeForm.get('currentCTC')?.enable();
      this.hiddenCurrentCtc=event.checked;
    }
    else if(!event.checked && this.resumeForm.value.working===false) {
      this.hiddenCurrentCtc=!event.checked;
      this.resumeForm.get('currentCTC')?.enable();
    } else if(!event.checked && this.resumeForm.value.working===true){
      this.hiddenCurrentCtc=!event.checked;
      this.resumeForm.get('currentCTC')?.enable();
    }else{
      this.hiddenCurrentCtc=Boolean(this.resumeForm.value.working);
      this.resumeForm.get('currentCTC')?.disable();
    }


    if(!this.hidden){
      this.resumeForm.get('experiences')?.enable();
      this.resumeForm.get('projects')?.enable();
     // this.resumeForm.get('currentCTC')?.enable();
    }else{
      this.resumeForm.get('experiences')?.disable();
      this.resumeForm.get('projects')?.disable();
      //this.resumeForm.get('currentCTC')?.disable();
    }

    
    
    //this.hidden=event.target.checked;
  }



  onSelectWorkingCheck(event:any){
    // this.hiddenCurrentCtc =event.checked;
    // if(this.hiddenCurrentCtc){
    //   this.resumeForm.get('currentCTC')?.enable();
    // }else{
    //   this.resumeForm.get('currentCTC')?.disable();
    // }
    if(event.checked && this.resumeForm.value.fresher===true){
      this.resumeForm.get('currentCTC')?.enable();
      this.hiddenCurrentCtc=event.checked;
    }
    else if(!event.checked && this.resumeForm.value.fresher===false) {
      this.hiddenCurrentCtc=!event.checked;
      this.resumeForm.get('currentCTC')?.enable();
    } else if(!event.checked && this.resumeForm.value.fresher===true){
      this.hiddenCurrentCtc=event.checked;
      this.resumeForm.get('currentCTC')?.disable();
    }else{
      this.hiddenCurrentCtc=event.checked;
      this.resumeForm.get('currentCTC')?.enable();
    }
  }

  onExperienceWorkingSelect(event:any,index:number){
      // console.log(this.experience.controls[index]?.get('currentlyWorking'));
      this.hideEndDate=event.value;
      
       if(event.value==="true"){
        this.hideEndDate=null;
        this.experience.controls[index]?.get('endDate')?.disable();
       }else{
        this.experience.controls[index]?.get('endDate')?.enable();
       }
  }

  //dynemic workExperience field
  get experience():FormArray{
    return this.resumeForm.get('experiences') as FormArray;
  }

  
  addExperience(){
    this.experience.push(this.initialExperience());
  }

  deleteExperience(index:number){
    this.experience.removeAt(index);
  }

  initialExperience(){
   return this.fb.group({
    jobTitle:['',[Validators.required]],
    organizationName:['',[Validators.required]],
    jobDescription:['',[Validators.required]],
    startDate:[null,[Validators.required]],
    endDate:[null,[Validators.required]],
    currentlyWorking:['false',[]]
   })
  }

  //  dynemic Projects field
  get project():FormArray{
    return this.resumeForm.get('projects') as FormArray;
  }

  
  addProject(){
    this.project.push(this.initialProject());
  }

  deleteProject(index:number){
    this.project.removeAt(index);
  }

  initialProject(){
   return this.fb.group({
    projectName:['',[Validators.required]],
    projectDescription:['',[Validators.required]],
    
   })
  }

  //  dynemic Education field
  get education():FormArray{
    return this.resumeForm.get('educations') as FormArray;
  }

  
  addEducation(){
    this.education.push(this.initialEducation());
  }

  deleteEducation(index:number){
    this.education.removeAt(index);
  }

  initialEducation(){
   return this.fb.group({
    degree:['',[Validators.required]],
    fieldOfStudy:['',[Validators.required]],
    location:['',[Validators.required]],
    schoolName:['',[Validators.required]],
    passingPercentage:['',[Validators.required]],
    completionDate:[null,[Validators.required]],
    
   })
  }
 
  //  dynemic languages field
  get language():FormArray{
    return this.resumeForm.get('languages') as FormArray;
  }

  
  addLanguage(){
    this.language.push(this.initialLanguage());
  }

  deleteLanguage(index:number){
    this.language.removeAt(index);
  }

  initialLanguage(){
   return this.fb.group({
    languageName:['',[Validators.required]],
    proficient:['',[Validators.required]],
    read:['',[]],
    speak:['',[]],
    write:['',[]],
   })
  }

   //  dynemic skills field
   get skill():FormArray{
    return this.resumeForm.get('skills') as FormArray;
  }

  
  addSkill(){
    this.skill.push(this.initialSkill());
  }

  deleteSkill(index:number){
    this.skill.removeAt(index);
  }

  initialSkill(){
   return this.fb.group({
    skillName:['',[Validators.required,]],
    skillExp:['',[Validators.required,Validators.pattern('^[0-9]+([.][0-9]+)?$')]],
   })
  }

   //  dynemic social Media Links field
   get socialMediaLink():FormArray{
    return this.resumeForm.get('socialMediaLink') as FormArray;
  }

  
  addSocialMediaLink(){
    if(this.socialMediaLink.controls.length>0){
      return;
    }
    this.socialMediaLink.push(this.initialsocialMedailLink());
  }

  deleteSocialMediaLink(index:number){
    this.socialMediaLink.removeAt(index);
  }

  initialsocialMedailLink(){
   return this.fb.group({
    gitHub:['',[]],
    linkdin:['',[]],
    stackOverflow:['',[]],
   })
  }

  //  validateAlterEmail(control: AbstractControl): { [key: string]: boolean } | null {
  //       let flag=control.value;
  //      return flag?{ 'similar': true }:null;
  //   }

 
 getAllDepartments(){
    this.employeeService.getAllDepartments().subscribe((data:any)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
       this.departments=data.response;
      }else{
        this.snackbar.openErrorSnackBar(data.message)
      }
     })
  }
  onAlternatEmailChange() {
    let alternateEmailSelected = this.resumeForm?.get('alternateEmail')?.value;
    if(alternateEmailSelected !=null) {
        this.resumeForm?.get('alternateEmail')?.setValidators([Validators.email]); // 5.Set Required Validator
        this.resumeForm.get('alternateEmail')?.updateValueAndValidity();
    } else {
      this.resumeForm.get('alternateEmail')?.clearValidators(); // 6. Clear All Validators
      this.resumeForm.get('alternateEmail')?.updateValueAndValidity();
    }
    
    // if (this.alternateEmail.value === this.email.value) {
    //   this.alternateEmail.setErrors({ similar: true });
    // } else {
    //   this.alternateEmail.setErrors(null);
    // }


  }

  onAlternatePhoneChange(){
    let alternatePhoneSelected = this.resumeForm?.get('alternatePhone')?.value;
    if(alternatePhoneSelected !=null) {
      this.resumeForm?.get('alternatePhone')?.setValidators([Validators.pattern('^[6-9][0-9]{9}$')]); // 5.Set Required Validator
      this.resumeForm.get('alternatePhone')?.updateValueAndValidity();
    } else {
      this.resumeForm.get('alternatePhone')?.clearValidators(); // 6. Clear All Validators it clears all previous validors also
      this.resumeForm.get('alternatePhone')?.updateValueAndValidity();
    }
  }
   saveResumeForm(){
     if(this.resumeForm.invalid){
      return;
     }

     if(this.resumeForm.value.alternateEmail?.trim()){
      if(this.resumeForm.value.email===this.resumeForm.value.alternateEmail.trim()){
        console.log("email="+this.resumeForm.value.email)
        console.log("alternateEmail="+this.resumeForm.value.alternateEmail)
        this.snackbar.openErrorSnackBar("email and alternate email must be different")
           return;
       }
     }
     
     if(this.resumeForm.value.alternatePhone?.trim()){
      if(this.resumeForm.value.phone===this.resumeForm.value.alternatePhone.trim()){
        console.log("phone="+this.resumeForm.value.email)
        console.log("alternatePhone="+this.resumeForm.value.alternateEmail)
           this.snackbar.openErrorSnackBar("phone and alternate phone must be different")
        return;
       }
     }

    

     let employee=new EmployeeResume();
     employee.id=(this.resumeForm.value.id?.trim())?Number(this.resumeForm.value.id):null;
     employee.carrierObjective=this.resumeForm!.value!.carrierObjective;
     
     let employeeDetail=new EmployeeDetail();
     employeeDetail.firstName=this.resumeForm.value.firstName?this.resumeForm.value.firstName:null;
     employeeDetail.lastName=this.resumeForm.value.lastName?this.resumeForm.value.lastName:null;
     employeeDetail.email=this.resumeForm.value.email?this.resumeForm.value.email:null;
     employeeDetail.alternateEmail=this.resumeForm.value.alternateEmail?this.resumeForm.value.alternateEmail:null;
     employeeDetail.phone=this.resumeForm.value.phone?this.resumeForm.value.phone:null;
     employeeDetail.alternatePhone=this.resumeForm.value.alternatePhone?this.resumeForm.value.alternatePhone:null;
     employeeDetail.dob=this.resumeForm.value.dob?new Date(this.resumeForm.value.dob):null;
     employeeDetail.gender=this.resumeForm.value.gender;
     let address=new Address();
     let addressArray:any=(this.resumeForm.value.addreses && this.resumeForm.value.addreses.length>0)?this.resumeForm.value.addreses:null;
     console.log(JSON.stringify(addressArray));
     addressArray.forEach((element:any)=>{
      address.addressLine=element.addressLine;
      address.city=element.city;
      address.country=element.country;
      address.pincode=element.pincode;
      address.state=element.state;
      employeeDetail?.addreses.push(address);
     })
    
    employee.employeeDetail=employeeDetail;
    employee.isWorking=Boolean(this.resumeForm.value.working);
    employee.isFresher=Boolean(this.resumeForm.value.fresher);
    employee.expectedCTC=this.resumeForm.value.expectedCTC?Number(this.resumeForm.value.expectedCTC):null;
    employee.currentCTC=this.resumeForm.value.currentCTC?Number(this.resumeForm.value.currentCTC):null;
    employee.preferedLocation=this.resumeForm.value.preferedLocation?this.resumeForm.value.preferedLocation:null;
    employee.certifications=this.resumeForm.value.cerification?this.resumeForm.value.cerification:null;
    employee.hobbies=this.resumeForm.value.hobbies?this.resumeForm.value.hobbies:null;
   let postArray:any=this.resumeForm.value.post;
   let posts= postArray.map((post:any) => {
      return{
           "id":null,
           "departmentName":post.departmentName,
           "departmentId":post.id,
      }
    });
    employee.posts=posts;
    console.log(this.resumeForm.value)
    //console.log(this.resumeForm.value.post)
    let socialMediaLink=new SocialMediaLink();
    let socialLink=(this.resumeForm.value.socialMediaLink && this.resumeForm.value.socialMediaLink.length>0)?
                     this.resumeForm.value.socialMediaLink:null;
    socialLink?.forEach((link:any)=>{
      socialMediaLink.gitHub=link.gitHub;
      socialMediaLink.linkedIn=link.linkdin;
      socialMediaLink.stackOverflow=link.stackOverflow;
      employee.socialMediaLinks=socialMediaLink;
    })
    let skill=new Skill();
    let skillArray:any=(this.resumeForm.value.skills && this.resumeForm.value.skills.length>0)? this.resumeForm.value.skills:null;
                    skillArray?.forEach((skill:any)=>{
                      skill.skillName=skill.skillName;
                      skill.skillExp=skill.skillExp?Number(skill.skillExp):null;
                      employee.skills.push(skill)
                    })
     
     let langArray:any=(this.resumeForm.value.languages && this.resumeForm.value.languages.length>0)?
     this.resumeForm.value.languages:null;
     let language =new Language();
     langArray.forEach((element:any)=>{
      language.languageName=element.languageName;
      language.proficient=element.proficient;
      language.isRead=element.read;
      language.isSpeak=element.speak;
      language.isWrite=element.write;
      employee.languages.push(language);
     })
     

     let educationArray:any=(this.resumeForm.value.educations && this.resumeForm.value.educations.length>0)?
     this.resumeForm.value.educations:null;

     //education
     let education=new Education();
     educationArray.forEach((element:any) => {
      education.degree=element.degree;
      education.fieldOfStudy=element.fieldOfStudy;
      education.location=element.location;
      education.schoolName=element.schoolName
      education.completionDate=(element.completionDate)?new Date(element.completionDate):null;;
      education.passingPercentage=Number(element.passingPercentage);
      employee.educations.push(education);
     });

     //projects
     let projectArray:any=(this.resumeForm.value.projects && this.resumeForm.value.projects.length>0 )?
     this.resumeForm.value.projects:null;
     if(projectArray!=null && projectArray.length>0){
     let project =new Project();
     projectArray.forEach((element:any)=>{
      project.projectName=element.projectName;
      project.projectDescription=element.projectDescription;
      employee.projects.push(project);
     });
    }
    
   //experiene
     let experiencArray:any=(this.resumeForm.value.experiences && this.resumeForm.value.experiences.length>0)?
     this.resumeForm.value.experiences:null;
     if(experiencArray!=null && experiencArray.length>0 ){
     let experience=new Experience()
     experiencArray.forEach((element:any) => {
      experience.jobTitle=element.jobTitle;
      experience.jobDescription=element.jobDescription;
      experience.organizationName=element.organizationName;
      experience.startDate=(element.startDate)?new Date(element.startDate):null;
      experience.endDate=(element.endDate)?new Date(element.endDate):null;;
      experience.isCurrentlyWorking=Boolean(element.currentlyWorking);
      employee.experiences.push(experience);

     });
    }
   // console.log(employee)

     this.employeeService.saveEmployeeResume(employee).subscribe((data)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
        this.snackbar.openSucessSnackBar(data.message,this.dataTableUrl);
        //this.resumeForm.reset();
      }else{
        this.snackbar.openErrorSnackBar(data.message);
      }
     })

  }                       
}