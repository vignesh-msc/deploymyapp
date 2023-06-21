import { Observable, of } from "rxjs";
import { employee } from "src/app/Models/employee";

export class empservice {
    listemp:any[]=[]

    constructor() {
       
        this.listemp = new Array<employee>();
        this.listemp.push(new employee(123,'','','',true));
    
      }
   public getAllEmployees() : Observable<employee[]> {{
        return of(this.listemp);
      }

}}

