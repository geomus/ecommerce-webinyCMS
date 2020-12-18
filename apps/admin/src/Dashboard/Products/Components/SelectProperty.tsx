/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { listProperties } from "../../../graphql/query";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import TableProductVariants from "./TableProductVariants";

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
    }
}));

export default function Tags({ combineVariantsStocks, productName }) {
    const classes = useStyles();
    // const [stateCheckboxes, setStateCheckboxes] = useState({})
    // const [propertiesSelected, setPropertiesSelected] = useState([])
    const [properties, setProperties] = useState({});

    // const handleChangeProperties = (event) => {
    //     setStateCheckboxes({ ...stateCheckboxes, [event.target.name]: event.target.checked });
    // };
    //     const arrayProps = []
    //     for (const key in stateCheckboxes) {
    //            if (stateCheckboxes[key] === true) {
    //             arrayProps.push(key)
    //            }
    //     }
    //     setPropertiesSelected(arrayProps)

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

    return (
        <div>
            {data.properties.listProperties.data.map((item, i) => (
                <div key={`${i}${item.name}`} className={classes.root}>
                    <Typography className={classes.textField} variant="body2">
                        {item.name}:
                    </Typography>
                    <TextField
                        key={i}
                        defaultValue={item.values}
                        name={item.name}
                        label="Variants"
                        variant="outlined"
                        type="text"
                        size="small"
                        onBlur={updateProperties}
                    />
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
