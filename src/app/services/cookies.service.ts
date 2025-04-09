import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  getCookie(name : string) : string | null 
  {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  setCookie(name : string, value : string, days : number) : void
  {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  deleteCookie(name : string) : void
  {
    if(this.hasCookie(name))
    {
      document.cookie = name + '=; Max-Age=0';
    }
  }

  hasCookie(name : string) : boolean
  {
    if(this.getCookie(name) != null)
    {
      return true;
    }
    return false;
  }
}
