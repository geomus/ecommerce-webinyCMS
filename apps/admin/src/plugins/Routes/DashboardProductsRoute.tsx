import React from "react";
import { Route } from "@webiny/react-router";
import { RoutePlugin } from "@webiny/app/types"
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout"
import Helmet from 'react-helmet'
import ProductsTable from '../../DashboardComponents/ProductsTable';

export default [{
    type: "route",
    name: "route-dashboard",
    route: (
      <Route
        exact
        path="/products/"
        render={() =>
          <AdminLayout>
            <Helmet>
              <title>Products Manager</title>
            </Helmet>
            <ProductsTable/>
          </AdminLayout>
        }
      />
    )
  } as RoutePlugin
]