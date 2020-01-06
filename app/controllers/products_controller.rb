class ProductsController < ApplicationController
  def index
    @products = Product.all.includes(:product_images)
  end

  def new
    @product = Product.new
    @product.product_images.new
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to root_path
    else
      render :new
    end
  end
  
  
  def show
    @product = Product.find(params[:id])
  end

  def edit
    @product = Product.find(params[:id])
    @product.product_images.find(params[:id])
  end

  def update

  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
    redirect_to(root_path)
  end

  def user_credit
  end

  def user_profile_information
  end

  def user_profile_edit
  end

  def user_logout
  end

  def user_page
    
  end

  def guide
    
  end

  def p_transaction
    @products = Product.all.includes(:product_images)
    @products = Product.where("buyer_id is NULL && saler_id is not NULL && auction_id is not NULL")
  end

  def like
  end

  def exhibiting
  end

  def transaction
  end

  def sale
  end

  def p_exhibiting
    @products = Product.all.includes(:saler,:buyer,:auction,:product_images) 
    @products = Product.where("buyer_id is NULL && saler_id is not NULL && auction_id is NULL") 
  end

  def purchase_transaction
  end

  def p_soldout
    @products = Product.all.includes(:saler,:buyer,:auction)
    @products = Product.where("buyer_id is not NULL && saler_id is not NULL && auction_id is NULL")
  end

  def evaluation
  end

  def contact
  end

  def buy_confirm
    @product = Product.find(params[:id])
  end

  private

  def prefecture_params
    params.require(:product).permit(:prefecture)
  end

  def product_params
    params.require(:product).permit(:name,:description,:category,:condition,:charge,:prefecture_id,:day,:price,:fee,:profit, product_images_attributes: [:image, :_destroy]).merge(saler_id: current_user.id)
  end
end
