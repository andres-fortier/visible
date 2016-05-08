class CreateStockQuotes < ActiveRecord::Migration
  def change
    create_table :stock_quotes do |t|
      t.datetime :trade_date
      t.decimal :open_value,  :precision => 15, :scale => 10
      t.decimal :close_value, :precision => 15, :scale => 10
      t.decimal :high_value,  :precision => 15, :scale => 10
      t.decimal :low_value,   :precision => 15, :scale => 10
      t.integer :volume

      t.timestamps null: false
    end
  end
end
