import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);
  const {booking , isLoading} = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(()=> setConfirmPaid(booking?.isPaid ?? false), [booking]); // nullish coalescing operator.


  const moveBack = useMoveBack();
  const { checkin, isCheckinin} = useCheckIn();

  // const booking = {};

  if(isLoading || isLoadingSettings )  return <Spinner/>

  

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;
  
function handleCheckin() {

    if(!confirmPaid) return ;
    if(addBreakFast){
      checkin({bookingId, breakfast: {
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      }});
    }
    else checkin({bookingId, breakfast: {}});
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
          <Checkbox 
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
      </Box>}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckinin}
          onChange={()=> setConfirmPaid(confirm => !confirm)}
          id='confirm'
        >
          I confirm that {guests.fullName} has paid the total amount { !addBreakFast ? formatCurrency(totalPrice) : formatCurrency(totalPrice + optionalBreakfastPrice) }
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button 
          disabled={!confirmPaid || isCheckinin} 
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
