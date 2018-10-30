# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_attributes = [
 {email: 'Donnie@gmail.com', birthday: Date.new(1995,2,3), first_name: "Donnie", last_name: "Waite", password: 'godsdogs', password_confirmation: 'godsdogs'},
 {email: 'Kentaro@gmail.com', birthday: Date.new(1975,5,7), first_name: "Kentaro", last_name: "Kaneki", password: 'godsdogs', password_confirmation: 'godsdogs'}
]
user_attributes.each do |attribute|
 User.create(attribute)
end

band_attributes = [
 {band_name: 'Stumpf', bandcamp_url: "https://stumpf.bandcamp.com/releases", genre: 'rock', band_bio: "Experimental rock band from Allston MA", band_image: "https://f4.bcbits.com/img/a1146596764_10.jpg"},
 {band_name: 'Fat History Month', bandcamp_url: 'https://fathistorymonth.bandcamp.com/album/bad-history-month', genre: 'indie rock', band_image: 'https://f4.bcbits.com/img/a0221678966_16.jpg'}
]
band_attributes.each do |attribute|
 Band.create(attribute)
end
