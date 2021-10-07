import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-keepnote',
  templateUrl: './keepnote.component.html',
  styleUrls: ['./keepnote.component.css']
})
export class KeepnoteComponent implements OnInit {
  gettitle: any;
  getdsicription: any;

  ids: any;

  constructor(private service: NoteService) { }
  public data: any;
  public datatrash: any;
  public notetext: any;
  public notetitle: any;
  public notetexttrash: any;
  public status: any;
  public textdelete: any;
  public   isLoggedIn: boolean = false;
  public   istrashIn: boolean = false;
  ngOnInit(): void {
    this.GetItems();
    this.GetItemsFromTrash();
  }
  GetItems() {
    this.service.GetItems().subscribe(data1 => {
      this.data = data1;
      console.log(data1);
    });
  }
  GetItemsFromTrash() {
    this.service.GetItemsFromTrash().subscribe(data1 => {
      this.datatrash = data1;
      console.log(data1);
    });
  }
  AddNoteText() {
    let list = {
      notetext: this.notetext,
      notetitle: this.notetitle
    }
    this.service.addStudent(list).subscribe(data => {
      this.GetItems();
      console.log('added');
    })
  }
  AddNoteToTrash(item: any) {
    let list = {
      // notetexttrash: this.notetexttrash
      notetext: item.notetext,
      notetitle: item.notetitle
    }
    this.service.addtotrash(list).subscribe(data => {
      this.GetItems();
      this.GetItemsFromTrash();
      this.GetItems();
      console.log('added to trash');
    })
  }
  delDataAftteraddingTrash(item: any) {
    this.service.deletedatanotes(item.id).subscribe(data => {
      this.GetItems();
      this.GetItemsFromTrash();
      this.GetItems();
      console.log('deleted after adding');
    })
  }
 
//  updatedata(text:any){
//    let data={
//      notetitle:this.notetitle,
//      notedata:this.notetext
//    }
//    this.service.updatenotes(text.id,text).subscribe(data=>{
//      this.GetItems();    
//    })
//  }
//  edittext(text:any){
//    this.notetitle=text.notetitle;
//    this.notetext=text.notetext; 
//  }
public a:any='';
 EditNotesListt(item:any){
  this.notetitle=item.notetitle
  this.notetext=item.notetext
  this.isLoggedIn = true;
  this.ids=item.id
  this.a=item; 
}

UpdateNotesList(item:any){
  item.notetitle=this.notetitle
  item.notetext=this.notetext
  this.service.updatenotes(item.id, item).subscribe(data => {
    this.isLoggedIn = false;
  });
  
}
SendItemsFromTrash(item:any){
  let a={
 
 name:item.name,
 phonenum:item.phonenum,
  emailid:item.emailid}
 this.isLoggedIn = true;
 this.ids=item.id
 this.a=item; 
 // this.service.restore(item.id,item).subscribe(data => {
 //   this.isLoggedIn = false;
 //   this.GetItems();
 //   this.GetItemsFromTrash();
 //   this.GetItems();
 // });
 this.service.deletefromtrash(item.id).subscribe(data => {
 //  this.isLoggedIn = false;
   this.GetItems();
   this.GetItemsFromTrash();
   this.GetItems();
 });
 this.service.addStudent(a).subscribe(data => {
   this.isLoggedIn = false;
   this.GetItems();
   this.GetItemsFromTrash();
   this.GetItems();
 });

} 
}

