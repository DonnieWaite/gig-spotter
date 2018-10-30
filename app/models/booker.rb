class Booker < ApplicationRecord
  validates :organization_name, presence: true
end
