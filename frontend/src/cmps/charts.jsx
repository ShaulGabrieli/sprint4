import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { useEffect } from "react";
import { utilService } from "../services/util.service";

const BASE_CHARTS_URL = "https://charts.mongodb.com/charts-sprint4-txzkw"

export function MyChart({ chartId, sellerId, height, width }) {
  const randDivId = utilService.makeId()
  const sdk = new ChartsEmbedSDK({
    baseUrl: BASE_CHARTS_URL, // REPLACE with the Base URL from your Embed Chart dialog.
  });
  const chart = sdk.createChart({
    chartId: chartId, // REPLACE with the Chart ID from your Embed Chart dialog.
    height: height,
    width: width,
    filter: { "seller._id": sellerId },
    maxDataAge: 60,
    autoRefresh: true
    // Additional options go here
  });

  useEffect(() => {
    chart.render(document.getElementById(randDivId))
  }, [])
  return (
    // id="63d2e8cb-7df1-415a-8cc0-8dfade37b3a9"
    <div id={randDivId}></div>
  )
}