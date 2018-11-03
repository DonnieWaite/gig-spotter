class Api::V1::BandsController < ApplicationController

  def index
    all_bands = Band.all
    render json: ActiveModel::Serializer::ArraySerializer.new(all_bands)
  end

  def show
    band = [Band.find(params[:id])]
    render json: ActiveModel::Serializer::ArraySerializer.new(band, { scope: {page: "show", user: current_user} })
  end

end
