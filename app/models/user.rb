class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable

  mount_uploader :profile_photo, ProfilePhotoUploader

  validates :email, presence: true
  validates :encrypted_password, presence: true
  validates :birthday, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

end
