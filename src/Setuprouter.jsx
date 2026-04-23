import { createHashRouter, RouterProvider } from 'react-router-dom';
import { First } from './Firstpage';
import { Main } from './Mainpage';
import { Sell } from './Sell';
import { Turkeybreast } from './turkeybreatsapi';
import { Turkey } from './Displayturkeybreast';
import { Home } from './Homepage';
import { Error } from './Errors';
import { Displays } from './Turkeyinidvidualitems';
import { Cart } from './Cart';
import { Homes } from './HomeDisplay';
import { HomeItems } from './HomeProductsapi';
import { Saver } from './Amazonsaver';
import { Amazonindi } from './Amazonsaverindi';
import { Saverapi } from './Amazonsaverapi';
import { Third } from './Third';
import { Thirdindi } from './Thirdindi';
import { Fourth } from './Fourth';
import { Fourthind } from './Fourthindi';
import { Fifth } from './Fifth';
import { Fifthind } from './Fifthindi';
import { Signup } from './signup';
import SignIn from './Signpage';
export const Setup = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: <First />,
      errorElement:<Error/>
    },
    {
       path:"/signin",
       element:<SignIn/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
        path:"/main",
element:<Main/>,
   children:[
    {
      path:"",
      element:<Home/>
    },
    {
path:"sell",
element:<Sell/>
   },
   {
    path:"turkeybreast",
    element:<Turkey/>,
    loader:Turkeybreast
   },
   {
    path:"turkeybreast/Display/:id",
    element:<Displays/>,
   },
   {
    path:"Cart",
    element:<Cart/>
   },
   {
    path:"display/:id",
    element:<Homes/>,
    loader:HomeItems
   },
   {
    path:"gh",
    element:<Saver/>
   },{
    path:"gh/:id",
    element:<Amazonindi/>,
    loader:Saverapi
   },{
    path:"nn",
    element:<Third/>
   },{
    path:"nn/:id",
    element:<Thirdindi/>,
    loader:Saverapi
   },{
    path:"aa",
    element:<Fourth/>
   },{
path:"aa/:id",
element:<Fourthind/>,
loader:Saverapi

},{
  path:"xx",
  element:<Fifth/>
},{
  path:"xx/:id",
  element:<Fifthind/>,
  loader:Saverapi
}
 
   ]}
  ])

  return <RouterProvider router={router} />;
};
