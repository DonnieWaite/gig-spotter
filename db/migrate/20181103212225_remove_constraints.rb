class RemoveConstraints < ActiveRecord::Migration[5.2]
  def change
    change_column_null :bands, :bandcamp_url, true
    change_column_null :bookers, :organization_name, true
    change_column_null :users, :first_name, true
    change_column_null :users, :last_name, true
  end
end
