import { useEffect, useState } from "react";
import { PaymentPreview } from "./payment-preview";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useNavigate } from "react-router-dom";
import "../../node_modules/react-tabs/style/react-tabs.css";

//todo:move the plans go gig.json

export function PaymentTabs({ gig, onAddOrder }) {
  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();

  function checkDaysToDisplay(plan) {
    if (gig.daysToMake <= 1) return " 24H";
    if (plan === "basic") return ` ${gig.daysToMake} days`;
    if (plan === "standard") {
      if ((gig.daysToMake / 2).toFixed() <= 1) {
        return " 24H";
      } else {
        return ` ${(gig.daysToMake / 2).toFixed()}
        days`;
      }
    }
    if (plan === "premium") {
      if ((gig.daysToMake / 4).toFixed() <= 1) {
        return " 24H";
      } else {
        return ` ${(gig.daysToMake / 4).toFixed()}
        days`;
      }
    }
  }

  //   function getDaysToMake() {
  //     if (gig.daysToMake > 1) return gig.daysToMake / 2;
  //   }

  async function onBuildOrder() {
    try {
      const order = {
        gigId: gig._id,
        seller: {
          _id: gig.owner._id,
          fullname: gig.owner.fullname,
        },
        status: "pending",
        gig: {
          _id: gig._id,
          title: gig.title,
          price: gig.price,
          imgUrls: [gig.imgUrls[0]],
          description: gig.description,
          owner: {
            rate: gig.owner.rate,
            fullname: gig.owner.fullname,
            imgUrl: gig.owner.imgUrl,
          },
          totalLikes: gig.totalLikes,
        },
      };
      const newOrder = await onAddOrder(order, plan);
      console.log("newOrder", newOrder);
      return navigate("/payments/" + newOrder._id);
    } catch (err) {
      console.log("PaymentTabs: err in onBuildOrder", err);
    }
  }

  return (
    <div>
      <Tabs className="tabs-payment">
        <TabList>
          <Tab>Basic</Tab>
          <Tab>Standard</Tab>
          <Tab>Premium</Tab>
        </TabList>

        <TabPanel>
          <PaymentPreview
            gig={gig}
            setPlan={setPlan}
            onBuildOrder={onBuildOrder}
            paymentPlan={{
              title: "Basic",
              delivery: `${checkDaysToDisplay("basic")}`,
              revisions: "5 revisions",
              features: [
                "Virtual assistance services",
                "Help with daily tasks and responsibilities",
                "Research information",
              ],
            }}
          />
        </TabPanel>
        <TabPanel>
          <PaymentPreview
            gig={gig}
            setPlan={setPlan}
            onBuildOrder={onBuildOrder}
            paymentPlan={{
              title: "Standard",
              delivery: `${checkDaysToDisplay("standard")}`,
              revisions: "10 revisions",
              features: [
                "Virtual assistance services",
                "Help with daily tasks and responsibilities",
                "Research information",
                "Email management",
                "Calendar management",
                "Travel arrangements",
              ],
            }}
          />
        </TabPanel>
        <TabPanel>
          <PaymentPreview
            gig={gig}
            setPlan={setPlan}
            onBuildOrder={onBuildOrder}
            paymentPlan={{
              title: "Premium",
              delivery: `${checkDaysToDisplay("premium")}`,
              revisions: "15 revisions",
              features: [
                "Virtual assistance services",
                "Help with daily tasks and responsibilities",
                "Research information",
                "Email management",
                "Calendar management",
                "Travel arrangements",
                "Social media management",
                "Data entry",
              ],
            }}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}
