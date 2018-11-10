class Api::V1::ConcertsController < ApplicationController
  def index
    all_concerts = Concert.all
    render json: all_concerts
  end

  def create
    new_concert_date_and_time = Date.parse(concert_params[:date]).to_datetime + Time.parse(concert_params[:time]).seconds_since_midnight.seconds

    new_concert = Concert.create(date_and_time: new_concert_date_and_time, location: concert_params[:location], description: concert_params[:description], title: concert_params[:title], booker_id: concert_params[:booker_id], user: current_user)

    concert_hash = new_concert.attributes
    concert_hash["date_and_time"] = new_concert.date_and_time.to_i

    new_listing = Listing.create(band_id: concert_params[:band_id], concert_id: new_concert.id)
    render json: {
      concert: concert_hash,
      listing: new_listing
    }
  end

  def show
    @concert = Concert.find(params[:id])
    render json: {
      concert: @concert,
      booker: @concert.booker,
      bands: @concert.bands,
      can_user_edit: @concert.can_user_edit?(current_user)
    }
  end

  def add_band
    # create a new listing with the band_id and concert_id from params!
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
end
