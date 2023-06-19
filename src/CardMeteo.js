import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import CloudIcon from "@mui/icons-material/Cloud";

import axios from "axios";

const CardMeteo = () => {
  const [langs, setLangs] = useState("fr");

  const [latitudeLongitude, setLatitudeLongitude] = useState({
    lat: "",
    lon: "",
  });
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitudeLongitude({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const { lat, lon } = latitudeLongitude;

  useEffect(() => {
    if (lat !== "" && lon !== "") {
      setIsLoading(true);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=63cdf98c37b996c743f437b5a6e2594e&lang=${langs}`
        )
        .then((res) => {
          setDatas((datas) => {
            return [...datas, res.data];
          });
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [lat, lon, langs]);

  // changer la langue

  const changeLang = () => {
    const newLangs = langs === "fr" ? "en" : "fr";
    setLangs(newLangs);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          textAlign: "left",
          bgcolor: "#3367C1",
          color: "#ffff",
        }}
      >
        {isLoading ? (
          <p>Attendez...</p>
        ) : datas.length > 0 ? (
          <CardContent>
            <Grid
              container
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <Typography variant="h5" color="text.white" gutterBottom>
                {datas[0].name}
              </Typography>

              <Typography
                variant="h3"
                sx={{ fontSize: "12px", marginLeft: "10px" }}
                color="text.white"
                gutterBottom
              >
                {new Date().toLocaleDateString()}
              </Typography>
            </Grid>
            <Divider sx={{ marginBottom: "10px", bgcolor: "#ffffff" }} />
            <Grid container justifyContent="flex" alignItems="center">
              <Grid item sm={8}>
                <Grid container item sm={12} alignItems="center">
                  <Typography
                    sx={{ marginRight: "20px", fontSize: "32px" }}
                    variant="body1"
                    color="text.white"
                  >
                    {datas[0].main.temp} °c
                  </Typography>

                  <img
                    width="100"
                    height="100"
                    src={`http://openweathermap.org/img/w/${datas[0].weather[0].icon}.png`}
                    alt="icon"
                  />
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="body2" color="text.white">
                    {datas[0].weather[0].description}
                  </Typography>
                </Grid>
                <Grid item sm={12} sx={{ mt: "20px" }}>
                  <Typography
                    variant="body1"
                    color="text.white"
                    sx={{ fontSize: "12px" }}
                  >
                    Max: {datas[0].main.temp_min} °c | {datas[0].main.temp_max}{" "}
                    °c
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="center" alignItems="center" item sm={4}>
                <CloudIcon
                  sx={{ color: "#ffffff", width: "120px", height: "120px" }}
                />
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <p>Pas de données disponibles.</p>
        )}
      </Card>
      <Button
        onClick={() => changeLang()}
        variant="text"
        sx={{ color: "white", padding: "5px 10px" }}
      >
        {langs === "fr" ? "Anglais" : "Français"}
      </Button>
    </>
  );
};

export default CardMeteo;
