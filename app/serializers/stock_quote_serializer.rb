class StockQuoteSerializer < ActiveModel::Serializer
  attributes :id, :trade_date, :open_value, :close_value, :high_value, :low_value, :volume

  # We are converting big decimals to floats, otherwise they would be
  # sent as strings.

  def open_value
    object.open_value.to_f
  end

  def close_value
    object.close_value.to_f
  end

  def high_value
    object.high_value.to_f
  end

  def low_value
    object.low_value.to_f
  end

end
