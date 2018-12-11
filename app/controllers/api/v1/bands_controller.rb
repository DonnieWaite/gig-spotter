class Api::V1::BandsController < ApplicationController

  before_action :set_band!, only: [:update, :show]
  before_action :authenticate_user_for_band!, only: [:update, :destroy]

  def index
    all_bands = Band.all

    user_response = nil

    if current_user
      user_response = current_user.attributes.merge({
        has_band: current_user.has_band?,
        has_booker: current_user.has_booker?
      })
    end

    render json: {
      bands: all_bands,
      user: user_response
    }
  end

  def show
    render json: {
      band: @band,
      concerts: @band.concerts,
      user: @band.user,
      current_user: current_user
    }
  end

  def create
    new_band = Band.create(
      band_params.merge({user: current_user})
    )
    render json: new_band
  end

  def update
    @band.update!(band_params)
    render json: {
      band: @band
    }
  end


def destroy
  @band = Band.find(params[:id])
  @band.destroy
end

  private

  def set_band!
    unless @band = Band.find_by(id: params[:id])
      head 404 and return
    end
  end

  def authenticate_user_for_band!
    if @band.id != current_user.band_id
      head 401 and return
    end
  end

  def band_params
    params.permit(:band_name, :bandcamp_url, :genre, :band_bio, :band_image)
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Authorized")
      redirect_to root_path
    end
  end
end
