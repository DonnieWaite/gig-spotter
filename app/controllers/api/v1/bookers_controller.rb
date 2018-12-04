class Api::V1::BookersController < ApplicationController

  before_action :set_booker!, only: [:update, :show]
  before_action :authenticate_user_for_booker!, only: [:update]

  def index
    render json: Booker.all
  end

  def show
    @booker = Booker.find(params[:id])
    render json: {
      booker: @booker,
      concerts: @booker.concerts,
      user: @booker.user,
      current_user: current_user
    }
  end

  def create
    new_booker = Booker.create(organization_name: booker_params[:organization_name], booker_bio: booker_params[:booker_bio], booker_image: booker_params[:booker_image], user: current_user)
    render json: new_booker
  end

  def update
    @booker.update!(booker_params)
    render json: {
      booker: @booker
    }
  end

  private
  def set_booker!
    unless @booker = Booker.find_by(id: params[:id])
      head 404 and return
    end
  end

  def authenticate_user_for_booker!
    if @booker.id != current_user.booker_id
      head 401 and return
    end
  end

  def booker_params
    params.permit(:organization_name, :booker_bio, :booker_image )
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Authorized")
      redirect_to root_path
    end
  end
end
