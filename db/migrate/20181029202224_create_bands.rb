class CreateBands < ActiveRecord::Migration[5.2]
  def change
    create_table :bands do |t|
      t.string :band_name, null: false
      t.string :bandcamp_url, null: false
      t.string :genre, default: "N/A"
      t.string :band_bio
      t.string :band_image
    end
  end
end
