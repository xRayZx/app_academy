class ChangePostTable < ActiveRecord::Migration
  def change
    change_column :posts, :sub_id, :integer, null: true
  end
end
