import React, { useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useQuery } from "@apollo/client";
import { listPricesList } from "../../../graphql/query";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    }
}));

export default function ProductsCheckboxPricesCategory({
    handleIdPrices,
    productPrices,
    statePrices,
    setStatePrices
}) {
    const { loading, error, data } = useQuery(listPricesList);
    const classes = useStyles();

    useEffect(() => {
        if (!loading && data) {
            const objectForStatePrices = {};
            data.pricesList.listPricesList.data.forEach((price) => {
                const idStatePrices = price.id
                objectForStatePrices[idStatePrices] = false;
            });

            for (const price of productPrices) {
                objectForStatePrices[price] = true
            }

            setStatePrices(objectForStatePrices);

        }
    }, [loading, data]);

    if (loading) {
        return (
            <h1>
                <LinearProgress />
            </h1>
        );
    }

    if (error) {
        console.dir(error);
        return <h1> error </h1>;
    }


    return (
        <FormControl className={classes.formControl}>
            {data.pricesList.listPricesList.data.map((category, i) => {
                return (
                    <FormGroup row key={category.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleIdPrices}
                                    name={category.name}
                                    id={category.id}
                                    checked={statePrices[category.id] ? statePrices[category.id] : false }
                                />
                            }
                            label={<Typography variant="caption">{category.name}</Typography>}
                        />
                    </FormGroup>
                )
            })}
            <FormHelperText id="prices-categories-helper">
                Elija los tipos de precios del producto
            </FormHelperText>
        </FormControl>
    );
}
