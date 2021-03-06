class SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      sign_in(user)
      render json: ["Success!"]
    else
      render json: ["Invalid username or password"]
    end
  end

  def destroy
    sign_out
    render json: ["Success!"]
  end
end
