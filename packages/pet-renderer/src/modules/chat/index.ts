import type { SoliloquizeData } from "@inabapet/types"

export class ChatService {
  private dataList: SoliloquizeData[]
  constructor() {
    this.dataList = [
      { message: '你点你*呢' },
      { message: '不许点了' },
      { message: '你耳朵🐉啊' },
      { message: '？' },
      { message: '何意味' },
      { message: '干什么！' },
    ]
  }

  getSoliloquize(): SoliloquizeData {
    const index = Math.floor(Math.random() * this.dataList.length)
    return this.dataList[index]!
  }
}