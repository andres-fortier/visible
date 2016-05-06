class StockQuotesController < ApplicationController
  before_action :set_stock_quote, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :show_not_found_errors

  def index
    render json: StockQuote.all.order('trade_date ASC')
  end

  def show
    render json: @stock_quote
  end

  def create
    @stock_quote = StockQuote.new(stock_quote_params)

    if @stock_quote.save
      render json: @stock_quote, status: :created, location: @stock_quote
    else
      render json: @stock_quote.errors, status: :unprocessable_entity
    end
  end

  def update
    if @stock_quote.update(stock_quote_params)
      head :no_content
    else
      render json: @stock_quote.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @stock_quote.destroy
    head :no_content
  end

  private

    def set_stock_quote
      @stock_quote = StockQuote.find(params[:id])
    end

    def stock_quote_params
      params.require(:stock_quote).permit(:trade_date, :open_value, :close_value, :high_value, :low_value, :volume)
    end

    def show_not_found_errors(exception)
      render json: {error: "Stock not found"}, status: :not_found
    end

end
