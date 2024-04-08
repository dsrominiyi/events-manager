import { TicketInput } from '@api/types/tickets';
import { FunctionComponent } from 'react';

import { StockDetails } from '~/components/common/AppPage';
import { Button } from '~/components/common/Button';
import { currencyFormatter } from '~/config/locale';
import { titleCase } from '~/utils/string';

import { ButtonsContainer, TicketDetailsRoot, TicketInfo } from './TicketDetails.styled';

interface Props {
  ticket: TicketInput;
  changeDisabled?: boolean;
  onClickEdit(): void;
  onClickDelete(): void;
}

export const TicketDetails: FunctionComponent<Props> = ({
  ticket: { name, type, price, bookingFee, inStock },
  changeDisabled,
  onClickEdit,
  onClickDelete,
}) => (
  <TicketDetailsRoot data-testid="ticket-details">
    <ButtonsContainer>
      <Button aria-label="Edit ticket" $secondary disabled={changeDisabled} onClick={onClickEdit}>
        ✏️
      </Button>
      <Button
        aria-label="Delete ticket"
        $secondary
        disabled={changeDisabled}
        onClick={onClickDelete}
      >
        ❌
      </Button>
    </ButtonsContainer>
    <TicketInfo>
      <div>
        <h4>{name}</h4>
        <p>Type: {titleCase(type)}</p>
      </div>
      <div>
        <p>Price: {currencyFormatter.format(price)}</p>
        <p>Booking fee: {currencyFormatter.format(bookingFee)}</p>
        <StockDetails $inStock={inStock}>{inStock ? 'In stock' : 'SOLD OUT'}</StockDetails>
      </div>
    </TicketInfo>
  </TicketDetailsRoot>
);
