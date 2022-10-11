import {Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useEffect, useState} from "react";
const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
    width: '42ch',
};

function Register() {
    const [value, setValue] = useState(null);
    const [disabled, setDisabled] = useState(true)
    const [formRegister, setFormRegister] = useState({
        name: '',
        email: '',
        birthday: '',
        gender: 'female',
        isValid: true,
    })
    const [error, setError] = useState({
        name: '',
        email: '',
        birthday: '',
    })

    const validationEmail = (email) => {
        // validation Email
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError({...error, email: ""})
        } else {
            setError({...error, email: "Email is invalid"})
        }
    }

    const handleChange = (e) => {
        let nameField = e.target.name;
        let value = e.target.value
        if (!value) {
            setError({...error, [e.target.name]: "Required value"})
        } else {
            switch(nameField) {
                case 'email':
                    validationEmail(value);
                    break;
                case 'name':
                case 'gender':
                case 'birthday':
                    break;
                default:
                    console.log('default')
                    setError({...error, [e.target.name]: ""});
            }
            setDisabled(false)
            setFormRegister({...formRegister, [e.target.name]: e.target.value})
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formRegister)
    }

    useEffect(() => {
        if (error.name === "" && formRegister.name) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[error, formRegister])


    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                    ...commonStyles, borderColor: 'primary.main'
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div>
                    <h2>Register</h2>
                </div>
                <div>
                    <TextField fullWidth id="outlined-basic" name="name" onChange={handleChange} label="Name" variant="outlined" />
                    {error.name}
                </div>
                <div>
                    <TextField fullWidth id="outlined-basic" name="email" onChange={handleChange}  label="Email" variant="outlined" />
                    {error.email}
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Birthday"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                                let date = new Date(newValue.$d)
                                let birthday = date.toLocaleDateString();
                                setFormRegister({...formRegister, birthday: birthday});
                            }}
                            renderInput={(params) => <TextField name="birthday" fullWidth {...params} />}
                        />
                    </LocalizationProvider>
                    {error.birthday}
                </div>
                <div>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup onChange={handleChange}
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="gender"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <Button disabled={disabled} type="submit" variant="contained">Save</Button>
                </div>

            </Box>
        </>
    )
}

export default Register;
