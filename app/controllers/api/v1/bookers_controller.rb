class Api::V1::BookersController < ApplicationController
  def index
    render json: Booker.all
  end

  def show
    render json: Booker.find(params[:id])
  end
end
