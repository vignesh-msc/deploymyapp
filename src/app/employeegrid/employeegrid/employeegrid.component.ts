import { Component } from '@angular/core';
import { filter, map, of } from 'rxjs';
import { Author ,Comment,Reply,SubComment} from 'src/app/Models/comments';
import { User } from 'src/app/Models/employee';
import { Product ,Items,cartItem,stockItem} from 'src/app/Models/product';
import { authservice } from 'src/services/authservice/authservice ';
import { CartserviceService } from 'src/services/cartservice/cartservice.service';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-employeegrid',
  templateUrl: './employeegrid.component.html',
  styleUrls: ['./employeegrid.component.css']
})
export class EmployeegridComponent {

  constructor(private auth:authservice ,private cartservice:CartserviceService) {
   
  }

  users:User [] =[];
  filteredusers: string []=[];
  isDisabled: boolean = false;
  todaydate = new Date(); 
  num: number =1; 
  comments: Comment[] = [];
  newCommentContent: string ='';
  editModeCommentId: number | null = null;
  currentUser: Author= {
    id: '', // Set the user ID
    name: 'te', // Set the user name
    avatar: 'avatar.png' // Set the user avatar image URL
  };; // Assuming you have the current user information
  showReplyFormForComment: Comment | null = null;
  showorder: boolean = false;
  nextCommentId: number = 1;
  selproducts :stockItem[] =[];
  totalCost:number=0;
  orderedItems:stockItem[] =[];
  stocks:stockItem[]=[]

  ngOnInit() {

    this.cartservice.getcartdetails(this.auth.getUserID()).subscribe({
      next: (response: any) => {
        console.log('response',response);
        let cartitems= response.cart;
        console.log('cartitems',cartitems);
        if (Array.isArray(cartitems)) {
          this.orderedItems=  cartitems.map((stock:any) => {
            const item: stockItem = {
              id:stock._id,
              name: stock.name,
              price: stock.price,
              quantity: stock.quantity
            };
            return item;
          });
        }
        console.log('this.orderedItems',this.orderedItems);
      },
      error: (error:any) => {
        console.log('error',error);
      },
    });

    this.cartservice.getmasterstockitems().subscribe({
      next: (response: any) => {
        this.stocks = response;
        console.log('this.stocks',this.stocks)
      },
      error:(error: any)=>{
      }});
  }
  disable(){

    this.isDisabled = true;
   // this.users.push('another user added')
  }
  enable(){
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
  // newCommentContent(){

  // }
  addComment() {
    debugger;
    const newComment: Comment = {
      id: this.nextCommentId, // Generate a unique ID for the comment
      author: this.currentUser,
      content: this.newCommentContent,
      timestamp: new Date(),
      replies: []
    };
    this.comments.push(newComment);
    this.newCommentContent = '';
    this.nextCommentId++;
  }
  showReplyForm(comment: Comment) {
    this.showReplyFormForComment = comment;
  }

  addReply(comment: Comment) {
    const newReply: Reply = {
      id: '', 
      author: this.currentUser,
      content: '', 
      timestamp: new Date(),
      subComments: []
    };

    comment.replies.push(newReply);
    this.showReplyFormForComment = null;
  }
  addSubComment(reply: Reply) {
    const newSubComment: SubComment = {
      id: '', // Generate a unique ID for the sub-comment
      author: this.currentUser,
      content: '', // Set the content of the sub-comment based on user input
      timestamp: new Date()
    };

    reply.subComments.push(newSubComment);
  }

  editComment(comment: Comment) {
    this.editModeCommentId = comment.id;
  }

  deleteComment(comment: Comment) {
  }
  addProduct(stock:stockItem){
    debugger;
    let  p:stockItem = {...stock }
    this.selproducts.push(p);
    this.calculateTotalCost();

  }
  increaseQuantity(p:stockItem) {
    debugger;
    p.quantity++;
  }

  decreaseQuantity(p:Product) {
    if (p.quantity> 0) {
      p.quantity--;
    }
  }
  calculateTotalCost(): void {
    debugger;
    this.totalCost = 0;
    // Loop through the selected products and add their costs to the total cost
    for (const product of this.selproducts) {
      this.totalCost += product.price;
    }
  }
  removeItem(p:stockItem){
    this.selproducts = this.selproducts.filter(x=>x.id !== p.id);
  }
  createOrder(){
    let Item: Items
    let cartitems: cartItem[] =[]
    cartitems =  this.selproducts.map((product) => {
      const item: cartItem = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        isCancelled: false,
        stockitemId:product.id
      };
      return item;
    });
    console.log('cartitems',cartitems);
    Item ={
      userId:this.auth.getUserID(),
      items: cartitems
    }
    console.log('cartitems',Item);
        this.cartservice.addcartItems(Item).subscribe({
      next: (response: any) => {
        console.log('response',response);
      },
      error: (error:any) => {
        console.log('error',error);
      },
    });
  }

  showorders(){
    this.showorder = true;

  }
  closeorders(){
    this.showorder = false;
  }
  removeOrders(order:stockItem){
  
    let cancelledIds =[];
    cancelledIds.push(order.id);
    let removeorder ={
      "itemIds":cancelledIds,
      "userId": this.auth.getUserID()
          };
          this.cartservice.cancelcartItems(removeorder).subscribe({
            next: (response: any) => {
              console.log('response',response);
            },
            error: (error:any) => {
              console.log('error',error);
            },
          });
    this.orderedItems =this.orderedItems.filter(x=>x.id !== order.id)

  }


}
