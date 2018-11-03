class Booker < ApplicationRecord
  has_many :concerts

  validates :organization_name, presence: true
end
