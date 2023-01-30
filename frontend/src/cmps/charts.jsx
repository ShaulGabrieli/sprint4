import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { useEffect } from "react";
import { utilService } from "../services/util.service";

const BASE_CHARTS_URL = "https://charts.mongodb.com/charts-sprint4-txzkw"

export function Charts({ chartId, sellerId, height, width }) {
  const randDivId = utilService.makeId()
  const sdk = new ChartsEmbedSDK({
    baseUrl: BASE_CHARTS_URL, 
  });
  const chart = sdk.createChart({
    chartId: chartId, 
    height: height,
    width: width,
    filter: { "seller._id": sellerId },
    maxDataAge: 3000,
    autoRefresh: true,
    showAttribution : false
  });

  useEffect(() => {
    chart.render(document.getElementById(randDivId))
  }, [])
  return (
    <div id={randDivId}></div>
  )
}