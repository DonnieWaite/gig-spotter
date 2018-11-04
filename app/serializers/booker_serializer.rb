class BookerSerializer < ActiveModel::Serializer
  attributes :id, :organization_name, :booker_bio, :booker_image

  attribute :current_user, if: :show_page?

  def show_page?
    if(scope)
      return true
    end
    false
  end

  def current_user
    scope[:user]
  end
end
