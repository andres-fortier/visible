class StockQuote < ActiveRecord::Base
  validates :trade_date, :open_value, :close_value, :high_value, :low_value, :volume, presence: true
  validates :trade_date, uniqueness: true

end

