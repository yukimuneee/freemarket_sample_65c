class Users::RegistrationsController < Devise::RegistrationsController
  before_action :redirect_to_index_from_sms,only: :sms_authentication

  def index
  end

  def new
    @user = User.new
  end

  def create
    session[:nickname] = user_params[:nickname]
    session[:email] = user_params[:email]
    session[:password] = user_params[:password] 
    session[:name_family] = user_params[:name_family]
    session[:name_last] = user_params[:name_last]
    session[:name_kana_f] = user_params[:name_kana_f]
    session[:name_kana_l] = user_params[:name_kana_l]
    session[:birth_y] = user_params[:birth_y]
    session[:birth_m] = user_params[:birth_m]
    session[:birth_d] = user_params[:birth_d]
    binding.pry
    #バリデーション判定用にuserをnewします
    @user = User.new(
      nickname: session[:nickname],
      email: session[:email],
      password: session[:password],
      name_family: session[:name_family],
      name_last: session[:name_last],
      name_kana_f: session[:name_kana_f],
      name_kana_l: session[:name_kana_l],
      birth_y: session[:birth_y],
      birth_m: session[:birth_m],
      birth_d: session[:birth_d]
    )
    check_user_valid = @user.valid?
    unless check_user_valid
      render 'registrations/new.html.haml' 
    else
      # 問題がなければsession[:through_first_valid]を宣言して次のページへリダイレクト
      session[:through_first_valid] = "through_first_valid"
      redirect_to "cellphones"
    end
  end

  def new_cellphone
    @user = User.new
  end

  def create_cellphone
    
  end

  def new_address
    @user = User.new
  end

  def create_address
    
  end

  def new_credit_cards
    @user = User.new
  end

  def create_credit_cards
    
  end

  private
   
  def user_params
    params.require(:user).permit(:nickname, :email, :password, :name_family, :name_last, :name_kana_f, :name_kana_l, :birth_y, :birth_m, :birth_d)
  end

  def profile_params
    params.require(:address).permit()
  end

   # 前のpostアクションで定義されたsessionがなかった場合登録ページトップへリダイレクト
  def redirect_to_index_from_sms
    redirect_to signup_index_path unless session[:through_first_valid].present? && session[:through_first_valid] == "through_first_valid"
  end
end
