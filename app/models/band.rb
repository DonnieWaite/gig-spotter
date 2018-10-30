class Band < ApplicationRecord
  validates :band_name, presence: true
  validates :bandcamp_url, presence: true
  validates :genre, presence: true
end
