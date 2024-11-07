import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  users:any;

  constructor(private adminService: AdminService, private loader: LoaderService){
    
  }

  ngOnInit(){
    this.getAllUsers();
  }

  public getAllUsers(){
    this.loader.show();
    this.adminService.getUsers().subscribe((response) => {
      console.log(response)
      if (response && response.error) {
        console.log(response)
        this.loader.hide();

      } else {
        this.users=response;
        this.loader.hide();

      }
    })
  }
}
