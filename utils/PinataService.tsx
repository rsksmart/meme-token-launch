import axios from 'axios'

export async function UploadImageIpfs(image: File) {
  try {
    if (!image) {
      console.log('No image provided')
      return null
    }
    const data = new FormData()
    data.append('file', image)

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
        },
      }
    )
    return response.data.IpfsHash
  } catch (error) {
    console.log('Error uploading image is: ', error)
    return null
  }
}
