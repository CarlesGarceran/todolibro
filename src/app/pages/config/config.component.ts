import { Component, inject, OnInit } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component"; import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { BackendService } from '../../services/backend.service';
import { ErrorPopupComponent } from '../../components/popups/error-popup/error-popup.component';
import { Error } from '../../interfaces/Error';
import { UserData } from '../../classes/UserData';
import { CryptoService } from '../../services/crypto.service';
import { Router } from '@angular/router';
import { TodoLibroConfig } from '../../todolibro.config';
import { FooterComponent } from "../../components/footer/footer.component";

export interface FormUser extends User
{
  password? : string;
}

@Component({
  selector: 'app-config',
  imports: [TopbarComponent, FormsModule, FooterComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit {
  protected file : File | null = null;
  protected user!: FormUser;

  private router : Router = inject(Router);
  private backendService : BackendService = inject(BackendService);
  private cryptoService : CryptoService = inject(CryptoService);
  private old_pfp : string = "";

  ngOnInit(): void {
    this.backendService.getUserData().subscribe((rsp) => {
      if(rsp.Success)
      {
        const usr = rsp.Data as User;

        this.user = {
          id: usr.id,
          email: usr.email,
          username: usr.username,
          profile_picture: usr.profile_picture,
          password: ""
        };

        this.old_pfp = this.sanetizeName(this.user.profile_picture || "");
      }
      else
      {
        ErrorPopupComponent.throwError(rsp.Data as Error);
        this.router.navigate(['/home']);
      }
    })
  }

  onFileSelected(event : any)
  {
    this.file = event.target.files[0];
  }

  sanetizeName(name : string) : string
  {
    return name.replaceAll(TodoLibroConfig.getBackendUrl() + "", "").replaceAll("/file/", "").replaceAll("?name=", "");
  }

  submitFile()
  {
    if(this.file == null)
      return;

    this.old_pfp = this.sanetizeName(this.user.profile_picture || "");

    if(this.old_pfp != "")
    {
      this.backendService.deleteFile(this.old_pfp).subscribe((rsp) => {
        
      });
    }

    this.backendService.uploadFile(this.file).subscribe((rsp) => {
      if(rsp.Success)
      {
        this.user.profile_picture = (rsp.Data as { fileName : string }).fileName;

        this.onSubmit();
      }
    });
  }

  onSubmit() {

    var clone : FormUser = 
    {
      id: this.user.id,
      email: this.user.email,
      profile_picture: this.user.profile_picture,
      username: this.user.username,
      password: this.user.password,
    };

    if(this.sanetizeName(this.old_pfp) != this.sanetizeName(clone.profile_picture || ""))
    {
      this.backendService.deleteFile(this.old_pfp).subscribe((rsp) => {});
    }

    if(this.user.password != null)
    {
      clone.password = this.cryptoService.getSHA256Hash(this.user.password);
    }

    this.backendService.updateUser(clone).subscribe((rsp) => {
      if(rsp.Success)
      {
        UserData.setUser(undefined);
      }
      else
      {
        ErrorPopupComponent.throwError(rsp.Data as Error);
      }
    })
  }
}
