import React from 'react';
import ReactDOM from 'react-dom/client';

import { redirect } from 'react-router-dom';

import {
    createBrowserRouter,
    RouterProvider,
    Route 
} from 'react-router-dom';

import Home from './components/Home/Home'
import MapView from './components/Map/MapView';
import DriverView from './components/Drivers/DriverView'

const router = createBrowserRouter([
    { 
      path: '/',
      loader: () => { return redirect("/home"); }
    },
    {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "/home",
            element: <MapView className="map" />
          }
        ]
    },
    {
      path: "/drivers",
      element: <Home />,
      children: [
        {
          path: "/drivers",
          element: <DriverView />
        },
        {
          path: "/drivers/:name",
          element: <DriverView />
        }
      ]
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);