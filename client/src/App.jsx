import { useEffect, useState , useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {MapContainer, Marker, TileLayer} from "react-leaflet"
import {io} from "socket.io-client"
import "leaflet/dist/leaflet.css"
import './App.css'
import { popup } from 'leaflet'
function App() {
  const socket = useMemo(()=>io("http://localhost:3000", []),[]);
  const [count, setCount] = useState(0)
  const [latitude , setLat] = useState(0)
  const [longitude , setLong] = useState(0)
  const [sockeid , setSocketid] = useState("")
  useEffect(()=>{
    socket.on("connect", (socket)=>{
      console.log("connected" , socket);
    })
  },[socket])
  useEffect(()=>{
  if(navigator.geolocation){
    navigator.geolocation.watchPosition(
      (pos)=>{
      const {latitude , longitude} = pos.coords;
      console.log(pos.coords);
      socket.emit("send-location" , {latitude , longitude})
  })
  }
} , [latitude, longitude])
const markerr = [

]

const marker = [];
useEffect(()=>{
  socket.on("receive-location" , data=>{
    console.log(data.data);
    setLat(data.data.longitude)
    setLong(data.data.latitude);
    console.log(markers);
  })
})
  marker.push({geocode:[longitude, latitude]})
  marker.push({geocode:[28.74 , 76.027889]})
  console.log(marker);


  return (
    <>
    <MapContainer center={[28.8423936 , 75.76]} zoom={1} style={{height:"100vh" , width:"100vw"}} >
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
   {marker.length>0 && marker.map((m)=>(
    <>
     <Marker position={m.geocode}></Marker>
    </>
   ))}
    
     </MapContainer>

    </>
  )
}

export default App
