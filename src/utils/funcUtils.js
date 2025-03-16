import toSlug from "./customData";
import { APP_NAME } from "../configs/constants";

const downloadPdf = async (url, fileName) => {
  const fileDownloadName = `${APP_NAME}_CV-${toSlug(fileName || "mytitle")}`;
  const response = await fetch(url);
  const blob = await response.blob();
  const urlBlob = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = urlBlob;
  link.setAttribute('download', `${fileDownloadName}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

export const formatRoute = (route, value, paramKey = ":slug") => {
  const regex = new RegExp(`${paramKey}`, "g");
  return route.replace(regex, value);
};

export const buildURL = (hostname) => {
  const protocol = window.location.protocol; 
  const port = window.location.port ? `:${window.location.port}` : "";

  return `${protocol}//${hostname}${port}`;
};

export default downloadPdf;
