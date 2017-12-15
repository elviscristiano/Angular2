import { Component } from '@angular/core';
import { AppService} from './app.service';
import 'rxjs/add/operator/toPromise';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
  })

export class AppComponent 
{
  	title: string;
  	allMovies: any;
  	allMoviesTitles: any;
  	insertMovie: any;

  	constructor(private _appService: AppService)
  	{
  		this.title = "My favorite movies";
  		this.allMoviesTitles = [];
  	}

  	getAllMovies()
  	{
    	this._appService
            .getAllMovies()
            .then((moviesFromDB)=>
            {
                this.allMovies = JSON.parse(moviesFromDB);
                 for (let i = 0; i < this.allMovies.length; i++)
                 {
                 	this.allMoviesTitles.push(this.allMovies[i].title);
                 }
            })
            .catch((err)=> 
            {
                alert(err);
            }); 
    }

    ngOnInit(): void 
    { 
        this.getAllMovies();
    };

  	addMovie(movieTit: string, movieGen: string)
  	{
  		this._appService.addMovie(movieTit, movieGen);
  	}

    deleteAMovie(id: string)
    {
      	this._appService.deleteAMovie(id);
    }

}
