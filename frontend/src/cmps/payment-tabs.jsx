import { useEffect, useState } from "react";
import { PaymentPreview } from "./payment-preview";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useNavigate } from "react-router-dom";
import '../../node_modules/react-tabs/style/react-tabs.css';

//todo:move the plans go gig.json

export function PaymentTabs({ gig, onAddOrder }) {
    const [plan, setPlan] = useState(null)
    const navigate = useNavigate()

    async function onBuildOrder() {
        try {
            const order = {
                "gigId": gig._id,
                "seller": {
                    "_id": gig.owner._id,
                    "fullname": gig.owner.fullname,
                },
                "status": "pending",
                "gig": {
                    "_id": gig._id,
                    "title": gig.title,
                    "price": gig.price,
                    "imgUrl": gig.imgUrls[0]
                }
            }
            const newOrder = await onAddOrder(order, plan)
            console.log('newOrder', newOrder)
            return navigate('/payments/' + newOrder._id)
        } catch (err) {
            console.log('PaymentTabs: err in onBuildOrder', err)
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
                    <PaymentPreview gig={gig} setPlan={setPlan} onBuildOrder={onBuildOrder} paymentPlan={{
                        "title": "Basic", "delivery": "10 days", "revisions": "5 revisions", "features": [
                            "Virtual assistance services",
                            "Help with daily tasks and responsibilities",
                            "Research information"
                        ]
                    }} />
                </TabPanel>
                <TabPanel>
                    <PaymentPreview gig={gig} setPlan={setPlan} onBuildOrder={onBuildOrder} paymentPlan={{
                        "title": "Standard", "delivery": "5 days", "revisions": "10 revisions", "features": [
                            "Virtual assistance services",
                            "Help with daily tasks and responsibilities",
                            "Research information",
                            "Email management",
                            "Calendar management",
                            "Travel arrangements"
                        ]
                    }} />
                </TabPanel>
                <TabPanel>
                    <PaymentPreview gig={gig} setPlan={setPlan} onBuildOrder={onBuildOrder} paymentPlan={{
                        "title": "Premium", "delivery": "2 days", "revisions": "15 revisions", "features": [
                            "Virtual assistance services",
                            "Help with daily tasks and responsibilities",
                            "Research information",
                            "Email management",
                            "Calendar management",
                            "Travel arrangements",
                            "Social media management",
                            "Data entry"
                        ]
                    }} />
                </TabPanel>
            </Tabs>
        </div>
    )
}