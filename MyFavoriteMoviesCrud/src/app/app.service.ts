import { Injectable } from '@angular/core';
import { Movie } from './Movie';
import { Http, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/map';

@Injectable()

export class AppService
{
	oneMovie: Movie;

	constructor(private http: Http)
	{}

	addMovie(title: string, genre: string)
	{
		this.oneMovie = new Movie(title, genre);
      	let URL = 'http://localhost:3000/postMovies';
    	let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: myHeaders });
        return this
        	.http
        	.post(URL, this.oneMovie)
        	.toPromise()
        	.then((response: any) => 
        	{});
	}

	deleteAMovie(id: string)
	{
      	let URL = 'http://localhost:3000/deleteAMovie/' + id;
    	let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: myHeaders });
        return this
        	.http
        	.delete(URL, id)
        	.toPromise()
        	.then((response: any) => 
        	{});
	}

	getAllMovies()
	{
		let url = 'http://localhost:3000/movies';
		let handleSuccess = (res:any) =>
		{
			return res.text();
		};
		return this
			.http
			.get(url)
			.toPromise()
			.then(handleSuccess)
			.catch((err)=> 
			{
				alert(err);
			});
	}

	getCategoriesFromDB()
	{
		let url = 'http://localhost:3000/categories';
		let handleSuccess = (res:any) =>
		{
			return res.text();
		};
		return this
			.http
			.get(url)
			.toPromise()
			.then(handleSuccess)
			.catch((err)=> 
			{
				alert(err);
			});
	}

}