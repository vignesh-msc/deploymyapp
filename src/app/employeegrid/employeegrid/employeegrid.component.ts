import { Component } from '@angular/core';
import { filter, map, of } from 'rxjs';
import { User } from 'src/app/Models/employee';



@Component({
  selector: 'app-employeegrid',
  templateUrl: './employeegrid.component.html',
  styleUrls: ['./employeegrid.component.css']
})
export class EmployeegridComponent {

  users:User [] =[];
  filteredusers: string []=[];
  isDisabled: boolean = false;
  title: string ="welcome to pipes";
  jsonval = {name: 'Alex', age: '25', address:{a1: 'Paris', a2: 'France'}};
  todaydate = new Date(); 
  num: number =0; 

  ngOnInit() {
    const source = of(2, 2, 6, 4, 8);

source.pipe(
  filter((value) => value % 2 === 0),
  map((value) => value * 2)
).subscribe((result) => {
  console.log(result);
});

    this.users.push(new User('vigswnh',25,"v@gmail.com"));
    this.users.push(new User('vigswnh123',17,"v@gmail.com"));
    this.users.push(new User('vigswnh567',20,"v@gmail.com"));
    this.users.push(new User('vigswnhwegw',16,"test@gmail.com"));

   // this.users = this.users.filter(x=>x.age>17);

  // this.users.forEach((value)=>{
  //   value.name = `Mr. ${value.name}`;
  //   value.email = `Email-Adress. ${value.email}`;
  //   value.age = value.age+10;
  // });

  }
  disable(){
    debugger;

    this.isDisabled = true;
   // this.users.push('another user added')
  }
  enable(){
    debugger;
    this.isDisabled = false;
  }
  AddButtonCSSStyles() {
    let CssStyles = {        
        'color':'red',
        'font-weight': 'bold',
        'font-size.px': 20
    };
    return CssStyles;
  }
  

  // onCheckboxChange(event: any,user:User) {
  //   debugger;
  // if(event.target.checked){
  //   this.filteredusers.push(user);
  // } else{
  //   this.filteredusers = this.filteredusers.filter(x=>x!== user);
  // }
  // }

}
