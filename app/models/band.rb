class Band < ApplicationRecord
  has_one :user
  
  has_many :listings
  has_many :concerts, through: :listings
  has_many :bookers, through: :concerts

  validates :band_name, presence: true
end
