import { Fragment } from "react";

// CUSTOM COMPONENTS
import Packages from "../../../../components/icons/Packages";
import OrderRow from "../order-row";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";

// CUSTOM DATA MODEL


// ====================================================


// ====================================================

export function OrdersPageView({
  orders,
  totalPages,
  currentPage,
  error
}) {
  return <Fragment>
      <DashboardHeader Icon={Packages} title="My Orders" />

      {error && (
        <div style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#fee', borderRadius: '4px', color: '#d32f2f' }}>
          {error}
        </div>
      )}

      {!error && orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 16px' }}>
          <Packages style={{ fontSize: 80, color: '#bdbdbd', marginBottom: 16 }} />
          <h3 style={{ marginBottom: 8 }}>No Orders Yet</h3>
          <p style={{ color: '#757575' }}>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <Fragment>
          {orders.map(order => <OrderRow order={order} key={order._id || order.id} />)}
          {totalPages > 1 && <Pagination count={totalPages} page={currentPage} />}
        </Fragment>
      )}
    </Fragment>;
}