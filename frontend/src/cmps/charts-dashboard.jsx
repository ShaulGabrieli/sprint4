import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { useEffect } from "react";
import { utilService } from "../services/util.service";

const BASE_CHARTS_URL = "https://charts.mongodb.com/charts-sprint4-txzkw"

export function ChartsDashboard({ dashboardId, sellerId, height, width }) {
  const randDivId = utilService.makeId()
  const sdk = new ChartsEmbedSDK({
    baseUrl: BASE_CHARTS_URL, 
  });
  const dashboard = sdk.createDashboard({
    dashboardId: dashboardId, 
    width: "1100px",
    height: "700px",
    filter: { "seller._id": sellerId },
    maxDataAge: 600,
    autoRefresh: true,
    showAttribution : false
  });
  

  

  useEffect(() => {
    dashboard.render(document.getElementById(randDivId)).then(() => {
    dashboard.getAllCharts().then( allCharts => {
      allCharts.map((chart) => {
        chart.setFilter( { "seller._id": sellerId })
        
    })})
  })
  }, [])
  return (
    <div id={randDivId}></div>
  )
}