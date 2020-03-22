import { Component, HostListener } from '@angular/core';
import { MarvelService } from 'src/app/services/marvel.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import swal from 'sweetalert';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public marvelService: MarvelService
              ) { }
  hero: string = null;
  listHeros: any[] = [];
  listFavourites: any[] = [];
  listComics: any[] = [];
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  selectedHero :any;
  selectedComic : any;
  displayDialog : boolean;
  displayFavourites : boolean;
  diplayHeros : boolean;
  diplayComics : boolean;
  comicPrice : number;
  diplayFavourites : boolean;
  comic :any;
  public innerWidth: any;
  public loading = false;
  public addedFavourites: boolean = false;
 
  ngOnInit() {
    this.loading = true;
    this.displayDialog = false;
    this.displayFavourites = false;
    this.sortOptions = [
      { label: 'Date', value: 'modified' },
      { label: 'Name', value: 'name' }
    ]
    this.listFavourites = JSON.parse(localStorage.getItem("listFavourites")) == null ? [] :JSON.parse(localStorage.getItem("listFavourites"));
    this.innerWidth = window.innerWidth;
    this.loading = false;
    this.SearchHeros(this.GetRandomLetter());
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  SearchHeros(caracter?) {
    if(this.hero != null || caracter != null){
      this.loading = true;
      this.marvelService.GetHeros(caracter == null? this.hero.trim(): caracter).subscribe(
        rta => {                
          this.listHeros = rta.data.results;  
          this.diplayHeros = true;
          this.diplayComics = false;
          this.loading = false;
          if(this.listHeros.length <= 0){
            swal("No Results", "records not found", "warning");
          }                
        },
        error => {
          this.loading = false;
        }
      );
    }
    else{
      swal("Error", "Enter character", "error");
    }    
  }
  SelectHero(event, hero) {
    this.loading = true;
    this.selectedHero = hero;
    this.diplayHeros = false;    
    this.listComics = hero.comics.items;    
    this.diplayComics = true;    
    window.scrollTo(0, 0);
    event.preventDefault();
    this.loading = false;
  }
  SelectComic(event, comic){
    this.loading = true;
    this.displayDialog = true;    
    
    this.marvelService.GetResource(comic.resourceURI).subscribe(
      rta => {             
        this.selectedComic = rta.data.results[0];
        this.comicPrice = this.selectedComic.prices[0] == null? 0 :this.selectedComic.prices[0].price; 
        this.loading = false;       
        if (this.listFavourites.some(x => x.id == this.selectedComic.id)) {
          this.addedFavourites = true;
        }
        else{
          this.addedFavourites = false;
        }
      },
      error => {
        this.loading = false;
      }
    )    
    window.scrollTo(0, 0);
    event.preventDefault();
  }
  onSortChange(event) {
    this.loading = true;
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
    this.loading = false;
  }
  AddFavourites(comic){    
    if(!this.listFavourites.some(x => x.id == comic.id)){
      this.listFavourites.push(comic);          
      this.diplayFavourites = true;
      swal("Message", "Is already in favorites", "success");      
    }            
    else{
      swal("Message", "Is already in favorites", "warning");
    }        
    this.displayDialog = false;  
    localStorage.setItem("listFavourites", JSON.stringify(this.listFavourites));      
  }
  AddRandomFavourites(){
  
    let tries: number = 0;
    let decrement: boolean = false;;    
    for(let i = this.listFavourites.length + 1; i <= 3; i++) {
      debugger;
      let indexHeroRandom = Math.floor(Math.random() * this.listHeros.length) + 0;      
      if (this.listHeros[indexHeroRandom].comics.items.length > 0) {
        let indexRandom = Math.floor(Math.random() * this.listHeros[indexHeroRandom].comics.items.length) + 0;        
        this.loading = true;
        this.marvelService.GetResource(this.listHeros[indexHeroRandom].comics.items[indexRandom].resourceURI).subscribe(
          rta => {
            if (!this.listFavourites.some(x => x.id == rta.data.results[0].id)) {
              this.listFavourites.push(rta.data.results[0]);
              localStorage.setItem("listFavourites", JSON.stringify(this.listFavourites));              
              tries = 0;
              decrement = false;
            }
            else if (tries > 20){
              i = 4;              
            }
            else{       
              if(!decrement){
                --i;
                decrement = true;
              }                   
              tries++;              
            }
            this.loading = false;
          }
        );        
      }
      else if (tries > 10){
        i = 4;
      }
      else{ 
        if(!decrement){
          --i;
          decrement = true;
        }         
        tries++;      
      }
    }        
  }
  DeleteComic(index){
    if(index > -1) {
      this.listFavourites.splice(index, 1);
    }    
    localStorage.setItem("listFavourites", JSON.stringify(this.listFavourites));
  }
  GoBack(){
    this.diplayComics = false; 
    this.diplayHeros = true;  
  }  
  keyDownFunction(event){
    if(event.keyCode == 13) {
      this.SearchHeros();
    }
  }
  pageChanged(event){
    console.log(event)
    
  }
  CloseDialog(){
    this.displayDialog = false;
  }
  GetRandomLetter() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";  
    for (var i = 0; i < 1; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));  
    return text;
  }  
}


