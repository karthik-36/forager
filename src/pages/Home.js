// import React from 'react'

// function Home() {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home









import * as React from 'react';
import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import GoogleMapReact from 'google-map-react';
import StarRatings from 'react-star-ratings';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

import { Marker } from "react-simple-maps";
import SimpleDialog from "./DialogBox"
//import MapChart from "./MapChart";


var axios = require("axios").default;


var options = {
  method: 'GET',
  url: 'https://hotels-com-provider.p.rapidapi.com/v1/hotels/search',
  params: {
    checkin_date: '2022-03-26',
    checkout_date: '2022-03-27',
    sort_order: 'STAR_RATING_HIGHEST_FIRST',
    destination_id: '1708350',
    adults_number: '1',
    locale: 'en_US',
    currency: 'USD',
    children_ages: '4,0,15',
    price_min: '10',
    star_rating_ids: '3,4,5',
    accommodation_ids: '20,8,15,5,1',
    price_max: '500',
    page_number: '1',
    theme_ids: '14,27,25',
    amenity_ids: '527,2063',
    guest_rating_min: '4'
  },
  headers: {
    'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com',
    'x-rapidapi-key': '0b92bc2163msh779aa268fcc6588p140b6ajsn7a01b442d227'
  }
};


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"



  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  

const Home = () => {

  let [hotels, setHotels] = useState([]);

  let getHotels = function () {

    console.log("hotel1");
    console.log(hotelsList.searchResults.results);
    setHotels(hotelsList.searchResults.results);
    // axios.request(options).then(function (response) {

    // //  setHotels(response.data.searchResults.results);
    //   console.log("after set ");

    // }).catch(function (error) {
    //   console.error(error);
    // });

  }

  useEffect(() => {
    getHotels();
    console.log(hotels)
  }, []);



  useEffect(() => {
    console.log(hotels)
  }, [hotels]);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  // 55.74702, lon: 37.63087
  const [position, setPosition] = useState({ coordinates: [55.74702, 37.63088], zoom: 1 });

  const [open, setOpen] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState("xyz");

  const handleClickOpen = () => {
    setOpen(true);
  };

  

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  function handleChangeRadio(e) {

    console.log(e.target.value);
    let newHotels = [];
    if (e.target.value == "Price") {

      newHotels = hotels.sort((a, b) => {
        return a.ratePlan.price.exactCurrent - b.ratePlan.price.exactCurrent;


      })
      setHotels(newHotels.map((x, i) => { return newHotels[i]; }));

    }
    else if (e.target.value == "Vacancy") {

      newHotels = hotels.sort((a, b) => {
        if (!b.roomsLeft) {
          b.roomsLeft = 7;
        }
        return b.roomsLeft - a.roomsLeft;
      })

      console.log("newHotels");
      console.log(newHotels);
      setHotels(newHotels.map((x, i) => { return newHotels[i]; }));
    }
    else if (e.target.value == "Star Rating") {

      newHotels = hotels.sort((a, b) => {
        return b.starRating - a.starRating;
      })

      console.log("newHotels");
      console.log(newHotels);
      setHotels(newHotels.map((x, i) => { return newHotels[i]; }));
    }



    //  this.setState({ selected: ev.target.value });
  };





  return (<div>
    <Grid style={{ zIndex: "-1" }} container direction="row" spacing={2} justifyContent="center"
    >
      <Grid style={{ height: "100vh", background: "white", borderRadius: "5px", marginTop: "14px" ,  borderBottomRightRadius : "100px" }} item xs={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend"><b>Sort donations by</b></FormLabel>
          <RadioGroup
            aria-label="Sort donations by"
            defaultValue="Star Rating"
            name="radio-buttons-group"
            onChange={handleChangeRadio}
          >
            
            <FormControlLabel style={{ padding: "5px", borderRadius: "5px" }} value="Price" control={<Radio />} label="Distance" />
            <FormControlLabel style={{ padding: "5px", borderRadius: "5px" }} value="Star Rating" control={<Radio />} label="Donor Rating" />
  
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={8}>
        <Grid container item xs={12}  >
          {hotels.map((hotel) => {
            return (<Grid container xs={12} style={{ background: "white", margin: "4px", padding: "5px", borderRadius: "7px", boxShadow: "2px 4px" }}>

              <Grid xs={12} sm={12} md={12} lg={4}>
                <div >
                  <img style={{ border: "3px solid black", borderRadius: "4px", marginRight: "20px" , height : "200px" , width : "370px"}} src={hotel.optimizedThumbUrls.srpDesktop} />
                </div> </Grid>
              <Grid xs={12} sm={12} md={12} lg={5}>
                <div style={{ textAlign: "left", padding: "5px", marginLeft: "5px", paddingLeft: "15px", borderLeft: "2px solid black" }}>
                  <h3> {hotel.name} </h3>
                  <p> {hotel.address.streetAddress} </p>
                  <p>{hotel.ratePlan.price.fullyBundledPricePerStay.split("&nbsp;").join(" ")}</p>
                  <p>donor name : Karthik Singh</p>

                </div> </Grid>
              <Grid xs={12} sm={12} md={12} lg={3}>
                <div style={{ textAlign: "left", padding: "23px 5px 5px" }}>
                  {/* <p> rating :  {hotel.starRating} </p> */}
                  <StarRatings
                    rating={hotel.starRating}
                    starRatedColor="orange"
                    starDimension="20px"
                    starSpacing="5px"
                  />
                  <p> <b> quantity left </b> : {hotel.roomsLeft ? hotel.roomsLeft : 7} </p>
                  <SimpleDialog HotelName = {hotel.name} cost = {hotel.ratePlan.price.fullyBundledPricePerStay.split("&nbsp;").join(" ")}/>
                  {/* <Button variant="contained" color="success" style={{ background: "rgb(30,255,147)", padding: "5px", borderRadius: "5px" }}><b>Book Now</b></Button> */}
                  
                </div> </Grid>

            </Grid>);
          })}
        </Grid>
      </Grid>

      {/* <Grid style={{ height: "100vh", background: "white", borderRadius: "5px", marginTop: "12px" , borderBottomLeftRadius : "100px" }} item xs={3}>
        <div>

          <ComposableMap
            center={position.coordinates}
            style={{ background: "white", border: "2px solid black" }}
            projection="geoAlbers"
            projectionConfig={{
              scale: 200
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#DDD"
                    stroke="#FFF"
                  />
                ))
              }
            </Geographies>


            {
              hotels.map((hotel) => {
                return (<Marker coordinates={[hotel.coordinate.lon, hotel.coordinate.lat]} fill="#777">
                  <text textAnchor="middle" fill="#000">
                    v
                  </text>
                </Marker>)
              })
            }


          </ComposableMap>




        </div>
      </Grid> */}

    </Grid>
  </div>);
};










var hotelsList = {
  "header": "Moscow, Russia",
  "query": {
    "destination": {
      "id": "1153093",
      "value": "Moscow, Russia",
      "resolvedLocation": "CITY:1153093:UNKNOWN:UNKNOWN"
    }
  },
  "searchResults": {
    "totalCount": 2529,
    "results": [
      {
        "id": 676613,
        "name": "Veg Pizza",
        "starRating": 5,
        "urls": {},
        "address": {
          "streetAddress": "Sadovnicheskaya 20 str. 1",
          "extendedAddress": "Zamoskworieczje",
          "locality": "Moscow",
          "postalCode": "114122",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.3,
          "rating": "4.3",
          "total": 179,
          "scale": 5,
          "badge": "fabulous",
          "badgeText": "Fabulous"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "0.9 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "0.5 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$277",
            "exactCurrent": 277.47,
            "old": "$462",
            "fullyBundledPricePerStay": "0.3 mi"
          },
          "features": {
            "freeCancellation": false,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Central Administrative Okrug",
        "deals": {
          "specialDeal": {
            "dealText": "Save40%"
          },
          "priceReasoning": "DRR-527"
        },
        "messaging": {
          "scarcity": "4 left on our app"
        },
        "badging": {},
        "pimmsAttributes": "DoubleStamps|D13|TESCO",
        "coordinate": {
          "lat": 55.74702,
          "lon": 37.63087
        },
        "roomsLeft": 4,
        "providerType": "LOCAL",
        "supplierHotelId": 17787669,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://www.simplyrecipes.com/thmb/H6Xk6aHV-UFguZDuWtsAbcapj84=/2668x2001/smart/filters:no_upscale()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg"
        }
      },
      {
        "id": 133660,
        "name": "Fried Rice",
        "starRating": 5,
        "urls": {},
        "address": {
          "streetAddress": "2/1 Kutuzovsky Avenue",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "121248",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.6,
          "rating": "4.6",
          "total": 221,
          "scale": 5,
          "badge": "superb",
          "badgeText": "Superb"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "1.9 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "2.1 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$292",
            "exactCurrent": 292.36,
            "fullyBundledPricePerStay": "0.7 mi"
          },
          "features": {
            "freeCancellation": false,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Dorogomilovo",
        "deals": {},
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|TESCO",
        "coordinate": {
          "lat": 55.75173,
          "lon": 37.56669
        },
        "providerType": "LOCAL",
        "supplierHotelId": 520503,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2021%2F10%2F27%2FHomemade-Dog-Food-2000.jpg"
        }
      },
      {
        "id": 583038496,
        "name": "Masala dosa",
        "starRating": 5,
        "urls": {},
        "address": {
          "streetAddress": "Leningradsky Avenue 36, Building 33",
          "extendedAddress": "",
          "locality": "Moscow",
          "postalCode": "125167",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 4.7,
          "rating": "4.7",
          "total": 68,
          "scale": 5,
          "badge": "exceptional",
          "badgeText": "Exceptional"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "2.8 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "3.5 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$122",
            "exactCurrent": 121.82,
            "fullyBundledPricePerStay": "1.2 mi"
          },
          "features": {
            "freeCancellation": true,
            "paymentPreference": false,
            "noCCRequired": false
          },
          "type": "EC"
        },
        "neighbourhood": "Airport District",
        "deals": {},
        "messaging": {},
        "badging": {},
        "pimmsAttributes": "DoubleStamps|priceRangeUK|TESCO",
        "coordinate": {
          "lat": 55.78683,
          "lon": 37.5665
        },
        "providerType": "LOCAL",
        "supplierHotelId": 18188703,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://i.pinimg.com/originals/38/a6/55/38a6552694b7117beed87e7adc62dd46.png"
        }
      },
      {
        "id": 471879,
        "name": "Puri",
        "starRating": 4,
        "urls": {},
        "address": {
          "streetAddress": "Novo-Nikolskaya 2A, microrayon Opalikha",
          "extendedAddress": "",
          "locality": "Krasnogorsk",
          "postalCode": "143443",
          "region": "",
          "countryName": "Russia",
          "countryCode": "ru",
          "obfuscate": false
        },
        "welcomeRewards": {
          "collect": true
        },
        "guestReviews": {
          "unformattedRating": 5,
          "rating": "5.0",
          "total": 1,
          "scale": 5,
          "badge": "exceptional",
          "badgeText": "Exceptional"
        },
        "landmarks": [
          {
            "label": "City center",
            "distance": "15 miles"
          },
          {
            "label": "Third Ring Road",
            "distance": "15 miles"
          }
        ],
        "geoBullets": [],
        "ratePlan": {
          "price": {
            "current": "$135",
            "exactCurrent": 135.35,
            "fullyBundledPricePerStay": "1.5 mi"
          },
          "features": {
            "freeCancellation": true,
            "paymentPreference": true,
            "noCCRequired": false
          },
          "type": "Dual"
        },
        "neighbourhood": "Krasnogorsk",
        "deals": {},
        "messaging": {
          "scarcity": "2 left on our app"
        },
        "badging": {},
        "pimmsAttributes": "DoubleStamps|D13|TESCO",
        "coordinate": {
          "lat": 55.83743,
          "lon": 37.25958
        },
        "roomsLeft": 2,
        "providerType": "LOCAL",
        "supplierHotelId": 8962971,
        "isAlternative": false,
        "optimizedThumbUrls": {
          "srpDesktop": "https://5.imimg.com/data5/ANDROID/Default/2021/5/EP/AJ/ZL/129881817/1621759674770-jpg-500x500.jpg"
        }
      }]}
};

export default Home;