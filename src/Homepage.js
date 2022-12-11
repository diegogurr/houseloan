import React, {useState} from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Results from "./Results";
import InsertData from "./InsertData";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Footer from "./Footer";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';

export const Homepage = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [loanDuration, setLoanDuration] = useState(0);
    const [incomesSum, setIncomesSum] = useState(0);
    const [annualGrossIncome, setAnnualGrossIncome] = useState(0);
    const [mainAge, setMainAge] = useState(0);


    return (<Box container spacing={2} justify="flex-start" sx={{}}>
            <AppBar position="static" sx={{bgcolor: '#264653'}}>
                <Toolbar variant="dense">
                    <OtherHousesIcon/>
                    <Typography sx={{marginLeft: 2}} variant="h6" color="inherit" component="div">
                        Home Loan Calculator
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={0} sx={{mx: 2, mt: 2}}>
                <Grid item xs={4} sm={5} md={4} lg={4}>
                    <Paper>
                        <InsertData setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}
                                    setLoanDuration={setLoanDuration}
                                    setIncomesSum={setIncomesSum} setAnnualGrossIncome={setAnnualGrossIncome}
                                    setMainAge={setMainAge}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={7} lg={7} sx={{mx: 2, mt: 0}}>
                    <Paper>
                        <Results minPrice={minPrice} maxPrice={maxPrice} loanDuration={loanDuration}
                                 incomesSum={incomesSum}
                                 annualGrossIncome={annualGrossIncome} mainAge={mainAge}/>
                        {/*<h2>Incomes Sum:{incomesSum} minPrice:{minPrice} maxPrice:{maxPrice}</h2>*/}
                    </Paper>
                </Grid>
            </Grid>
            <footer>
                <Footer/>
            </footer>
        </Box>
    );
};
