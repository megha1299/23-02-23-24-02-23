import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  empform!: FormGroup;

  countryData=['India','Algeria','Japan', 'Australia', 'Kenya']

  stateData=[
    ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'West Bengal'],
    ['Abadla', 'Abbes', 'Adrar', 'Aïn Séfra', 'Algiers', 'Annaba', 'Arreridj', 'Batna', 'Bejaia', 'Béchar', 'Béni Ounif', 'Biskra', 'Bordj Badji Mokhtar', 'Bordj Bou', 'Bou Saâda', 'Chenachene', 'Chlef', 'Collo', 'Constantine', 'Djanet', 'Djelfa', 'El Bayadh', 'El Goléa'],
    ['Hokkaido','Tohoku','Kanto','Chubu','Kinki/Kansai','Chugoku','Shikoku','Kyushu (incl. Okinawa)'],
    ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania'],
    [ 'Nairobi', 'Central', 'Coast', 'Eastern', 'North Eastern', 'Nyanza', 'Rift Valley', 'Western']
  ]

  states: any;

  constructor(private fb: FormBuilder, private Service: ServiceService, private router: Router){}

  user = {
    firstname: '',
    lastname: '',
    age: '',
    phone: '',
    address: '',
    education: '',
    email: '',
    password: '',
    confirmpassword: '',
    country: '',
    state: '',
    city: '',
    pin: '',
    message: ''
  }

  ngOnInit(){
    this.empform =this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.pattern('^([^0-9]*)$')])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern('^([^0-9]*)$')])],
      age: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      address: ['', Validators.required],
      education: ['', Validators.required],
      email: ['', ([Validators.required, Validators.minLength(17), Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.maxLength(6)],
      message: ['', Validators.maxLength(15)]
    },
    {
      validators: this.mustMatch('password','confirmpassword')
    }
    
    );
  
  }

 
  mustMatch(password:string, confirmpassword:string){
    return (formgroup: FormGroup)=>{
      const passwordcontrol = formgroup.controls[password];

      const confirmpasswordcontrol = formgroup.controls[confirmpassword];

      if(confirmpasswordcontrol.errors && !confirmpasswordcontrol.errors['misMatch']){
        return false;
      }

      if(passwordcontrol.value !== confirmpasswordcontrol.value){
        confirmpasswordcontrol.setErrors({misMatch: true});
        return false;
      }
      else
      {
        confirmpasswordcontrol.setErrors(null);
        return true;
      }
    }
  }
  get f(){
   return this.empform.controls;
  }

  onSelected(value: number){
    this.states= this.stateData[value];
  }

  
  onSubmit(form: FormGroup){

    if(this.empform.valid){
      this.user.firstname = form.value.firstname;
      this.user.lastname = form.value.lastname;
      this.user.age = form.value.age;
      this.user.phone = form.value.phone;
      this.user.address = form.value.address;
      this.user.education = form.value.education;
      this.user.email = form.value.email;
      this.user.password = form.value.password;
      this.user.confirmpassword = form.value.confirmpassword;
      this.user.country = this.countryData[form.value.country];
      this.user.state = this.stateData[form.value.country][form.value.state];
      this.user.pin = form.value.pin;
      this.user.message = form.value.message;
      console.log(this.user);

      this.Service.setData(this.user);
    
      this.router.navigate(['/display']);

    }

    
  }
}
