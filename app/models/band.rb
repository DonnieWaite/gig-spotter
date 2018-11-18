class Band < ApplicationRecord
  has_one :user

  has_many :listings
  has_many :concerts, through: :listings
  has_many :bookers, through: :concerts

  validates :band_name, presence: true

  def can_user_edit?(user)
    return false if user.nil?

    band_user_ids = self.bands.map do |band|
      User.find_by(band_id: band.id).id
    end
    user.id == self.user_id ||
    band_user_ids.include?(user.id)
  end
end
