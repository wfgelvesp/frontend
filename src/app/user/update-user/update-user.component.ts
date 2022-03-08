import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DialogData } from '../list-delivery/list-delivery.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  registerData: any;
  message: string = '';
  status: string = this.data.domicilio.status;
  email:string =this.data.domicilio.email; 

  constructor(
    private _userService: UserService,
    private _router: Router,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { 
    this.registerData = {};
  }

  ngOnInit(): void {
    this.registerData.name=this.data.domicilio.name;
    this.registerData.email=this.data.domicilio.email;
    this.registerData.phone=this.data.domicilio.phone;
    this.registerData.status=this.data.domicilio.status;
    this.registerData.idUser=this.data.domicilio.id;
    this.registerData.idRole=this.data.domicilio.id_role;

  }
  upUser():void{
    if(this.registerData.phone!=null){      
      this.registerData.phone=this.registerData.phone.toString();
    }
    
    this.registerData.status=this.status;

    if(this.registerData.name == this.data.domicilio.name &&
      this.registerData.email ==  this.data.domicilio.email &&
      this.registerData.phone==this.data.domicilio.phone 
      ){
        this.message="ERROR. No hay cambios para aplicar"
        console.log(this.message);
      }

    else if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.phone 

    ) {
      this.message="ERROR. Datos incompletos"
      console.log(this.message);      
    } else {      
      this._userService.updateUser(this.registerData,this.email).subscribe({
        next:(v)=>{  
          
          //this._router.navigate(['/home/list-users'])
          this.registerData={};
          console.log(v); 
           this.dialogRef.close(); 
          
        },
        error:(e)=>{ 
          console.log(e.error.message);
          console.log("error");          
         }
      });
    }
  }

}
