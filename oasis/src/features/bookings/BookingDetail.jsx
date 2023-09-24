import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";

import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useDeleteBooking } from "./useDeleteBooking";




const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {

  const {checkout, isCheckingOut} = useCheckOut();
  const navigate = useNavigate();
  
  const { booking, isLoading} = useBooking();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();

  if(isLoading )  return <Spinner/>
  if(!booking) return <Empty resourceName="booking"/>

  const { status, id :bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
            <Button 
              onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
        )}

      
        {status === "checked-in" && (
           <Button icon={<HiArrowUpOnSquare />} 
            onClick={()=>checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete
            booking</Button>
          </Modal.Open>
          <Modal.Window name='delete'>
          <ConfirmDelete 
            resourceName='booking'
            disabled={isDeleting}
            onConfirm={() => {
              //  deleteBooking(bookingId);
              //  navigate('/bookings'); this is a way to do it simple 
              deleteBooking(bookingId, {
                onSettled: () => navigate('/booking') // onSettled will be executed when on error or successfull completion of delete operation
              });
            }} 
           />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
