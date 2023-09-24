import {BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./DarkModeContext";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    }
});

function App() {
  return (
    <DarkModeProvider>
    <QueryClientProvider client={queryClient}>

      <ReactQueryDevtools initialIsOpen={false} />
         {/* react dev tools */}
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route element={
            <ProtectedRoute>
               <AppLayout/>
            </ProtectedRoute>}>
          <Route index element={<Navigate replace to="dashboard"/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:bookingId" element={<Booking />} />
          <Route path="checkin/:bookingId" element={<Checkin />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
        </Route>
       <Route path="login" element={<Login />} />
       <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    
    <Toaster 
      position="top-center" 
      gutter={12} 
      containerStyle={{margin:"8px"}}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration:5000,
        },
        styles: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '16px 24px',
          backgroundColor: 'var(--color-grey-0)',
          color: 'var(--color-grey-700)',
        },

      }}
    />

    </QueryClientProvider>
    </DarkModeProvider>
    
  );
}

export default App;



















// import styled from "styled-components";
// import GlobalStyles from "./styles/GlobalStyles";
// import Heading from "./ui/Heading";
// import Button from "./ui/Button";
// import Input from "./ui/input"
// import Row from "./ui/Row";

// const StyledApp = styled.main`
//   /* background-color: orangered; */
//   padding: 20px;
// `

// function App() {
//   return(
//     <>
//       <GlobalStyles />
//       <StyledApp>
//        <Row type='vertical'>
//        <Row type='horizontal'>
//          <Heading as='h1'>The Wild Oasis</Heading>

//           <div>
//             <Heading as='h1'>Check in and out</Heading>
//             <Button onClick={()=> alert("Check in")}>Check in</Button>
//             <Button onClick={()=> alert("Check in")}>Check out</Button>
//           </div>
//        </Row>

//        <Row type= 'vertical'>
//           <Heading as='h3'>Form</Heading>
//           <form>
//             <Input type="number" placeholder = "Number of guests" />
//             <Input type="number" placeholder = "Number of guests" />
//           </form>
//        </Row>
//        </Row>
//       </StyledApp>
//     </>

//   )
  
// }

// export default App
