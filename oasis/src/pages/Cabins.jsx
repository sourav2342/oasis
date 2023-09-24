import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {

  
  // useEffect(function(){
  //   getCabins().then(data => console.log(data));
  // },[])

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperations />
      {/* <img src="https://barwtzwekcsurjbeplef.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" alt="" /> */}
    </Row>

    <Row type="vertical">
      <CabinTable />
      <AddCabin/>
    </Row>
    </>
  );
}

export default Cabins;
