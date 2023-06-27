import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import CloudIcon from "@mui/icons-material/Cloud";

import moment from "moment";

import axios from "axios";

// pour afficher la date en français
import "moment/min/locales";

moment.locale("fr");

const CardMeteo = () => {
  const { t, i18n } = useTranslation();
  const [langs, setLangs] = useState("fr");
  const [dateTime, setDateTime] = useState(moment().format("LLLL"));

  const [latitudeLongitude, setLatitudeLongitude] = useState({
    lat: "",
    lon: "",
  });
  const [datas, setDatas] = useState({
    name: "",
    temp: null,
    descreption: "",
    icon: "",
    min: "",
    max: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDateTime(moment().format("LLLL"));

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
  }, [langs]);

  const { lat, lon } = latitudeLongitude;

  useEffect(() => {
    if (lat !== "" && lon !== "") {
      setIsLoading(true);

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=63cdf98c37b996c743f437b5a6e2594e&lang=${langs}`
        )
        .then((res) => {
          setDatas({
            name: res.data.name,
            temp: res.data.main.temp,
            descreption: res.data.weather[0].description,
            icon: ` https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
            min: res.data.main.temp_min,
            max: res.data.main.temp_max,
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
    if (langs === "fr") {
      setLangs("es");
      i18n.changeLanguage("es");
      moment.locale("es");
    } else {
      setLangs("fr");
      i18n.changeLanguage("fr");
      moment.locale("fr");
    }
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
        ) : datas ? (
          <CardContent>
            <Grid
              container
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <Typography variant="h5" color="text.white" gutterBottom>
                {datas.name}
              </Typography>

              <Typography
                variant="h3"
                sx={{ fontSize: "12px", marginLeft: "10px" }}
                color="text.white"
                gutterBottom
              >
                {dateTime}
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
                    {datas.temp} °c
                  </Typography>

                  <img width="100" height="100" src={datas.icon} alt="icon" />
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="body2" color="text.white">
                    {datas.descreption}
                  </Typography>
                </Grid>
                <Grid item sm={12} sx={{ mt: "20px" }}>
                  <Typography
                    variant="body1"
                    color="text.white"
                    sx={{ fontSize: "12px" }}
                  >
                    {t("min")}: {datas.min} °c | {t("max")}: {datas.max} °c
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
        {langs === "fr" ? "Espagnole" : "Français"}
      </Button>
    </>
  );
};

export default CardMeteo;
