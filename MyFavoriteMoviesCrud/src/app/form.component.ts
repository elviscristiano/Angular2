import { Component } from '@angular/core';
import { Movie } from './Movie';
import { AppService} from './app.service';

@Component({
  	selector: 'form-component',
  	templateUrl: './form.component.html',
  	styleUrls: ['./app.component.css']
})

export class FormComponent
{
  	allCategories: any;
  	allCategoriesNames: any;


    constructor(private _appService: AppService)
    {
   		this.allCategoriesNames = [];

    }

    getCategoriesFromDB()
    {
    	this._appService
            .getCategoriesFromDB()
            .then((catFromDB)=>
            {
                this.allCategories = JSON.parse(catFromDB);
                 for (let i = 0; i < this.allCategories.length; i++)
                 {
                 	this.allCategoriesNames.push(this.allCategories[i].name);
                 }
            })
            .catch((err)=> 
            {
                alert(err);
            }); 
    }

    ngOnInit(): void 
    { 
        this.getCategoriesFromDB();
    };

    onSubmit(form: any):void 
    {  
        this._appService.addMovie(form.inputMovieTitle, form.inputMovieGenre);
    }

}

