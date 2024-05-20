import { Route, Routes } from 'react-router-dom'

import './App.css'
import FirstPage from '../Comps/FirstPage'
import LogIn from '../Comps/LogIn'
import Register from '../Comps/Register'
import HomePage from '../Comps/HomePage'
import MyWardrobe from '../Comps/MyWardrobe'
import UploadItem from '../Comps/UploadItem'
import MarketPlace from '../Comps/MarketPlace'
import CreateAd from '../Comps/CreateAd'
import Ad from '../Comps/Ad'
import Map from '../Comps/Map'


function App() {

  const userClothes = [
    { id: 1, image: '/Images/kolav.png', name: 'Shirt', color: 'blue', brand: 'Brand A' , phone: '0527827133' , price: 10},
    { id: 2, image: '/Images/lookalike.png', name: 'Jeans', color: 'black', brand: 'Brand B' , phone: '0521234567' , price: 20},
    { id: 3, image: '/Images/kolav.png', name: 'Shirt', color: 'blue', brand: 'Brand A' , phone: '0521234567' , price: 30},
    { id: 4, image: '/Images/kolav.png', name: 'Jeans', color: 'black', brand: 'Brand B' , phone: '0521234567' , price: 40},
    { id: 5, image: '/Images/kolav.png', name: 'Shirt', color: 'blue', brand: 'Brand A' , phone: '0521234567' , price: 50},
    { id: 6, image: '/Images/kolav.png', name: 'Jeans', color: 'black', brand: 'Brand B' , phone: '0521234567' , price: 60},
    { id: 7, image: '/Images/kolav.png', name: 'Shirt', color: 'blue', brand: 'Brand A' , phone: '0521234567' , price: 70},
    { id: 8, image: '/Images/kolav.png', name: 'Jeans', color: 'black', brand: 'Brand B' , phone: '0521234567' , price: 80},
    { id: 9, image: '/Images/kolav.png', name: 'Shirt', color: 'blue', brand: 'Brand A' , phone: '0521234567' , price: 90},
    { id: 10, image: '/Images/kolav.png', name: 'Jeans', color: 'black', brand: 'Brand B' , phone: '0521234567' , price: 100},
  ];

  const allAds = [
    { id: 1, price: 10, address: "bialik, hod hasharon", condition: "New", photo: '/Images/kolav.png', color: "pink", name: "Shirt", phone: "0527827133"},
    { id: 2, price: 20, address: "nahal sorek, modi'in", condition: "Used", photo: '/Images/lookalike.png', color: "red", name: "Top", phone: "0527827134"},
  ]

  return (
    <>
      <Routes>
        <Route index element={<FirstPage/>}></Route>
        <Route path='/login' element={<LogIn />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/HomePage' element={<HomePage/>}></Route>
        <Route path='/MyWardrobe' element={<MyWardrobe clothes={userClothes} />}></Route>
        <Route path='/UploadItem' element={<UploadItem/>}></Route>
        <Route path='/MarketPlace' element={<MarketPlace ads={allAds}/>}></Route>
        <Route path='/CreateAd/:item' element={<CreateAd/>}></Route>
        <Route path='/Map' element={<Map/>}></Route>
        <Route path='/Ad' element={<Ad/>}></Route>
      </Routes>
    </>
  )
}

export default App
