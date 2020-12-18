import React from "react";
import { Link } from "@webiny/react-router";
import { Menu } from "@webiny/app-page-builder/render/components";
import Navigation from "./Navigation";
import ButtonCartHome from "./ButtonCartHome";
import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";

const DesktopHeader = ({
    menuName,
    logo,
    name
}: {
    menuName: string;
    logo: {
        src: string;
    };
    name: string;
}) => {
    return (
        <div
            className="webiny-pb-section-header__wrapper hide-on-mobile"
            data-testid={"pb-desktop-header"}
        >
            <Grid container spacing={3} direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <div className={"webiny-pb-section-header__logo"}>
                        <Link to="/">
                            {logo && logo.src && <img src={logo.src} alt={name} />}{" "}
                            {(!logo || !logo.src) && (
                                <span className={"webiny-pb-section-header__site-name"}>
                                    {name}
                                </span>
                            )}
                        </Link>
                    </div>
                </Grid>
                <Grid item>
                    <SearchBar mobile={false} />
                </Grid>
                <Grid item>
                    <nav className={"webiny-pb-section-header__navigation"}>
                        <Menu slug={menuName} component={Navigation} />
                    </nav>
                </Grid>
                <Grid item>
                    <ButtonCartHome />
                </Grid>
            </Grid>
        </div>
    );
};

export default DesktopHeader;
