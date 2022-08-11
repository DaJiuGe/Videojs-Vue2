import axios from 'axios'

const buffer2base64 = (buffer: ArrayBuffer) => {
  const base64 = btoa(
    new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte), ""
    ))
  return `data:image/jpeg;base64,${base64}`
}

export const decrypt = async (url: string): Promise<string> => {
  const res = await axios.get(url, { responseType: 'arraybuffer' })
  return buffer2base64(res.data)
}