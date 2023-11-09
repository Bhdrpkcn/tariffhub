export function calculateTariffs(tariffs) {
  const maxDownloadSpeed = tariffs.reduce((max, tariff) => {
    const speed = parseInt(tariff.download_speed, 10);
    return isNaN(speed) ? max : Math.max(max, speed);
  }, 0);

  const maxUploadSpeed = tariffs.reduce((max, tariff) => {
    const speed = parseInt(tariff.upload_speed, 10);
    return isNaN(speed) ? max : Math.max(max, speed);
  }, 0);

  return { maxDownloadSpeed, maxUploadSpeed };
}

