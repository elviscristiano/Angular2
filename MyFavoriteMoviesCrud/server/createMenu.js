//create collection categories (of movies)
db.categories.save({"name":"scifi"})
db.myMovies.save({"title":"AI", "genre":"scifi"})

//check if the collection has been created
db.categories.find()
