import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { listParentCategories } from "../../../graphql/query";
import { LinearProgress } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import CategoryListTable from "./CategoryTable";
import CategoryBtnCreate from "./CategoryBtnCreate";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    btnCategoryCreate: {
        margin: "1rem 0 0 1.5rem"
    }
}));

export default function listParentsCategories() {
    const classes = useStyles();
    const [value, setValue] = useState(0);


    const { loading, error, data } = useQuery(listParentCategories);

    if (loading) {
        return (
            <h1>
                {" "}
                <LinearProgress />{" "}
            </h1>
        );
    }

    if (error) {
        console.dir(error);
        return <h1> error </h1>;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    {data.categories.listCategories.data.map((category, index) => (
                        <Tab key={category.id} label={category.name} {...a11yProps({ index })} />
                    ))}
                </Tabs>
            </AppBar>
            <CategoryBtnCreate className={classes.btnCategoryCreate} parentCategories={data.categories.listCategories.data} />
            {data.categories.listCategories.data.map((category, index) => (
                <TabPanel key={category.id} value={value} index={index}>
                    <CategoryListTable categoryId={category.id} />
                </TabPanel>
            ))}
        </div>
    );
}
