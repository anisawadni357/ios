import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage implements OnInit {

  constructor(private profileService:ProfileService,private toastController: ToastController) { }

  user:any=[];
  counteur:any=0;
  dataUser:any={
    private:false
  }
  ngOnInit() {
    let user =sessionStorage.getItem('user');
    let counteur=sessionStorage.getItem('counteur');
    this.counteur= counteur ? counteur : 0;
    this.user= user ? JSON.parse(user) : null;
   this.dataUser.private=this.user.isPrivate;
  }
  save()
  {
    this.counteur++;
    if(this.counteur>5)
    {
      sessionStorage.setItem('counteur',this.counteur);
    }
   if(this.counteur>5)
   {
    this.showErrorToast("You are blocked from making changes for the next 24 hours.");

   }else 
   {
    var data={
      isPrivate:this.dataUser.isPrivate
    }
    this.profileService.updatePassword(data,this.user.id)
    .subscribe(
      data => {
        
        if(data && data.message)
        {
          
          this.user.isPrivate=this.dataUser.isPrivate;
          sessionStorage.setItem('user',JSON.stringify(this.user));
        
          this.showSuccessToast('Your account has been updated successfully!');

        }
        
       
      },
      error => {
        
   
      }
    );
   }
  }
  async showSuccessToast(msg:any) {
    const toast = await this.toastController.create({
      message:msg,  
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
