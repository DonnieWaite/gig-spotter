class Booker < ApplicationRecord
  has_one :user

  has_many :concerts
  has_many :listings, through: :concerts
  has_many :bands, through: :listings

  validates :organization_name, presence: true
end
