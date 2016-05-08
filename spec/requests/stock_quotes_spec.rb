require 'rails_helper'

# TODO: missing test for delete and update

describe 'StockQuote API' do

  let(:json) { JSON.parse(response.body) }

  let(:json_headers) do
    {"CONTENT_TYPE" => "application/json"}
  end

  let(:stock_quotes) do [
    StockQuote.new(
      trade_date: Date.parse('2016-01-20'),
      open_value: 1.1,
      close_value: 1.2,
      high_value: 1.4,
      low_value: 0.9,
      volume: 1000
    ),
    StockQuote.new(
      trade_date: Date.parse('2016-01-05'),
      open_value: 12.0,
      close_value: 11.5,
      high_value: 15.6,
      low_value: 8.3,
      volume: 5678
    )
  ]
  end

  let(:stock_quotes_json) {JSON.parse(ActiveModel::ArraySerializer.new(stock_quotes).to_json)}

  describe "GET stock_quotes" do

    it "returns ok response" do
      get '/stock_quotes'
      expect(response).to have_http_status(:ok)
    end

    it "returns a json content type" do
      get '/stock_quotes'
      expect(response.content_type).to eq "application/json"
    end

    it "returns an empty json if no records are defined" do
      get '/stock_quotes'
      expect(json['stock_quotes']).to be_empty
    end

    it "returns all the stock quotes" do
      stock_quotes.each &:save!;
      get '/stock_quotes'
      expect(json['stock_quotes']).to match_array(stock_quotes_json)
    end

    it "returns the stock quotes sorted by date ascending" do
      stock_quotes.each &:save!;
      sorted_stock_quotes_json = [stock_quotes_json[1], stock_quotes_json[0]];
      get '/stock_quotes'
      expect(json['stock_quotes']).to eq(sorted_stock_quotes_json)
    end
  end

  describe "GET stock_quote" do

    let(:stock_quote) {stock_quotes.first}

    it "returns ok response for existing records" do
      stock_quote.save!
      get "/stock_quotes/#{stock_quote.id}"
      expect(response).to have_http_status(:ok)
    end

    it "returns no_found response for non-existing records" do
      get "/stock_quotes/23"
      expect(response).to have_http_status(:not_found)
    end

    it "returns the requested stock quote data" do
      stock_quote.save!
      raw_json = StockQuoteSerializer.new(stock_quote).to_json
      get "/stock_quotes/#{stock_quote.id}"
      expect(response.body).to eq(raw_json)
    end

  end


  describe "POST stock_quotes" do
    # TODO: Test proper validation and errors

    let (:stock_quote_params) do {
      "stock_quote" => {
        "trade_date" => '2016-03-12',
        "open_value" => 12.0,
        "close_value" => 11.5,
        "high_value" => 15.6,
        "low_value" => 8.3,
        "volume" => 5678
        }
      }
    end

    it "returns the appropriate status" do
      post '/stock_quotes', stock_quote_params.to_json, json_headers
      expect(response).to have_http_status(:created)
    end

    it "creates the record in the DB" do
      post '/stock_quotes', stock_quote_params.to_json, json_headers
      new_record_hash = JSON.parse(StockQuoteSerializer.new(StockQuote.first).to_json)
      new_record_hash['stock_quote'].delete('id')
      expect(new_record_hash).to eq(stock_quote_params)
    end
  end

end
