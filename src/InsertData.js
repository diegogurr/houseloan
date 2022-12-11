import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box"
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const priceSliderValues = [
    {
        value: 0,
        scaledValue: 100000,
        label: "100k"
    },
    {
        value: 20,
        scaledValue: 200000,
        label: "200k"
    },
    {
        value: 50,
        scaledValue: 500000,
        label: "500k"
    },
    {
        value: 75,
        scaledValue: 750000,
        label: "750k"
    },
    {
        value: 100,
        scaledValue: 1000000,
        label: "1M"
    },
    {
        value: 125,
        scaledValue: 2000000,
        label: "2M"
    },
    {
        value: 150,
        scaledValue: 3000000,
        label: "3M"
    }
];

const scale = (value) => {
    if (value === undefined) {
        return undefined;
    }
    const previousMarkIndex = Math.floor(value / 25);
    const previousMark = priceSliderValues[previousMarkIndex];
    const remainder = value % 25;
    if (remainder === 0) {
        return previousMark.scaledValue;
    }
    const nextMark = priceSliderValues[previousMarkIndex + 1];
    const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25;
    return remainder * increment + previousMark.scaledValue;
};

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
}

function InsertData({setMinPrice, setMaxPrice, setLoanDuration, setIncomesSum, setAnnualGrossIncome, setMainAge}) {
    const [value, setValue] = React.useState([0, 25]);

    const [age1, setAge1] = useState(0);
    const [age2, setAge2] = useState(0);

    const [income1, setIncome1] = useState(0);
    const [income2, setIncome2] = useState(0);

    const [checked, setChecked] = React.useState(false);

    const [isVisible, setIsVisible] = useState(true);

    const handleChangeCheckbox = (event) => {
        setChecked(event.target.checked);
        setIsVisible(current => !current);
        setMinPrice(0);
        setMaxPrice(0);
    };

    useEffect(() => {
        console.log(age1, age2)
        if (age1 > age2) {
            setLoanDuration(() => 65 - age1)
        } else
            setLoanDuration(() => 65 - age2)

        setIncomesSum(0.3 * (income1 + income2) / 12)
        setAnnualGrossIncome(income1)
        setMainAge(age1)

    }, [age1, age2, income1, income2]);

    const scaleValues = (valueArray) => {
        if (!checked) {
            if (scale(valueArray[0]) !== undefined)
                setMinPrice(scale(valueArray[0]));
            if (scale(valueArray[1]) !== undefined)
                setMaxPrice(scale(valueArray[1]));
            return [scale(valueArray[0]), scale(valueArray[1])];
        }
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{display: 'inline-block', borderColor: 'grey.300'}}>
            <Grid>
                <Grid container direction="row" alignItems="center" justifyContent="center">
                    <Grid item>
                        <PersonIcon/>
                    </Grid>
                    <Grid item>
                        <h3>Borrower 1*:</h3>
                    </Grid>
                </Grid>

                <TextField
                    required
                    type="number"
                    min={0}
                    id="outlined-required"
                    label="Annual Gross Income"
                    defaultValue=""
                    size='small'
                    onChange={(e) => {
                        setIncome1(parseInt(e.target.value));
                    }}
                />
                <TextField
                    required
                    value={age1}
                    type="number"
                    id="outlined-required"
                    label="Age"
                    defaultValue=""
                    error={age1 > 100 || (age1 < 18 && age1 > 0)}
                    //helperText={(age1>100||age1<18&&age1>0)?"Age must be in 18-100 range":""}
                    size='small'
                    sx={{width: 80}}
                    onChange={(e) => {
                        if (age1 < 0)
                            setAge1(0)
                        else
                            setAge1(parseInt(e.target.value));
                    }}
                />
                <Grid container direction="row" alignItems="center" justifyContent="center">
                    <Grid item>
                        <PersonIcon/>
                    </Grid>
                    <Grid item>
                        <h3>Borrower 2:</h3>
                    </Grid>
                </Grid>

                <TextField
                    id="outlined-required"
                    type="number"
                    label="Annual Gross Income"
                    defaultValue=""
                    size='small'
                    onChange={(e) => {
                        setIncome2(parseInt(e.target.value));
                    }}
                />
                <TextField id="outlined-required" type="number" label="Age" defaultValue="" size='small'
                           sx={{width: 80}} onChange={(e) => {
                    setAge2(parseInt(e.target.value))
                }}
                />
                <hr style={{marginTop: 40}}/>

                <h3 style={{marginTop: 30}}>What is the range of property prices you are looking at?</h3>
                {isVisible ? <div style={{height: 100}}>
                        <Slider
                            style={{
                                maxWidth: 430,
                                color: '#e9c46a',
                                margin: 5,
                                marginLeft: 20,
                                marginRight: 20,
                                marginBottom: 20,
                                visibility: isVisible ? 'visible' : 'hidden'
                            }}
                            value={value}
                            min={0}
                            step={1.25}
                            max={150}
                            valueLabelFormat={numFormatter}
                            marks={priceSliderValues}
                            scale={scaleValues}
                            onChange={handleChange}
                            //valueLabelDisplay="auto"
                            aria-labelledby="non-linear-slider"
                        />
                        <Typography style={{visibility: isVisible ? 'visible' : 'hidden'}}>
                            [Min,Max]: {JSON.stringify(scaleValues(value))}
                        </Typography>
                    </div>
                    :
                    <div style={{height: 100}}>
                        <TextField
                            style={{visibility: isVisible ? 'hidden' : 'visible'}}
                            required
                            id="outlined-required"
                            label="Property Price"
                            defaultValue=""
                            size='small'
                            onChange={(e) => {
                                setMinPrice(parseInt(e.target.value));
                                setMaxPrice(parseInt(e.target.value))
                            }}
                        />
                    </div>

                }
                <FormGroup>
                    <FormControlLabel style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                      control={<Checkbox style={{color: '#e9c46a'}} checked={checked}
                                                         onChange={handleChangeCheckbox}/>}
                                      label="Range <--> Single Value"/>
                </FormGroup>


            </Grid>
        </Box>
    );
}

export default InsertData;
