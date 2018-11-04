class Api::V1::BookersController < ApplicationController
  def index
    render json: Booker.all
  end

  def show
    booker = [Booker.find(params[:id])]
    render json: ActiveModel::Serializer::ArraySerializer.new(booker, { scope: {page: "show", user: current_user} })
  end

  def create
    new_booker = Booker.create(organization_name: booker_params[:organization_name], booker_bio: booker_params[:booker_bio], booker_image: booker_params[:booker_image], user: current_user)
    render json: new_booker
  end

  private

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
