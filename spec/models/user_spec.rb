require 'rails_helper'
require 'spec_helper'

RSpec.describe User, type: :model do
  describe "User model" do
    it { should have_valid(:first_name).when("Richard") }
    it { should_not have_valid(:first_name).when(nil, "") }

    it { should have_valid(:last_name).when("Smith") }
    it { should_not have_valid(:last_name).when(nil, "") }

    it { should have_valid(:email).when("richard@gmail.com") }
    it { should_not have_valid(:email).when("richard.com") }
    it { should_not have_valid(:email).when(nil, "") }

    it { should have_valid(:birthday).when(Date.new(1995,2,3)) }
    it { should_not have_valid(:birthday).when(nil, "") }

    it { should have_valid(:encrypted_password).when("Smith") }
    it { should_not have_valid(:encrypted_password).when(nil, "") }

  end
end
