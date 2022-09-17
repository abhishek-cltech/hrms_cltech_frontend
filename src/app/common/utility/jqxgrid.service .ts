import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JqxGridService {

  constructor() { }

  setActionButton(idName: string, btnHtml: any, htmlElement: HTMLElement): any {
    const container = document.createElement('div');
   // alert(btnHtml)
    container.id = idName;
    container.style.cssText = 'border:none;margin-top: 5px;margin-left: 7px;display:inline-block;color:none;';
    
    htmlElement.appendChild(container);

    const options = { width: 30, height: 30,textPosition: 'topLeft',
        value: btnHtml
    };

    return jqwidgets.createInstance('#'+ idName, 'jqxButton', options);
  }

}
