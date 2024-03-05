import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { InitTableDataType, ItemQuotesRequestType } from '@/api/quotes/type';

class QuotesMob {
  data: InitTableDataType = {
    quotesA: [],
    quotesB: [],
  };
  constructor() {
    makeAutoObservable(this);
  }

  fetchTableData = async () => {
    const response = await axios.get(
      'https://futures-api.poloniex.com/api/v2/tickers'
    );
    const tableData = response.data.data.map((el: ItemQuotesRequestType) => {
      return {
        symbol: el?.symbol,
        size: el?.size,
        tradeId: el?.tradeId,
        sequence: el?.sequence,
        price: el?.price,
        side: el?.side,
      };
    });

    const middleIndex = Math.floor(tableData.length / 2);
    const quotesA = tableData.slice(0, middleIndex);
    const quotesB = tableData.slice(middleIndex, tableData.length);
    this.data = {
      quotesA,
      quotesB,
    };
  };

  get tableData() {
    return this.data;
  }
}

export default new QuotesMob();
