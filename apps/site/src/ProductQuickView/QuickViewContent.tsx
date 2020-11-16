import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from "@material-ui/core/styles"
import { ReactComponent as RbNew } from '../utils/svg/rb-new.svg'
import { Divider, FormControl, InputLabel, Select } from '@material-ui/core';
import ShopCartButton from '../Product/ShopCartButton';

const useStyles = makeStyles({
    detailProduct: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    imgFluid: {
        position: 'relative',
        width: '100%'
    },
    marginTags: {
        marginRight: "0.3rem"
    },
    ribbonNew: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 70
    },
    lineHeight: {
        padding: ".5rem 0"
    }
});

const QuickViewContent = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <img src={`${process.env.REACT_APP_API_URL}/files/${props.images[0]}`} alt="Product" className={classes.imgFluid} />
                    {props.isFeatured ? <RbNew className={classes.ribbonNew} /> : ''}
                </Grid>
                <Grid item xs={12} md={5} className={classes.detailProduct}>
                    <Typography variant="body1" gutterBottom>
                        Categoria del producto
                    </Typography>
                    <Divider />
                    <Typography variant="h6" gutterBottom>
                        {props.name}
                    </Typography>
                    <Typography className={classes.lineHeight} variant="h5" gutterBottom>
                        ${props.priceBase}
                    </Typography>
                    <Typography className={classes.lineHeight} variant="body1" gutterBottom>
                        {props.description}
                    </Typography>
                    {
                        props.variants &&
                        props.variants.map((variant, i) =>
                            <FormControl className={classes.lineHeight} key={i}>
                                <InputLabel htmlFor="age-native-simple">{variant.name}</InputLabel>
                                { }
                                <Select
                                    native
                                    value={state[variant.name]}
                                    onChange={handleChange}
                                    name={variant.name}
                                >
                                    {
                                        variant.propertyValues.map((data, i) => <option key={i} value={data}>{data}</option>)
                                    }

                                </Select>
                            </FormControl>)
                    }

                    <div className={classes.lineHeight}>
                        {props.tags &&
                            props.tags.map((tag, i) => <Chip variant="outlined" className={classes.marginTags}
                                color="primary" label={tag} component="a" href="#chip" key={i + tag} clickable />)
                        }
                    </div>
                    <ShopCartButton variantsSelected={state} {...props}/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default QuickViewContent;

