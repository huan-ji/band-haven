class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render json: ["Success!"]
    else
      render json: @user.errors.full_messages
    end
  end

  def show
    render json: current_user
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :artist)
  end
end
