class Concert < ApplicationRecord
  belongs_to :booker
  belongs_to :band

  validates :date_and_time, presence: true
  validates :location, presence: true
end
