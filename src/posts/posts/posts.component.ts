import { Component , OnInit} from '@angular/core';
import { DataService } from '../../services/service';
import { Posts } from '../../app/Models/posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  public posts: Posts[] = [];
  isLoading:boolean = false;

  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.isLoading =true;
    this.dataService.getData('posts')
    .subscribe(data => {
      this.posts = data;
      this.isLoading = false;
      console.log(data); // Do something with the fetched data
    }, error => {
      console.error(error); // Handle error if any
    });
  }
    }


