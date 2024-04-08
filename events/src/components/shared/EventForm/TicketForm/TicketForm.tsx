import { TicketInput } from '@api/types/tickets';
import { TicketType } from '@common/types/tickets';
import { FunctionComponent } from 'react';

import { Button } from '~/components/common/Button';
import { Field, Input, Select, SelectOption } from '~/components/common/Form';
import { useFormState } from '~/hooks/useFormState';
import { numberInputValue, priceString, titleCase } from '~/utils/string';

import { FormFields } from '../EventForm.styled';

import { ButtonsContainer, TicketFormRoot } from './TicketForm.styled';

interface Props {
  currentTicket?: TicketInput;
  onCancel(): void;
  onConfirm(ticketInput: TicketInput): void;
}

const typeOptions: SelectOption[] = Object.values(TicketType).map((value) => ({
  value,
  label: titleCase(value),
}));

export const TicketForm: FunctionComponent<Props> = ({ currentTicket, onCancel, onConfirm }) => {
  const { data: ticketData, updateField } = useFormState<TicketInput>(
    currentTicket || {
      name: '',
      type: TicketType.Adult,
      price: 0,
      bookingFee: 0,
      inStock: false,
    },
  );

  const canConfirm =
    ticketData.name.length > 3 &&
    !Number.isNaN(ticketData.price) &&
    !Number.isNaN(ticketData.bookingFee);

  const handleConfirm = () => canConfirm && onConfirm(ticketData);

  return (
    <TicketFormRoot>
      <FormFields>
        <Field label="Ticket name" labelFor="ticketName">
          <Input
            id="ticketName"
            type="text"
            value={ticketData.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </Field>
        <Field label="Type" labelFor="type">
          <Select
            id="type"
            options={typeOptions}
            value={ticketData.type}
            onChange={(event) => updateField('type', event.target.value as TicketType)}
          />
        </Field>
        <Field label="Price (£)" labelFor="price">
          <Input
            id="price"
            type="number"
            value={numberInputValue(ticketData.price)}
            onChange={(event) => updateField('price', +priceString(event.target.value))}
          />
        </Field>
        <Field label="Booking fee (£)" labelFor="bookingFee">
          <Input
            id="bookingFee"
            type="number"
            value={numberInputValue(ticketData.bookingFee)}
            onChange={(event) => updateField('bookingFee', +priceString(event.target.value))}
          />
        </Field>
        <Field label="In stock" labelFor="inStock">
          <Input
            id="inStock"
            type="checkbox"
            checked={ticketData.inStock}
            onChange={(event) => updateField('inStock', event.target.checked)}
          />
        </Field>
      </FormFields>
      <ButtonsContainer>
        <Button aria-label="Cancel ticket" $secondary onClick={onCancel}>
          ❌
        </Button>
        <Button
          aria-label="Confirm ticket"
          $secondary
          disabled={!canConfirm}
          onClick={handleConfirm}
        >
          ✔️
        </Button>
      </ButtonsContainer>
    </TicketFormRoot>
  );
};
