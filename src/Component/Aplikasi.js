import React, { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import { Modal } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import '../App.css';

import 'antd/dist/antd.css';

const themes = {
  light: {
    text: "rgb(97, 218, 251)",
    background: "#DEE4E7",
  },
  dark: {
    text: "#DEE4E7",
    background: "rgb(40, 44, 52)",
  },
};

const ThemeContext = createContext();

function Content(props) {
  return (
    <div
      style={{
        marginTop: "2em",
        position: "relative",
        left: "43%",
      }}
    >
      <Text tema={props.tema} />
    </div>
  );
}

function Text(props) {
  const theme = useContext(ThemeContext); //Use Context
  return (
    <p
      className="titleContext"
      style={{ color: theme.text }}
    > 
    </p>
  );
}

export default function Aplikasi() {
  const [bukaModal, tampilModal] = useState(false);
  const [db, setDb] = useState(false);
  const [valueTheme, setValueTheme] = useState(themes.dark); //use State

  const lihatModal = () => {
    tampilModal(true);
  };

  const bukatutup = () => {
    tampilModal(false);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3009/users",
      headers: {
        accept: "/",
      },
    })
      .then((data) => {
        console.log('data',data.data);
        setDb(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
        <div>
    <h1 className="margin"><center>Pameran Sepatu</center> </h1>
    </div>
    <div>
      <ThemeContext.Provider value={valueTheme}>
        <div
          style={{
            backgroundColor: valueTheme.background,
            width: "100%",
            maxWidth: "100%",
            overflowX: "hidden",
            position: "relative",
            top: "-1.3em",
            overflowY: "hidden",
            maxHeight: "100%",
          }}
        >
          <ThemeContext.Provider value={valueTheme}>
            <div
              
              className={`contentWrapper ${
                valueTheme === themes.dark ? "light" : "dark"
              }`}
            >
              <Grid
          container
          md={10}
          spacing={3}
          style={{ marginTop: "auto", marginLeft: "auto", marginRight: "auto", marginButtom: "auto" }}
          
        >
          {db.length > 0 && db.map((results) => 
             (
              <Grid item key={results.id} md={3}>
                <Card>
                  <CardActionArea onClick={lihatModal}>
                    <CardContent style={{ backgroundColor: "#9eadb6" }}>
                      <Typography style={{color:"#ffffff"}}>Nama: {results.nama}</Typography>
                      <Typography>Warna : {results.warna}</Typography>
                      <Typography>Ukuran : {results.ukuran}</Typography>
                      <img src = {results.imgsrc} alt = {results.imgalt}/>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          )}
        </Grid>
              <Content tema={valueTheme} />
              <button
                className="button margin"
                onClick={() =>
                  setValueTheme(
                    valueTheme === themes.dark ? themes.light : themes.dark
                  )
                }
              >
                <center>Ganti</center>
              </button>
            </div>
          </ThemeContext.Provider>

          <div>{/* <SectionContext /> */}</div>
        </div>
      </ThemeContext.Provider>
      {/* <Axio /> */}
    </div>
      <Modal title="Deskripsi"
        visible={bukaModal}
        onOk={bukatutup}
        onCancel={bukatutup}
      >
          <p>Detail Profil</p>
          <p>Kelompok 13</p>
      </Modal>
    </>
  );
}