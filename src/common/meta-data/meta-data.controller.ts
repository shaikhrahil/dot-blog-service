import {Controller, Get, Query} from '@nestjs/common'
import * as urlMetadata from 'url-metadata'

interface LinkRes {
  success: 0 | 1
  meta: {
    title: string
    description: string
    image: {url: string}
  }
}

@Controller('meta-data')
export class MetaDataController {
  @Get()
  async getMetaData(@Query() urlQuery: {url: string}): Promise<LinkRes> {
    try {
      const res = await urlMetadata(urlQuery.url)
      return {
        success: 1,
        meta: {
          title: res.title,
          description: res.description,
          image: {
            url: 'https://' + res.source + res.image,
          },
        },
      }
    } catch (e) {
      return {
        success: 0,
        meta: null,
      }
    }
  }
}
