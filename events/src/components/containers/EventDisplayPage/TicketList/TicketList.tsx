import { TicketJson } from '@api/types/tickets';
import { FunctionComponent } from 'react';

import { StockDetails } from '~/components/common/AppPage';
import { currencyFormatter } from '~/config/locale';
import { titleCase } from '~/utils/string';

import { PriceAndStockDetails, TicketListItem, TicketListRoot } from './TicketList.styled';

interface Props {
  tickets: TicketJson[];
}

export const TicketList: FunctionComponent<Props> = ({ tickets }) => (
  <TicketListRoot>
    {tickets.map(({ _id, name, type, price, bookingFee, inStock }) => (
      <TicketListItem key={_id}>
        <div>
          <h4>{name}</h4>
          <p>Type: {titleCase(type)}</p>
        </div>
        <PriceAndStockDetails>
          <p>Price: {currencyFormatter.format(price)}</p>
          <p>Booking fee: {currencyFormatter.format(bookingFee)}</p>
          <StockDetails $inStock={inStock}>{inStock ? 'In stock' : 'SOLD OUT'}</StockDetails>
        </PriceAndStockDetails>
      </TicketListItem>
    ))}
  </TicketListRoot>
);
