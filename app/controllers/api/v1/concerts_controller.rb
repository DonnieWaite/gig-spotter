class Api::V1::ConcertsController < ApplicationController
  def index
    all_concerts = Concert.all
    render json: all_concerts
  end
end
