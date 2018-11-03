class CreateListings < ActiveRecord::Migration[5.2]
  def change
    create_table :listings do |t|
      t.belongs_to :band, null: false
      t.belongs_to :concert, null: false
    end
    remove_column :concerts, :band_id, :integer
  end
end
