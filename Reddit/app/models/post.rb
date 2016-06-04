class Post < ActiveRecord::Base
  validates :title, :subs, :user_id, presence: true

  belongs_to :author,
    foreign_key: :user_id,
    class_name: 'User'

  belongs_to :sub

  has_many :postsubs,
    class_name: 'PostSub',
    inverse_of: :post

  has_many :subs,
    through: :postsubs,
    source: :sub

  has_many :comments

  has_many :child_comments,
    through: :comments,
    source: :child_comments

  has_many :votes, as: :votable
end
