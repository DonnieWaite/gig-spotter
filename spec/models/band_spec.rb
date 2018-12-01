require 'rails_helper'
require 'spec_helper'

RSpec.describe Band, type: :model do
  describe "Band model" do
    it { should have_valid(:band_name).when("Richard") }
    it { should_not have_valid(:band_name).when(nil, "") }

    it { should have_valid(:bandcamp_url).when("Richard") }
    it { should have_valid(:bandcamp_url).when(nil, "") }

    it { should have_valid(:genre).when("Richard") }
    it { should have_valid(:genre).when(nil, "") }

    it { should have_valid(:band_bio).when ("We are a band") }
    it { should have_valid(:band_bio).when(nil, "") }

    it { should have_valid(:band_image).when ("We are a band") }
    it { should have_valid(:band_image).when(nil, "") }

  end
end
