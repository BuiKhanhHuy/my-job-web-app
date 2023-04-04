import toSlug from './customData';

const downloadPdf = async (url, fileName) => {
  const fileDownloadName = `MyJob_CV-${toSlug(fileName || 'mytitle')}`;
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

export default downloadPdf;
