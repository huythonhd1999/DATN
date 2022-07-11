import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export default function Tags(props) {
    return (
        <Autocomplete
            multiple
            id="tags-outlined"
            options={props.options}
            getOptionLabel={(option) => option.name}
            value={props.value}
            filterSelectedOptions
            onChange={(_event, value) => props.onSelectedListChange(value)}
            disabled={props.disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Select a value"
                    size="small"
                    fullWidth
                />
            )}
        />
    );
}