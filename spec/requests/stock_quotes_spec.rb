require 'rails_helper'

# TODO: Test proper validation and errors

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

  let(:stock_quote) {stock_quotes.first}

  let(:stock_quotes_json) {JSON.parse(ActiveModel::ArraySerializer.new(stock_quotes).to_json)}

  describe "GET stock_quotes" do

    it "returns ok response" do
      get '/api/v1/stock_quotes'
      expect(response).to have_http_status(:ok)
    end

    it "returns a json content type" do
      get '/api/v1/stock_quotes'
      expect(response.content_type).to eq "application/json"
    end

    it "returns an empty json if no records are defined" do
      get '/api/v1/stock_quotes'
      expect(json['stock_quotes']).to be_empty
    end

    it "returns all the stock quotes" do
      stock_quotes.each &:save!;
      get '/api/v1/stock_quotes'
      expect(json['stock_quotes']).to match_array(stock_quotes_json)
    end

    it "returns the stock quotes sorted by date ascending" do
      stock_quotes.each &:save!;
      sorted_stock_quotes_json = [stock_quotes_json[1], stock_quotes_json[0]];
      get '/api/v1/stock_quotes'
      expect(json['stock_quotes']).to eq(sorted_stock_quotes_json)
    end
  end

  describe "GET stock_quote" do

    it "returns ok response for existing records" do
      stock_quote.save!
      get "/api/v1/stock_quotes/#{stock_quote.id}"
      expect(response).to have_http_status(:ok)
    end

    it "returns no_found response for non-existing records" do
      get "/api/v1/stock_quotes/23"
      expect(response).to have_http_status(:not_found)
    end

    it "returns the requested stock quote data" do
      stock_quote.save!
      raw_json = StockQuoteSerializer.new(stock_quote).to_json
      get "/api/v1/stock_quotes/#{stock_quote.id}"
      expect(response.body).to eq(raw_json)
    end

  end

  describe "POST stock_quotes" do

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
      post '/api/v1/stock_quotes', stock_quote_params.to_json, json_headers
      expect(response).to have_http_status(:created)
    end

    it "creates the record in the DB" do
      post '/api/v1/stock_quotes', stock_quote_params.to_json, json_headers
      new_record_hash = JSON.parse(StockQuoteSerializer.new(StockQuote.first).to_json)
      new_record_hash['stock_quote'].delete('id')
      expect(new_record_hash).to eq(stock_quote_params)
    end
  end

  describe "DELETE stock_quotes" do
    it "returns the appropriate status" do
      stock_quote.save!
      delete "/api/v1/stock_quotes/#{stock_quote.id}"
      expect(response).to have_http_status(:no_content)
    end

    it "returns no_found response for non-existing records" do
      delete "/api/v1/stock_quotes/23"
      expect(response).to have_http_status(:not_found)
    end

    it "deletes the record in the DB" do
      stock_quote.save!
      id = stock_quote.id
      delete "/api/v1/stock_quotes/#{id}"
      expect(StockQuote.all).to be_empty
    end
  end

  describe "PATCH stock_quotes" do

    let (:update_params) do {
      "stock_quote" => {
        "id" => 1,
        "open_value" => 13.0,
        "volume" => 1111
        }
      }
    end

    it "returns the appropriate status" do
      stock_quote.save!
      patch "/api/v1/stock_quotes/1", update_params.to_json, json_headers
      expect(response).to have_http_status(:no_content)
    end

    it "returns no_found response for non-existing records" do
      patch "/api/v1/stock_quotes/1", update_params.to_json, json_headers
      expect(response).to have_http_status(:not_found)
    end

    it "updates the record in the DB" do
      stock_quote.save!
      patch "/api/v1/stock_quotes/1", update_params.to_json, json_headers
      updated_quote = StockQuote.first
      expect(updated_quote.open_value).to eq(13.0)
      expect(updated_quote.close_value).to eq(1.2)
      expect(updated_quote.high_value).to eq(1.4)
      expect(updated_quote.low_value).to eq(0.9)
      expect(updated_quote.volume).to eq(1111)

    end
  end

end
