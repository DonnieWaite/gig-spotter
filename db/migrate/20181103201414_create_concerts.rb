class CreateConcerts < ActiveRecord::Migration[5.2]
  def change
    create_table :concerts do |t|
      t.datetime :date_and_time, null: false
      t.string :location, null: false
      t.string :description
      t.string :title
      t.belongs_to :booker, null: false
      t.belongs_to :band, null: false
    end
  end
end
