import { useEffect, useState } from "react";
import { PaymentPreview } from "./payment-preview";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../node_modules/react-tabs/style/react-tabs.css';

export function PaymentTabs({gig})
{

    return(
        <div>
        <Tabs className="tabs-payment">
            <TabList>
            <Tab>Basic</Tab>
            <Tab>Standard</Tab>
            <Tab>Premium</Tab>
            </TabList>

            <TabPanel>
            <PaymentPreview gig={gig} paymentPlan={{"title" : "Basic", "delivery" : "10 days", "revisions" : "5 revisions", "features" : [
                "Virtual assistance services",
                "Help with daily tasks and responsibilities",
                "Research information"
            ] }}/>
            </TabPanel>
            <TabPanel>
            <PaymentPreview gig={gig} paymentPlan={{"title" : "Standard","delivery" : "5 days", "revisions" : "10 revisions", "features" : [
                "Virtual assistance services",
                "Help with daily tasks and responsibilities",
                "Research information",
                "Email management",
                "Calendar management",
                "Travel arrangements"
            ] }}/>
            </TabPanel>
            <TabPanel>
            <PaymentPreview gig={gig} paymentPlan={{"title" : "Premium","delivery" : "2 days", "revisions" : "15 revisions", "features" : [
                "Virtual assistance services",
                "Help with daily tasks and responsibilities",
                "Research information",
                "Email management",
                "Calendar management",
                "Travel arrangements",
                "Social media management",
                "Data entry"
            ] }}/>
            </TabPanel>
         </Tabs>
        </div>
    )
}