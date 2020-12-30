import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { listCategoriesParentsEnabled } from "../../graphql/query";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import SubcategoriesList from "./ListSubcategories";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 240,
            flexGrow: 1,
            maxWidth: 400
        },
        list: {
            display: "flex",
            flexDirection: "column",
            width: 360
        }
    })
);

const CategoriesFilter = ({ categoriesFilter }) => {
    const classes = useStyles();
    const [breadcrumbState, setBreadcrumbState] = useState([]);
    const [selected, setSelected] = useState<string>("");
    const [subLevel, setSubLevel] = useState(false);

    const { loading: loadingParents, error: errorParents, data: dataParents } = useQuery(
        listCategoriesParentsEnabled
    );

    if (loadingParents) {
        return (
            <h1>
                <LinearProgress />
            </h1>
        );
    }

    if (errorParents) {
        console.dir(errorParents);
        return <h1> error </h1>;
    }

    const handleBreadcrumb = (breadcrumbId) => {
        categoriesFilter(breadcrumbId);
    };
    const handleSelect = (category) => {
        breadcrumbState.push(category);
        setBreadcrumbState(breadcrumbState);
        setSubLevel(true);
        setSelected(category.id);
        categoriesFilter(breadcrumbState[breadcrumbState.length - 1].id);
        console.log(breadcrumbState);
    };

    return (
        <React.Fragment>
            <Grid container item spacing={3} sm={3} direction="column">
                <Grid item>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        {breadcrumbState
                            ? breadcrumbState.map((breadcrumb) => (
                                  <Link
                                      key={breadcrumb.id}
                                      color="inherit"
                                      href="#"
                                      onClick={() => handleBreadcrumb(breadcrumb.id)}
                                  >
                                      {breadcrumb.name}
                                  </Link>
                              ))
                            : ""}
                    </Breadcrumbs>
                </Grid>
                <Grid item container>
                    <List component="nav" aria-label="categories">
                        {!subLevel ? (
                            dataParents.categories.listCategories.data.map((category) => (
                                <ListItem button key={category.id}>
                                    <ListItemText
                                        primary={category.name}
                                        onClick={() => handleSelect(category)}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <SubcategoriesList parent={selected} />
                        )}
                    </List>
                    {/* <TreeView
                        className={classes.root}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpanded={["root"]}
                        defaultExpandIcon={<ChevronRightIcon />}
                        selected={selected}
                        onNodeSelect={handleSelect}
                    >
                        {!subLevel ? (
                            dataParents.categories.listCategories.data.map((category, i) => (
                                <TreeItem
                                    key={category + i}
                                    nodeId={JSON.stringify(category)}
                                    label={category.name}
                                />
                            ))
                        ) : (
                            <SubcategoriesList parent={selected} />
                        )}
                    </TreeView> */}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default CategoriesFilter;
