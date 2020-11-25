import React from "react";
import { Route } from "@webiny/react-router";
import { RoutePlugin } from "@webiny/app/types"
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout"
import Helmet from 'react-helmet'
import OrdersTable from '../Orders/Components/OrdersTable';
import ProductsTable from '../Products/Components/ProductsTable';
import PricesListTabs from '../PricesList/Components/PricesListTabs';
import VariantsTable from '../Variants/Components/VariantsTable';

export default [{
  type: "route",
  name: "route-orders",
  route: (
    <Route
      exact
      path="/orders"
      render={() =>
        <AdminLayout>
          <Helmet>
            <title>Orders Manager</title>
          </Helmet>
          <OrdersTable />
        </AdminLayout>
      }
    />
  )
} as RoutePlugin,
{
  type: "route",
  name: "route-products",
  route: (
    <Route
      exact
      path="/products"
      render={() =>
        <AdminLayout>
          <Helmet>
            <title>Products Manager</title>
          </Helmet>
          <ProductsTable />
        </AdminLayout>
      }
    />
  )
} as RoutePlugin,
{
  type: "route",
  name: "route-prices-list",
  route: (
    <Route
      exact
      path="/prices"
      render={() =>
        <AdminLayout>
          <Helmet>
            <title>Prices List</title>
          </Helmet>
          <PricesListTabs/>
        </AdminLayout>
      }
    />
  )
} as RoutePlugin,
{
  type: "route",
  name: "route-variants",
  route: (
    <Route
      exact
      path="/variants"
      render={() =>
        <AdminLayout>
          <Helmet>
            <title>Variants</title>
          </Helmet>
          <VariantsTable/>
        </AdminLayout>
      }
    />
  )
} as RoutePlugin
]