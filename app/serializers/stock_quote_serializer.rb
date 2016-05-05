class StockQuoteSerializer < ActiveModel::Serializer
  attributes :id, :trade_date, :open_value, :close_value, :high_value, :low_value, :volume
end
