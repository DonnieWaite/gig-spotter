# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



band_attributes = [
 {band_name: 'Palm', bandcamp_url: "https://palmnewyork.bandcamp.com/", genre: 'Experimental Rock', band_bio: "Experimental rock band from New York", band_image: "https://f4.bcbits.com/img/0012386298_10.jpg"},
 {band_name: 'Frankie Cosmos', bandcamp_url: 'hhttps://ingridsuperstar.bandcamp.com/', genre: 'indie rock', band_image: 'https://f4.bcbits.com/img/a1643878260_10.jpg'}
]
band_attributes.each do |attribute|
 Band.create(attribute)
end
