class AddBandIdAndBookerIdToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :band_id, :bigint
    add_column :users, :booker_id, :bigint
  end
end
