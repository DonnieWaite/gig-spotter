class BandSerializer < ActiveModel::Serializer
  attributes :id, :band_name, :bandcamp_url, :band_bio, :genre, :band_image

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
