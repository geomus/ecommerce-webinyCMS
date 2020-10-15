import React from "react";
import StorefrontIcon from '@material-ui/icons/Storefront';
import { AdminMenuPlugin } from "@webiny/app-admin/types"

export default  [{
    type: "admin-menu",
    name: "admin-menu-dashboard",
    render({ Menu, Section, Item }) {
      return (
        <Menu name="shop" icon={<StorefrontIcon />} label="Dashboard">
          <Section label={"Products Manager"}>
            <Item label={"Products"} path="/products" />
            <Item label={"Prices"} path="/prices" />
          </Section>
          <Section label={"Users Manager"}>
            <Item label={"Users"} path="/users" />
          </Section>
          <Section label={"Stats"}>
            <Item label={"Sales"} path="/sales" />
          </Section>
        </Menu>
      );
    }
  } as AdminMenuPlugin]