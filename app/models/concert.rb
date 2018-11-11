class Concert < ApplicationRecord
  belongs_to :booker
  belongs_to :user
  has_many :listings
  has_many :bands, through: :listings

  validates :date_and_time, presence: true
  validates :location, presence: true

  def can_user_edit?(user)
    return false if user.nil?

    band_user_ids = self.bands.map do |band|
      User.find_by(band_id: band.id).id
    end

    user.id == self.user_id ||
    user.booker_id == self.booker_id ||
    band_user_ids.include?(user.id)
  end
end
