require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    first_name { 'Donnie' }
    last_name { 'Waite' }
    birthday {Date.new(1995,2,3)}
  end

end
