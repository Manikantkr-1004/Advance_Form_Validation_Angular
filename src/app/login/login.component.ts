import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData:{email:string,password:string} =  {email:"",password:""};

  onLogin(form: NgForm): void{
    if(form.valid){
      let data = localStorage.getItem('user');
      let parsedData;
      if(data){
        parsedData = JSON.parse(data);
      }

      let check = parsedData.find((ele:any)=> ele.email===this.loginData.email && ele.password === this.loginData.password);
      if(check){
        alert("Login successfull");
      }else{
        alert("Wrong Credentials")
      }
    }
  }
}
