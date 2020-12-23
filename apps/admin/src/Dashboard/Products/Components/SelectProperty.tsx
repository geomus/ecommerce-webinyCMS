/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { listProperties } from "../../../graphql/query";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import TableProductVariants from "./TableProductVariants";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        alignItems: "flex-end",
        padding: "10px 0"
    },
    textField: {
        textTransform: "uppercase",
        paddingRight: 10
    },
    inputField: {
        border: 0,
        borderBottom: "1px solid #000"
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    }
}));

export default function Tags({ combineVariantsStocks, productName }) {
    const classes = useStyles();
    const [properties, setProperties] = useState({});
    const [variants, setVariants] = useState([])

    const { loading, error, data } = useQuery(listProperties);

    useEffect(() => {
        if (!loading && data) {
            const propertiesList = data.properties.listProperties.data;
            const newPropertiesList = {};
            for (const property of propertiesList) {
                newPropertiesList[property.name] = property.values;
            }
            setProperties(newPropertiesList);
        }
    }, [loading, data]);

    if (loading) {
        return <h1> cargando </h1>;
    }
    if (error) {
        console.dir(error);
        return <h1> error </h1>;
    }

    const updateProperties = (e) => {
        const valueSplit = e.target.value.split(",");
        const valueSplitUppercased = valueSplit.map((value) => value.toUpperCase());

        setProperties({ ...properties, [e.target.name]: valueSplitUppercased });
    };

    const handleChange = (event) => {
        const indiceValues = event.target.value.length - 1
        if (!variants[event.target.name]) {
            console.log(event.target.value[indiceValues]);
            
            variants[event.target.name] = [event.target.value[indiceValues]]
        } else {
            console.log(event.target.value[indiceValues]);
            
            variants[event.target.name].push(event.target.value[indiceValues])
        }

        console.log(variants);
        setVariants(variants)
    };

    return (
        <div>
            {data.properties.listProperties.data.map((item, i) => (
                <div key={`${i}${item.name}`} className={classes.root}>
                    <Typography className={classes.textField} variant="body2">
                        {item.name}:
                    </Typography>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={variants}
                        onChange={handleChange}
                        input={<Input id="select-multiple-chip" />}
                        name={i}
                        renderValue={(selected) => {
                            console.log(selected);

                            return (
                                <div className={classes.chips}>
                                    {(selected[i] as string[]).map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )
                        }}
                    >
                        {item.values.map((variant) => (
                            <MenuItem key={variant} value={variant}>
                                {variant}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            ))}
            <TableProductVariants
                properties={properties}
                productName={productName}
                combineVariantsStocks={combineVariantsStocks}
            />
            <br />
            {/* <VariantsBtnCreate/> */}
            <br />
        </div>
    );
}
