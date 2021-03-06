class Product < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :user
  belongs_to_active_hash :prefecture
  belongs_to :saler, class_name: "User", optional: true,foreign_key: "saler_id"
  belongs_to :buyer, class_name: "User", optional: true,foreign_key: "buyer_id"
  belongs_to :auction, class_name: "User", optional: true,foreign_key: "auction_id"
  has_many :product_images, dependent: :destroy
  accepts_nested_attributes_for :product_images, allow_destroy: true
  attribute :category, ActiveRecord::Type::Integer.new
  enum category:{
    "------":0,
    レディース:1,メンズ:2,'ベビー•キッズ':3,'インテリア•住まい•小物':4,'本•音楽•ゲーム':5,'おもちゃ•ホビー•グッズ':6,
    'コスメ•香水•美容':7,'家電•スマホ•カメラ':8,'スポーツ•レジャー':9,ハンドメイド:10,チケット:11,'自転車•オートバイ':12,
    その他:13,カテゴリ一覧:14
  }
  def self.search(search)
    if search
      Product.where('name LIKE(?)', "%#{search}%")
    else
      Product.all
    end
  end

  validates_associated :product_images
  validates :name, presence: true
  validates :description, presence: true
  validates :category, exclusion: { in: ['------'] }
  validates :condition,:charge,:prefecture_id,:day,exclusion: { in: ['---'] }
  validates :prefecture_id,exclusion: { in: ['0'] }
  validates :price, presence: true
  validates :product_images, presence: true
end