class Api::V1::ConcertsController < ApplicationController
  def index
    all_concerts = Concert.all
    render json: all_concerts
  end

  def create
    binding.pry
    new_concert = Concert.create(date_and_time: concert_params[:date_and_time], location: concert_params[:location], description: concert_params[:description], title: concert_params[:title], booker_id: concert_params[:booker_id], user: current_user)

    new_listing = Listing.create(band_id: concert_params[:band_id], concert_id: concert_params[new_concert.id])
    render json: {
      concert: new_concert,
      listing: new_listing
    }
  end

  private

  def concert_params
    params.permit(:date, :time, :location, :description, :title, :band_id, :booker_id)
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Found")
      redirect_to root_path
    end
  end

  def current_user_access
    current_user.id == Concert.find(params[:id]).user_id
  end
end
