import {Module} from '@nestjs/common'

@Module({})
export class InitModule {
  static register() {
    return {
      module: InitModule,
    }
  }
}
