require 'rails_helper'
require 'spec_helper'

RSpec.describe Booker, type: :model do
  describe "User model" do
    it { should have_valid(:organization_name).when("Richard") }
    it { should_not have_valid(:organization_name).when(nil, "") }

    it { should have_valid(:booker_bio).when ("We are a band") }
    it { should have_valid(:booker_bio).when(nil, "") }

    it { should have_valid(:booker_image).when ("We are a band") }
    it { should have_valid(:booker_image).when(nil, "") }

  end
end
