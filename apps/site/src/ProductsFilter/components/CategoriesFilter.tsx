import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { listCategoriesParentsEnabled, listSubcategories } from "../../graphql/query";
import LinearProgress from "@material-ui/core/LinearProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";

const CategoriesFilter = ({ categoriesFilter, categoriesFilterState }) => {
    const [breadcrumbState, setBreadcrumbState] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    // useEffect(() => {
    //     categoriesFilterState == "" ?? setBreadcrumbState([]);
    // }, [categoriesFilterState]);

    const { loading: loadingParents, error: errorParents, data: dataParents } = useQuery(
        listCategoriesParentsEnabled
    );

    const [
        getSubcategories,
        { called, loading: loadingSubcategories, data: dataSubcategories }
    ] = useLazyQuery(listSubcategories);

    if (loadingParents || (loadingSubcategories && called)) {
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
        getSubcategories({ variables: { parent: { id: category.id } } });
        categoriesFilter(breadcrumbState[breadcrumbState.length - 1].id);
    };

    return (
        <React.Fragment>
            <Grid container item spacing={3} sm={3} direction="column">
                <Grid item>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        {breadcrumbState && !(categoriesFilterState === "")
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
                        {!called || categoriesFilterState === ""
                            ? dataParents.categories.listCategories.data.map((category) => (
                                  <ListItem button key={category.id}>
                                      <ListItemText
                                          primary={category.name}
                                          onClick={() => handleSelect(category)}
                                      />
                                  </ListItem>
                              ))
                            : dataSubcategories.categories.listCategories.data.map((category) => (
                                  <ListItem button key={category.id}>
                                      <ListItemText
                                          primary={category.name}
                                          onClick={() => handleSelect(category)}
                                      />
                                  </ListItem>
                              ))}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default CategoriesFilter;
