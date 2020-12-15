import React from "react";
import { Link } from "@webiny/react-router";
import HamburgerMenu from "react-hamburger-menu";
import classNames from "classnames";
import { Menu } from "@webiny/app-page-builder/render/components";
import Navigation from "./Navigation";
import Grid from "@material-ui/core/Grid";
import ButtonCartHome from "./ButtonCartHome";
import SearchBar from "./SearchBar";


const MobileHeader = ({ menuName, logo, name, active, toggleMenu }) => {
    return (
        <div
            className="webiny-pb-section-header__wrapper hide-on-desktop-and-tablet"
            data-testid={"pb-mobile-header"}
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
                    <SearchBar mobile={true}/>
                </Grid>
                <Grid item>
                    <ButtonCartHome />
                </Grid>
                <Grid item>
                    <nav
                        className={classNames("webiny-pb-section-header__navigation", {
                            "webiny-pb-section-header__navigation--mobile-active": active
                        })}
                    >
                        <Menu slug={menuName} component={Navigation} />
                        <div className={"webiny-pb-section-header__mobile-site-name"}>
                            <a href="/">{name}</a>
                        </div>
                    </nav>
                </Grid>
            </Grid>
            <div onClick={toggleMenu} className="webiny-pb-section-header__mobile-icon">
                <HamburgerMenu
                    isOpen={active}
                    menuClicked={toggleMenu}
                    width={18}
                    height={15}
                    strokeWidth={1}
                    rotate={0}
                    color="black"
                    borderRadius={0}
                    animationDuration={0.5}
                />
            </div>
            <div
                onClick={toggleMenu}
                className={classNames("webiny-pb-section-header__mobile-overlay", {
                    "webiny-pb-section-header__mobile-overlay--active": active
                })}
            />
        </div>
    );
};

export default MobileHeader;
