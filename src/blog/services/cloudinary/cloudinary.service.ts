import {Injectable} from '@nestjs/common'
import {v2 as cloudinary} from 'cloudinary'

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  upload(base64: string) {
    return cloudinary.uploader.upload(base64, {upload_preset: process.env.CLOUDINARY_PRESET})
  }
}
