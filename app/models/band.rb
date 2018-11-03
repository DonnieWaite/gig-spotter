class Band < ApplicationRecord
  has_many :listings
  has_many :concerts, through: :listings
  has_many :bookers, through: :concerts

  validates :band_name, presence: true
  validates :bandcamp_url, presence: true
  validates :genre, presence: true
end
