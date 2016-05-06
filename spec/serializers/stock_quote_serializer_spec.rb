require 'rails_helper'

describe StockQuoteSerializer do

  let(:stock_quote) do
    StockQuote.new(
      trade_date: Date.parse('2016-01-20'),
      open_value: 1.1,
      close_value: 1.2,
      high_value: 1.4,
      low_value: 0.9,
      volume: 1000
    )
  end

  let(:stock_quote_json) {JSON.parse(StockQuoteSerializer.new(stock_quote).to_json)['stock_quote']}

  it "only exports the required keys" do
    expected_keys = ['id', 'trade_date', 'open_value', 'close_value', 'high_value', 'low_value', 'volume']
    expect(stock_quote_json.keys).to match_array(expected_keys)
  end

  it "exports volume as an integer" do
    expect(stock_quote_json['volume']).to eq(1000)
  end

  it "exports stock quotes values as floats" do
    expect(stock_quote_json['open_value']).to eq(1.1)
    expect(stock_quote_json['close_value']).to eq(1.2)
    expect(stock_quote_json['high_value']).to eq(1.4)
    expect(stock_quote_json['low_value']).to eq(0.9)
  end

  it "exports trade date as valid json date" do
    expect(stock_quote_json['trade_date']).to eq("2016-01-20")
  end

end
