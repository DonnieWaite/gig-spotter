class Api::V1::BandsController < ApplicationController

  def index
    all_bands = Band.all
    render json: ActiveModel::Serializer::ArraySerializer.new(all_bands)
  end

  def show
    band = [Band.find(params[:id])]
    render json: ActiveModel::Serializer::ArraySerializer.new(band, { scope: {page: "show", user: current_user} })
  end

  def create
    new_band = Band.create(band_name: band_params[:band_name], bandcamp_url: band_params[:bandcamp_url], genre: band_params[:genre], band_bio: band_params[:band_bio], band_image: band_params[:band_image], user: current_user)
    render json: new_band
  end

  private

  def band_params
    params.permit(:band_name, :bandcamp_url, :genre, :band_bio, :band_image )
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Authorized")
      redirect_to root_path
    end
  end
end
