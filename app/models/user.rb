class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable

  mount_uploader :profile_photo, ProfilePhotoUploader

  belongs_to :booker, optional: true
  belongs_to :band, optional: true

  has_many :concerts

  validates :email, presence: true
  validates :encrypted_password, presence: true
  validates :birthday, presence: true
end
