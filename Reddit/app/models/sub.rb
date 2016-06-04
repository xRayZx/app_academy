class Sub < ActiveRecord::Base
  validates :title, :description, :moderator_id, presence: true
  belongs_to :moderator, foreign_key: :moderator_id, class_name: 'User'

  has_many :postsubs,
    class_name: 'PostSub',
    inverse_of: :sub

  has_many :posts,
    through: :postsubs,
    source: :post
end
