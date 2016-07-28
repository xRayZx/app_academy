class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.references :article, foreign_key: true
      t.timestamps null: false
    end
  end
end
