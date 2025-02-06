import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {GoogleAuth, User} from '@codetrix-studio/capacitor-google-auth';
import { GoogleSigninService } from 'src/app/services/google-signin-service.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
}) 
export class LoginPage implements OnInit {
  debugLog: any = null;

  errorlogin="";
  user={
    email:"anis@gmail.com",
    password:"anis2015",
  
 
  }
  userVerif={
    email:"",

    password:"",
   
  }
  userVerifstyle={
    email:"",
  
    password:"",
  
  }
 
  loggedIn: boolean = false;
  isAndroid:any=false;
  constructor(private platform: Platform,private googleSigninService: GoogleSigninService,private router: Router,private profileService:ProfileService,private toastController: ToastController) {
               
                   
   }

  ngOnInit() {
    console.log(this.platform);
    if (this.platform.is('android')) {
      this.isAndroid=true;
      GoogleAuth.initialize();
    }
    
    const clientId = '311031680675-hoc17tnp3hu7eva5mqaabph66rv37im4.apps.googleusercontent.com';
    
    // Initialisez Google Sign-In
    this.googleSigninService.initializeGoogleSignin(clientId, (response: any) => {
      this.googleSigninService.handleCredentialResponse(response);
    });

  }
  async signIn() {
    try {
      console.log("Tentative de connexion Google...");
      var user: User = await GoogleAuth.signIn();
      console.log("Connexion réussie :", user);
      this.debugLog = user; // 🔹 Stocke les logs dans une variable visible dans l'UI
    } catch (error) {
      console.error("Erreur de connexion Google :", error);
      this.debugLog = error;
    }
  }
  login()
  {
   
      if(this.user.email.length<3 || this.user.email.length>50)
      {
        this.userVerif.email = "This email or username incorrect";
        this.userVerifstyle.email = "border-bottom:1px solid red !important";
      }else 
      {
        this.userVerif.email = "";
        this.userVerifstyle.email = "";
      }
      if(this.user.password.length<6 || this.user.password.length>50)
        {
          this.userVerif.password = "This password incorrect";
          this.userVerifstyle.password = "border-bottom:1px solid red !important";
        }else 
        {
          this.userVerif.password = "";
          this.userVerifstyle.password = "";
        }
        if(this.userVerif.email=="" && this.userVerif.password=="")
        {
          this.profileService.login(this.user)
            .subscribe(
              data => {
                if (data) {
                 console.log(data)
                 if(data.error)
                 {
                    this.errorlogin="Email or password incorrect";
                    this.userVerifstyle.email="border-bottom:1px solid red !important";
                    this.userVerifstyle.password = "border-bottom:1px solid red !important";
                  
                 }else  if(data.user)
                 {
                  this.errorlogin="";
                  this.userVerifstyle.email="";
                  this.userVerifstyle.password = "";
                 
                  
                    sessionStorage.setItem('user',JSON.stringify(data.user));
                    let  user=sessionStorage.getItem("user");
                    let users = user ? JSON.parse(user) : null;
                    let tags=JSON.parse(users.tags);
                    this.showSuccessToast();
                    if (data.user.type == null || (data.user.type != 1 && data.user.type != 2)) {
                     
                    setTimeout(() => {
                        this.router.navigate(['/choice-type']);
                      }, 1000);
                   
                    } else if(tags==null || Object.keys(tags).length === 0 || tags.length === 0)
                      {
                       setTimeout(() => {
                         this.router.navigate(['/tags-management']);
                       }, 1000); 
                      } 
                    else {
                      setTimeout(() => {
                        this.router.navigate(['/']);
                      }, 1000); 
                    }
                 
                 }
                }else 
                {
                  this.showErrorToast("please try again later.");
                }
              },
              error => {
                this.showErrorToast("please try again later.");
              }
            );
        }
  }

  
  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Successful login',  
      duration: 3000,  
      position: 'top',  
      color: 'success', 
      cssClass: 'custom-toast-class' 
    });

    toast.present(); 
  }

  async showErrorToast(msg:any) {
    const toast = await this.toastController.create({
      message:msg,  
      duration: 3000,  
      position: 'top',  
      color: 'danger', 
      cssClass: 'custom-toast-class' 
    });

    toast.present(); 
  }

  
  

}
