class Booker < ApplicationRecord
  has_many :concerts
  has_many :listings, through: :concerts
  has_many :bands, through: :listings

  validates :organization_name, presence: true
end
