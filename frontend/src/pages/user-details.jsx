import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loadUser } from "../store/user.actions";
import { store } from "../store/store";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH,
} from "../services/socket.service";
import { orderService } from "../services/local/order.service.local";
import { updateOrder } from "../store/order.actions";
import { loadOrders } from "../store/order.actions.js";
import BasicTabs from "../cmps/user-details-tabs";
import { Loading } from "../cmps/loading";
import { GigPreview } from "../cmps/gig-preview";
import { sellerActions } from "../cmps/global-const/global-const";
import { loadGigs } from "../store/gig.actions";
import { MyChart } from "../cmps/charts";
import Select from "react-select";

export function UserDetails() {
  const params = useParams();
  const user = useSelector((storeState) => storeState.userModule.user);
  const userOrders = useSelector(
    (storeState) => storeState.orderModule.userOrders
  );
  const sellerOrders = useSelector(
    (storeState) => storeState.orderModule.sellerOrders
  );
  const gigs = useSelector((storeState) => storeState.gigModule.gigs);

  // const [sellerGigs, setSellerGigs] = useState(getSellerGigs(user._id))

  // useEffect(() => {
  //     loadUser(params.id)

  //     socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
  //     socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  //     return () => {
  //         socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  //     }
  // }, [])

  useEffect(() => {
    loadOrders();
    onLoadGigs();
    window.scrollTo(0, 0);
  }, []);

  async function onLoadGigs() {
    try {
      await loadGigs();
    } catch (err) {
      showErrorMsg("Cannot load gigs");
      console.log(err);
    }
  }

  async function onChangeStatus(order, updatedStatus) {
    let { value } = updatedStatus;
    // console.log(updatedStatus);

    try {
      const updatedOrder = { ...order, status: updatedStatus };
      //   console.log(updatedOrder, "updatedOrder");
      await updateOrder(updatedOrder);
    } catch (err) {
      console.log("cannot change status", err);
    }
  }

  async function handleChangeAction(action, order) {
    let { value } = action;
    console.log(action, "action");
    console.log("order", order);

    // try {
    //   const updatedOrder = { ...order, status: updatedStatus };
    //   console.log(updatedOrder, "updatedOrder");
    //   await updateOrder(updatedOrder);
    // } catch (err) {
    //   console.log("cannot change status", err);
    // }
  }
  //   async function handleChangeAction(action) {
  //     console.log("xxx");
  //     let { value } = action;
  //     console.log("value", value);
  //     try {
  //       //   const updatedOrder = { ...order, status: updatedStatus };
  //       await updateOrder(action);
  //     } catch (err) {
  //       console.log("cannot change status", err);
  //     }
  //   }

  function getSellerGigs(userId) {
    const sellerGigs = gigs.filter((gig) => gig.owner._id === userId);
    // const sellerGigs = await loadGigs()
    //    return  sellerGigs.filter((gig) => gig.owner._id === userId)
    return sellerGigs;
  }

  function onUserUpdate(user) {
    showSuccessMsg(
      `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
    );
    store.dispatch({ type: "SET_WATCHED_USER", user });
  }

  function changeStatusColor(currStatus) {
    switch (currStatus) {
      case "pending":
        return "status-blue";
      case "approved":
        return "status-green";

      case "in progress":
        return "status-yellow";

      case "done":
        return "status-orange";

      case "rejected":
        return "status-red";
      default:
        return "";
    }
  }

  if (!userOrders)
    return (
      <div className="loading-spinner flex">
        {" "}
        <Loading />{" "}
      </div>
    );
  return (
    <section className="user-details main-container full">
      <section className="user-details-section flex">
        <div className="user-main-details">
          <div className="profile-img-container">
            <img className="profile-img" src={user.imgUrl} />
          </div>
          <h1>{user.fullname}</h1>

          <hr />
          <section className="user-details-bottom">
            <div className="user-sort-info">
              <div className="location-profile flex space-between">
                {/* <!-- License: PD. Made by Steve Schoger: https://www.zondicons.com/ --> */}
                <span>
                  <svg
                    className="from-icon"
                    width="12px"
                    height="12px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  </svg>
                  From
                </span>
                <span>Israel</span>
                {/* <span>{user.country}</span> */}
              </div>
              <div className="date-created flex space-between">
                <span>Member since</span>
                <span>20.1.2023</span>
                {/* <span>{user.createdAt}</span> */}
              </div>
            </div>
            <MyChart
              chartId="63d2e8cb-7df1-415a-8cc0-8dfade37b3a9"
              sellerId={user._id}
              height="400px"
              width="300px"
            />
            {/* <MyChart chartId="63d5a294-d62c-45cb-829a-46fabee1a964" sellerId={user._id} height="400px" width="300px" /> */}
          </section>
        </div>
        <section className="user-orders-manage-section flex column">
          {/* <BasicTabs /> */}
          <div className="static-charts-main flex row">
            <MyChart
              chartId="63d5a0cb-d8ca-4eff-8c06-1918755e0bdd"
              sellerId={user._id}
              height="180px"
              width="150px"
            />
            <MyChart
              chartId="63d629fc-64cf-4cdc-8b6c-8225e3ace76d"
              sellerId={user._id}
              height="180px"
              width="150px"
            />
            <MyChart
              chartId="d5f009e2-6f96-4816-9cae-b32a4ed485b7"
              sellerId={user._id}
              height="180px"
              width="150px"
            />
            <MyChart
              chartId="675bc298-3b6c-4019-a500-f201bdbb3044"
              sellerId={user._id}
              height="180px"
              width="150px"
            />
          </div>
          <div className="seller-options">
            <h1>Seller options</h1>
            <table className="seller-list">
              <thead>
                <tr>
                  <th>Buyer</th>
                  {/* <th>Gig Id</th> */}
                  <th>Gig</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="seller-orders">
                {sellerOrders?.map((order, idx) => {
                  return (
                    <tr id={idx}>
                      <td className="gig-buyer-dash">{order.buyer.fullname}</td>
                      {/* <td> {order.gig._id}</td> */}
                      <td className="gig-title-dash">
                        {order.gig.title.substring(0, 55) + "..."}
                      </td>
                      <td className={changeStatusColor(order.status)}>
                        {order.status}
                      </td>
                      <td>
                        {order.status === "pending" && (
                          <button
                            onClick={() => onChangeStatus(order, "approved")}
                          >
                            Approved
                          </button>
                        )}
                        {order.status === "approved" && (
                          <button
                            onClick={() => onChangeStatus(order, "in progress")}
                          >
                            In progress
                          </button>
                        )}
                        {order.status === "in progress" && (
                          <button onClick={() => onChangeStatus(order, "done")}>
                            Done
                          </button>
                        )}
                        <button
                          onClick={() => onChangeStatus(order, "rejected")}
                        >
                          Rejected
                        </button>
                        <Select
                          id="user-actions"
                          name="user-actions"
                          placeholder="Actions"
                          options={sellerActions}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 4,
                            colors: { ...theme.colors, primary: "black" },
                          })}
                          classNamePrefix="select"
                          onChange={() => handleChangeAction(order)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="seller-gigs">
            <h1>Seller gigs</h1>
            <div className="gig-seller-list">
              <ul className="gig-list">
                <Link to={"/gig/edit"}>
                  <li className="add-gig-btn add-new-gig">Create a new Gig</li>
                </Link>
                {getSellerGigs(user._id)?.map((gig, idx) => (
                  <GigPreview id={idx} gig={gig} />
                ))}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
