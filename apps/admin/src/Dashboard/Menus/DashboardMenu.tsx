import React from "react";
// import StorefrontIcon from '@material-ui/icons/Storefront';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import PeopleIcon from '@material-ui/icons/People';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { AdminMenuPlugin } from "@webiny/app-admin/types"

export default  [{
    type: "admin-menu",
    name: "admin-menu-products",
    render({ Menu, Item }) {
      return (
        <Menu name="products" icon={<AllInboxIcon />} label="Products">
            <Item label={"Products List"} path="/products" />
            <Item label={"Categories"} path="/categories" />
            <Item label={"Prices"} path="/prices" />
            <Item label={"Variants"} path="/variants" />
        </Menu>
      );
    }
  } as AdminMenuPlugin,
  {
    type: "admin-menu",
    name: "admin-menu-users",
    render({ Menu, Item }) {
      return (
        <Menu name="users" icon={<PeopleIcon />} label="Users">
            <Item label={"Users List"} path="/users" />
        </Menu>
      );
    }
  } as AdminMenuPlugin,
  {
    type: "admin-menu",
    name: "admin-menu-orders",
    render({ Menu, Item }) {
      return (
        <Menu name="orders" icon={<ListAltIcon />} label="Orders">
            <Item label={"Orders"} path="/orders" />
        </Menu>
      );
    }
  } as AdminMenuPlugin,
]