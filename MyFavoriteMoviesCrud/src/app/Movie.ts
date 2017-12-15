export class Movie
{
	title: string;
	genre: string;

	constructor(title: string, genre: string)
	{
		this.title = title;
		this.genre = genre;
	}

	getTitle()
	{
		return this.title;
	}

	setTitle(newTitle: string)
	{
		this.title = newTitle;
	}

	getGenre()
	{
		return this.genre;
	}

	setGenre(newGenre: string)
	{
		this.genre = newGenre;
	}
}