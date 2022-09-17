import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { Address, Education, EmployeeDetail, EmployeeResume, Experience, Language, Project, Skill, SocialMediaLink } from '../shared/employee-resume';
import { EmployeeResumeService } from '../shared/employee-resume.service';
import { Moment } from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-view-employee-resume',
  templateUrl: './view-employee-resume.component.html',
  styleUrls: ['./view-employee-resume.component.css']
})
export class ViewEmployeeResumeComponent implements OnInit {

  title=" View Employee Form"
  hidden:boolean=false;
  hiddenCurrentCtc:boolean=true;
  hideEndDate:any;
  dataTableUrl:any="/resumeBuilder";
  employeeDetail:any;
  @ViewChild('myInput') inputElement!: ElementRef;
  maxDate!: Moment;
  minDate!: Moment;
  departments:any;
  constructor(
    private fb: FormBuilder,
    private employeeService :EmployeeResumeService,
    private snackbar:SnackbarService, 
    private datePipe: DatePipe,
    private activatedRoute:ActivatedRoute,
    private router:Router,
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

  post:any=[
    {"id": 1, "departmentName": "Java Developer"},
    {"id": 2, "departmentName": "Angular Developer"},
    {"id": 3, "departmentName": "Php Developer"},
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
    post:[,Validators.required]
  },
  
  )

  // required to perform some operation at time of loading of application
  ngOnInit(): void {
    this.getAllDepartments();
    this.getDetail()
  }
  getAllDepartments(){
    this.employeeService.getAllDepartments().subscribe((data:any)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
       this.departments=data.response;
      }else{
        this.snackbar.openErrorSnackBar(data.message)
      }
     })
  }

  selectedPostValue(event: MatSelectChange){
    console.log(event.source.value);
    this.resumeForm.patchValue({
      'post':event.source.value
       
    })
 }

    getDetail(){
    this.activatedRoute.queryParams.subscribe((params)=>{
      const id=params['param'];
      this.employeeService.getEmployeeById(id).subscribe((data)=>{
        if(data!=null && data!=undefined && data.response!=null && data.status==HttpStatus.SUCCESS){
           this.employeeDetail=data.response;
           
          this.resumeForm.patchValue({
             'id':data.response.id,
             'carrierObjective':data.response.carrierObjective,
             'firstName':data.response.employeeDetail.firstName,
             'lastName':data.response.employeeDetail.lastName,
             'email':data.response.employeeDetail.email,
             'alternateEmail':data.response.employeeDetail.alternateEmail,
             'phone':data.response.employeeDetail.phone,
             'alternatePhone':data.response.employeeDetail.alternatePhone,
             'gender':data.response.employeeDetail.gender,
             'dob':data.response.employeeDetail.dob,
             'fresher':data.response.isFresher,
             'working':data.response.isWorking,
             'currentCTC':data.response.currentCTC,
             'expectedCTC':data.response.expectedCTC,
             'preferedLocation':data.response.preferedLocation,
             'cerification':data.response.certifications,
             'hobbies':data.response.hobbies,
          });
          this.resumeForm.patchValue({
            'post':this.existingPost(data.response?.posts),
          })
          this.resumeForm.setControl("addreses",this.existingAddress(data.response.employeeDetail.addreses))
          this.resumeForm.setControl("experiences",this.existingExperience(data.response?.experiences))
          this.resumeForm.setControl("projects",this.existingProject(data.response?.projects))
          this.resumeForm.setControl("languages",this.existingLanguage(data.response.languages))
          this.resumeForm.setControl("skills",this.existingSkill(data.response.skills))
          this.resumeForm.setControl("socialMediaLink",this.existingsocialMedailLink(data.response?.socialMediaLinks))
          this.resumeForm.setControl("educations",this.existingEducation(data.response.educations))
          this.resumeForm.disable();
        }else{
          this.snackbar.openErrorSnackBar(data.message);
        }
      })
    })
   }

    existingPost(postSet:any):any{
      if(postSet!=null && postSet.length>0){
        let posts=postSet.map((post:any)=>post.departmentId);
         return posts;
      }
     
   }

   existingAddress(addressSet:any):FormArray{
     const formArray:any=new FormArray([]);
     addressSet.forEach((address:Address)=>{
      formArray.push( this.fb.group({
        'addressLine':address.addressLine,
        'country':address.country,
        'state':address.state,
        'city':address.city,
        'pincode':address.pincode
        })) ;
     })
     return formArray;
    }
    existingExperience(experienceSet:any):FormArray{
      const formArray:any=new FormArray([]);
       experienceSet.forEach((experience:Experience)=>{
        formArray.push(
          this.fb.group({
            'jobTitle':experience.jobTitle,
            'organizationName':experience.organizationName,
            'jobDescription':experience.jobDescription,
            'startDate':experience.startDate,
            'endDate':experience.endDate,
            'currentlyWorking':experience.isCurrentlyWorking,
           })
        )
       })
      return formArray;
     }
     
     existingEducation(educationSet:any):FormArray{
      const formArray:any=new FormArray([]);
      educationSet.forEach((education:Education)=>{
        formArray.push(
          this.fb.group({
            'degree':education.degree,
            'fieldOfStudy':education.fieldOfStudy,
            'location':education.location,
            'schoolName':education.schoolName,
            'passingPercentage':education.passingPercentage,
            'completionDate':education.completionDate,
           })
        )
      })
      return formArray;
      }
      
      existingLanguage(languageSet:any):FormArray{
       const formArray:any=new FormArray([]);
       languageSet.forEach((language:Language)=>{
        formArray.push(
          this.fb.group({
            'languageName':language.languageName,
            'proficient':language.proficient,
            'read':language.isRead,
            'speak':language.isSpeak,
            'write':language.isWrite,
           })
        )
       })
      return formArray;
     }
      
    existingsocialMedailLink(socialMediaLinkSet:any):FormArray{
      const formArray:any=new FormArray([]);
      if(socialMediaLinkSet!==null ||socialMediaLinkSet!=undefined ){
        formArray.push(
          this.fb.group({
            'gitHub':socialMediaLinkSet?.gitHub,
            'linkdin':socialMediaLinkSet?.linkedIn,
            'stackOverflow':socialMediaLinkSet?.stackOverflow,
           })
          )
      }
      return formArray;
     }
     
     existingProject(projectSet:any):FormArray{
      const formArray:any=new FormArray([]);
        projectSet.forEach((project:Project)=>{
         formArray.push(
          this.fb.group({
          'projectName':project.projectName,
          'projectDescription':project.projectDescription,
         })) 
      })
       
      return formArray;
     }

     existingSkill(skillSet:any):FormArray{
      const formArray:any=new FormArray([]);
      skillSet.forEach((skill:Skill)=>{
       formArray.push(
        this.fb.group({
          'skillName':skill.skillName,
          'skillExp':skill.skillExp,
         }))
    })
     
    return formArray;
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
 
  backToGrid(){
    this.router.navigate([this.dataTableUrl]);
  }
                
}