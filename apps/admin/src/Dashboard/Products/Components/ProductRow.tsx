import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";
import ProductsBtnPublished from "./ProductsBtnPublished";
import ProductsBtnEdit from "./ProductsBtnEdit";
import ProductsBtnDelete from "./ProductsBtnDelete";
import ProductsBtnFeatured from "./ProductsBtnFeatured";

const useStyles = makeStyles(() => ({
    cellImgProduct: {
        width: "8%"
    },
    imgProduct: {
        width: "70%",
        borderRadius: "50%",
        boxShadow: "3px 3px 15px rgba(0,0,0,0.15)"
    },
    marginTags: {
        marginRight: "0.5rem"
    }
}));

export default function ProductRow({ row, categories }) {
    const classes = useStyles();

    const totalCalculatorStock = (variants) => {
        const suma = variants.reduce((acc, variant) => { return acc += variant.stock }, 0)
        return suma
    }

    return (
        <TableRow hover role="checkbox" tabIndex={-1}>
            <TableCell align="center" className={classes.cellImgProduct}>
                <img
                    src={`${process.env.REACT_APP_API_URL}/files/${row.images[0]}`}
                    className={classes.imgProduct}
                    alt="Foto producto"
                />
            </TableCell>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="left">
                <Typography variant="body1" component="span">
                    ${row.priceBase}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="body1" component="span">
                    {totalCalculatorStock(row.variants)}
                </Typography>
            </TableCell>
            <TableCell align="center">
                {row.tags &&
                    row.tags.map((tag, i) => (
                        <Chip
                            variant="outlined"
                            className={classes.marginTags}
                            color="primary"
                            label={tag}
                            component="a"
                            href="#chip"
                            key={i + tag}
                            clickable
                        />
                    ))}
            </TableCell>
            {row.categories ? (
                <TableCell align="center">
                    {row.tags &&
                        row.categories.map((category, i) => (
                            <Chip
                                variant="outlined"
                                className={classes.marginTags}
                                color="primary"
                                label={category.name}
                                component="a"
                                href="#chip"
                                key={i + category.name}
                                clickable
                            />
                        ))}
                </TableCell>
            ) : 
            <TableCell align="center">
                Uncategorized
                </TableCell>}
            <TableCell align="center">
                <ProductsBtnPublished row={row} />
            </TableCell>
            <TableCell align="center">
                <ProductsBtnFeatured row={row} />
            </TableCell>
            <TableCell align="center">
                <ProductsBtnEdit product={row} categories={categories} />
            </TableCell>
            <TableCell align="center">
                <ProductsBtnDelete row={row} />
            </TableCell>
        </TableRow>
    );
}
