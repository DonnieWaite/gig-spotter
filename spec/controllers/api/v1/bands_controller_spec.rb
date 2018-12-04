require 'rails_helper'

RSpec.describe Api::V1::BandsController, type: :controller do
  describe 'a' do
    let!(:user) {User.create(first_name: "Richard", last_name: "Smith", email: "RSmith@gmail.com", password: "password123", password_confirmation: "password123", birthday: Date.new(1995,2,3))}

    before(:each) do
      allow(controller).to receive(:current_user).and_return(user)

      Band.create(band_name: "Very helpful!", band_bio: "Booking shows makes me happy", band_image: "https://www.ccreadingfarm.com/wp-content/uploads/doggy-day.jpg", bandcamp_url: "www.google.com")

    end

    describe "GET#index" do
      it "should return a list of all the bands" do
        get :index
        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"
        expect(returned_json.length).to eq 2
        expect(returned_json["bands"][0]["band_name"]).to eq "Very helpful!"
      end
    end


  end
end
