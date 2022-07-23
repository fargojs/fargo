import AdmZip from 'adm-zip';

export async function unpack(location: string) {
  const zip = new AdmZip(`${location}.zop`);
  zip.extractAllTo(location);
}
