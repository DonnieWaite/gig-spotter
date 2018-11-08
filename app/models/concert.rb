class Concert < ApplicationRecord
  belongs_to :booker
  belongs_to :user
  has_many :listings
  has_many :bands, through: :listings

  validates :date_and_time, presence: true
  validates :location, presence: true
end
