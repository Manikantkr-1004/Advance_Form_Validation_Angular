import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Userdata } from '../userdata';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: Userdata = {
    name: "",
    email: "",
    dob: "",
    number: null,
    address: "",
    company: false,
    company_name:"",
    password: "",
    username: "",
  }

  loginData:{email:string,password:string} =  {email:"",password:""}
  
  onSubmit(form: NgForm): void{
    if(form.valid){
      let arr = [];
      arr.push(this.data);
      localStorage.setItem('user',JSON.stringify(arr));
    }
  }

  onLogin(form: NgForm): void{
    if(form.valid){
      console.log(this.loginData)
    }
  }

  calculateAge(): number{
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(this.data.dob!==""){
      let current = new Date().toLocaleDateString();
      let currentDay = +current.split("/")[0];
      let currentMonth = +current.split("/")[1];
      let currentYear = +current.split("/")[2];      

      if(currentYear%4===0){
        months[1] = 29;
      }else{
        months[1] = 28;
      }

      let dateofbirth = new Date(this.data.dob).toLocaleDateString();
      let dateofbirthDay = +dateofbirth.split("/")[0];
      let dateofbirthMonth = +dateofbirth.split("/")[1];
      let dateofbirthYear = +dateofbirth.split("/")[2];      

      if(dateofbirthDay>currentDay){
        currentDay+= months[currentMonth-1];
        currentMonth-= 1;
      }
      if(dateofbirthMonth>currentMonth){
        currentMonth+= 12;
        currentYear-= 1;
      }

      let age = currentYear - dateofbirthYear;
      return age;
    }else{
      return 18;
    }
  }

  passwordCheck(): boolean{
    if(this.data.password!=="" && this.data.password){
      const length= this.data.password.length>=8, hasUpperCase = /[A-Z]/.test(this.data.password), hasLowerCase = /[a-z]/.test(this.data.password), hasDigit = /\d/.test(this.data.password), hasSpecialChar = /[!@#$%^&*]/.test(this.data.password);
      
      if(length && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar){
        return false;
      }else{
        return true;
      }
    }
    return false;
  }

  usernameCheck(): boolean{
    let arr : string[] = ['manikant12','mani12','manikumar']
    if(this.data.username!=="" && this.data.username){
      if(arr.includes(this.data.username)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
}
