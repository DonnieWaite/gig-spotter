class CreateBookers < ActiveRecord::Migration[5.2]
  def change
    create_table :bookers do |t|
      t.string :organization_name, null: false
      t.string :booker_bio
      t.string :booker_image
    end
  end
end
