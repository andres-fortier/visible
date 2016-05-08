require 'rails_helper'

describe StockQuote do
  describe 'validations' do
    it { should validate_presence_of(:trade_date) }
    it { should validate_presence_of(:open_value) }
    it { should validate_presence_of(:close_value) }
    it { should validate_presence_of(:high_value) }
    it { should validate_presence_of(:low_value) }
    it { should validate_presence_of(:volume) }

    it { should validate_uniqueness_of(:trade_date) }

  end
end
